import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import InvestmentCard from "../components/InvestmentCard";
import { MdVerified } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateUserSuccess } from "../redux/user/userSlice";

const Profile = () => {
  const [start, setStart] = useState(false);
  const [showCategory, setShowCategory] = useState("Investments");
  const [data, setData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [requested, setRequested] = useState(false);
  const [varificationDocURL, setVarificationDocURL] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();

        setData(data);
        setRequested(data.user.varificationDocURL && !data.user.isAdmin)
        setStart(true);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/verifyProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ varificationDocURL }),
      });
      const data = await res.json();
      if (data.success == false) {
        console.log(data.message);
      } else {
        setShowForm(false)
        setRequested(true)
        dispatch(updateUserSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data) {
      const updatedChampaigns = data.investedChampaigns.map((item) => {
        const investedItems = data.user.invested.filter(
          (investedItem) => investedItem.champaignID === item._id
        );
        investedItems.forEach((investedItem) => {
          if ( investedItem.isBuffer) {
            item.bufferEquityHolder = investedItem.equity;
            item.bufferInvested = investedItem.invested;
          } else  {
            item.equityHolder = investedItem.equity;
            item.invested = investedItem.invested;
          }
        });
        return item;
      });

      setData((prevData) => ({
        ...prevData,
        investedChampaigns: updatedChampaigns,
      }));
    }
  }, [start]);
 
  if (!data)
    return (
      <div className="">
        <Loader />
      </div>
    );

  return (
    <div className="flex mt-10 mx-10 md:mx-20">
      <div className="w-full">
        <div className="text-lg flex justify-between my-2 p-6 bg-white shadow-md rounded-lg">
          <div className="w-1/2 my-8 ">
            <h1 className="font-semibold mb-2 flex items-center">
              <span className="font-bold">UserName:</span> {data.user.userName}
              {data.user.isVarified && (
                <MdVerified className="text-blue-600 text-2xl ml-2" />
              )}
            </h1>

            <h1 className="font-semibold mb-4">
              <span className="font-bold">Registered email:</span>{" "}
              {data.user.email}
            </h1>
            {data.user.isVarified  ? (
              <div className="bg-green-600 max-w-sm text-white py-2 px-4 rounded hover:bg-green-700 transition">
                Verified
              </div>
              
            ) : 
            <button
                onClick={() => setShowForm(!showForm)}
                disabled={requested}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
               {requested?" Verification Pending":" Verify Yourself"}
              </button>
            }
          </div>
          <div className="w-1/2">
            {showForm && (
              <form
                onSubmit={handleVerifySubmit}
                className="bg-gray-100 p-4 rounded shadow-sm"
              >
                <div className="mb-4">
                  <label
                    htmlFor="verification-doc"
                    className="block font-semibold mb-2"
                  >
                    Verification Document
                  </label>
                  <input
                    id="verification-doc"
                    type="text"
                    required
                    onChange={(e) => setVarificationDocURL(e.target.value)}
                    placeholder="Upload your work history or patent certificate"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex bg-gray-200 justify-around">
          <button
            className={`hover:cursor-pointer ${
              showCategory === "Investments" ? "bg-gray-300" : "bg-gray-200"
            } w-[50%] text-center p-2 hover:bg-gray-400 transition duration-300 ease-in-out`}
            onClick={() => setShowCategory("Investments")}
          >
            Investments
          </button>
          <button
            className={`hover:cursor-pointer ${
              showCategory !== "Investments" ? "bg-gray-300" : "bg-gray-200"
            } w-[50%] text-center p-2 hover:bg-gray-400 transition duration-300 ease-in-out`}
            onClick={() => setShowCategory("Campaigns")}
          >
            Campaigns
          </button>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 mt-4 justify-items-center ">
          {showCategory === "Investments" ? (
            data.investedChampaigns.length > 0 ? (
              data.investedChampaigns.map((item) => (
                <div className="" key={item._id}>
                  <InvestmentCard item={item} category={"invested"} />
                </div>
              ))
            ) : (
              <h1 className="text-center mt-20 text-2xl">
                You Have not Invested in any Campaign
              </h1>
            )
          ) : data.createdChampaigns.length > 0 ? (
            data.createdChampaigns.map((item) => (
              <div className="" key={item._id}>
                <InvestmentCard item={item} category={"created"} />
              </div>
            ))
          ) : (
            <h1 className="text-center mt-20 text-2xl">
              You Have not Created any Campaign
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
