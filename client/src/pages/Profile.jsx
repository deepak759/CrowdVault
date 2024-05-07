import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import InvestmentCard from "../components/InvestmentCard";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [start, setStart] = useState(false);
  const [showCategory, setShowCategory] = useState("Investments");
  const [data, setData] = useState();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();

        setData(data);
        setStart(true);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  useEffect(() => {
    if (data) {
      // Loop through each item in data.investedChampaigns
      const updatedChampaigns = data.investedChampaigns.map((item) => {
        // Find corresponding item in currentUser.invested based on champaignID
        const investedItem = currentUser.invested.find(
          (investedItem) => investedItem.champaignID === item._id
        );
        // If corresponding item is found, update equity and invested properties
        if (investedItem) {
          item.equityHolder = investedItem.equity;
          item.invested = investedItem.invested;
        }
        return item;
      });

      // Update state with modified investedChampaigns array
      setData((prevData) => ({
        ...prevData,
        investedChampaigns: updatedChampaigns,
      }));
    }
  }, [start]);
  console.log(data);
  if (!data)
    return (
      <div className="">
        <Loader />
      </div>
    );

  return (
    <div className="flex md:mx-20">
      <div className=" w-full">
        <div className="flex bg-gray-200  justify-around">
          <button
            className={`hover:cursor-pointer ${showCategory==='Investments'?"bg-gray-300":"bg-gray-200"} w-[50%] text-center  p-2 hover:bg-gray-400  transition duration-300 ease-in-out`}
            onClick={() => setShowCategory("Investments")}
          >
            Investments
          </button>
          <button
            className={`${showCategory!=='Investments'?"bg-gray-300":"bg-gray-200"} hover:cursor-pointer w-[50%] text-center p-2 hover:bg-gray-400  transition duration-300 ease-in-out`}
            onClick={() => setShowCategory("Campaigns")}
          >
            Campaigns
          </button>
        </div>
        {showCategory === "Investments" ? (
        data.investedChampaigns.length>0?  data.investedChampaigns.map((item) => (
            <div className="" key={item._id}>
              <InvestmentCard item={item} category={"invested"} />
            </div>
          )):<h1 className="text-center mt-20 text-2xl">You Have not Invested in any Campaign</h1>
        ) : (
          data.createdChampaigns.length>0 ?   data.createdChampaigns.map((item) => (
            <div className="" key={item._id}>
              <InvestmentCard item={item} category={"created"}/>
            </div>
          )):<h1 className="text-center mt-20 text-2xl">You Have not Created any Campaign</h1>
        )}
      </div>
   
    </div>
  );
};

export default Profile;
