import { useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
const DetailedChampaign = () => {
  const [data, setData] = useState();
  const params = useParams();
  useEffect(() => {
    const getChampaign = async () => {
      const res = await fetch(
        `/api/champaign/getSpecChampaign/66324e4d8f5e73c0626625f7`
      );
      const data = await res.json();
      setData(data);
    };
    getChampaign();
  }, [params.id]);
  if (!data)
    return (
      <div className="">
        {" "}
        <Loader />{" "}
      </div>
    );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">{data.title}</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-2/3">
          <div className="mb-4">
            <img src={data.coverImage} alt="" className="w-full h-auto" />
          </div>
          <p className="text-gray-700">{data.description}</p>
          <div className="batches-section bg-gray-100 p-6 rounded-lg">
  <h1 className="text-2xl font-bold mb-4">Batches</h1>
  <div className="grid gap-6">
    {data?.batches
      ? data.batches.map((item, index) => (
          <div key={item._id} className={`batch-item bg-white p-6 rounded-md shadow-md ${index > 0 ? 'mt-6' : ''}`}>
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-gray-700 font-bold">Time Required: {item.timeRequired} days</p>
            <p className="text-gray-700 font-bold">Amount Required: {item.amountRequired} INR</p>
          </div>
        ))
      : "Batch information not available"}
  </div>
</div>



        </div>
        <div className="md:w-1/3 md:relative ">
          <div className=" md:fixed">
            <h1 className="text-2xl  mb-4">
              <b>{data.amountGained}</b> INR raised of {data.amountRequired}{" "}
              goal
            </h1>
            <ProgressBar
              value={Math.round(
                (data.amountGained / data.amountRequired) * 100
              )}
            />

            <div className="mb-4">
              <form action="submit" className="space-y-2">
                <div>
                  <label htmlFor="amount" className="block">
                    Amount:
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block">
                    Tip:
                  </label>
                  <input
                    type="number"
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block">
                    Equity:
                  </label>
                  <input
                    type="number"
                    disabled
                    value={456}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Donate now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedChampaign;
