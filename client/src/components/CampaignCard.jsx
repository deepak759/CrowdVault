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
    <div className="container  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center">
      {data.map((item) => (
        <Link to={`/detailedChamapaign/${item._id}`} key={item._id}>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md flex flex-col">
            <img
              className="rounded-t-lg object-cover h-64"
              src={item.coverImage}
              alt=""
            />
            <div className="flex flex-col flex-grow p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 h-16 overflow-hidden">
                {item.title}
              </h5>
              <ProgressBar
                value={Math.round(
                  (item.amountGained / item.amountRequired) * 100
                )}
              />
              <p className="text-gray-600 text-sm mt-2 font-semibold">
                {item.amountGained} USD raised of {item.amountRequired} USD
              </p>
              <p className="text-gray-600 text-sm mt-2 font-semibold">
                Equity: {item.equity}%
              </p>
              <p className="text-gray-600 text-sm mt-2 font-semibold">
                Batches: {item.batches.length}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CampaignCard;
