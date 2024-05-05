

import  { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateChampaign=()=> {
  const [champaignData, setChampaignData] = useState({
    title: '',
    description: '',
    amountRequired: 0,
    equity: 0,
    coverImage: '',
    filesURL: '',
    batches: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/champaign'); // replace with your backend endpoint
      setChampaignData(response.data);
    } catch (error) {
      console.error('Error fetching champaign data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChampaignData({ ...champaignData, [name]: value });
  };

  const handleBatchChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBatches = [...champaignData.batches];
    updatedBatches[index][name] = value;
    setChampaignData({ ...champaignData, batches: updatedBatches });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/champaign', champaignData); // replace with your backend endpoint
      alert('Champaign data updated successfully!');
    } catch (error) {
      console.error('Error updating champaign data:', error);
    }
  };

  return (
    <div>
      <h1>Edit Champaign</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={champaignData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={champaignData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Amount Required:
          <input
            type="number"
            name="amountRequired"
            value={champaignData.amountRequired}
            onChange={handleChange}
          />
        </label>
        <label>
          Equity:
          <input
            type="number"
            name="equity"
            value={champaignData.equity}
            onChange={handleChange}
          />
        </label>
        <label>
          Cover Image:
          <input
            type="text"
            name="coverImage"
            value={champaignData.coverImage}
            onChange={handleChange}
          />
        </label>
        <label>
          Files URL:
          <input
            type="text"
            name="filesURL"
            value={champaignData.filesURL}
            onChange={handleChange}
          />
        </label>
        {champaignData.batches.map((batch, index) => (
          <div key={index}>
            <label>
              Batch Title:
              <input
                type="text"
                name="title"
                value={batch.title}
                onChange={(e) => handleBatchChange(index, e)}
              />
            </label>
            <label>
              Batch Description:
              <input
                type="text"
                name="description"
                value={batch.description}
                onChange={(e) => handleBatchChange(index, e)}
              />
            </label>
            {/* Add other batch fields here */}
          </div>
        ))}
        <button type="submit">Update Champaign</button>
      </form>
    </div>
  );
}

export default UpdateChampaign;
