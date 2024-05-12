import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const CampaignCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/champaign/getAllChampaigns");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log();
      }
    };
    getData();
  }, []);



  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {data.map((item) => (
        <Link to={`/detailedChamapaign/${item._id}`} key={item._id}>
          <div className="  border border-gray-300 rounded-lg shadow-lg bg-gray-200 flex flex-col">
            <img
              className="rounded-t-lg object-cover h-64"
              src={item.coverImage}
              alt=""
            />
            <div className="flex flex-col flex-grow p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 h-16 overflow-hidden">
                {item.title}
              </h5>
              <p className="text-gray-600 text-sm mt-1">
              {item.description.substring(0, 124) }...
                
              </p>
              <ProgressBar
                value={Math.round(
                  (item.amountGained / item.amountRequired) * 100
                )}
              />
              <p className="text-gray-600 text-xl mt-2 font-semibold">
                {item.amountGained} USD raised of {item.amountRequired} USD
              </p>
              <p className="text-gray-600 text-xl mt-1 font-semibold">
               <span className="font-bold">Equity:</span>  {item.equity}%
              </p>
              <p className="text-gray-600 text-xl mt-1 font-semibold">
              <span className="font-bold">Batches: </span>  {item.batches.length}
              </p>
              
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CampaignCard;
