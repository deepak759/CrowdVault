import { Link,  useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { BiSolidEditAlt } from "react-icons/bi";
import StatusIndicator from "../components/StatusIndicator";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import MetaMask from "../components/MetaMask";
const DetailedChampaign = () => {
  sessionStorage.removeItem("investmentProcessed");
  const [data, setData] = useState(null);
  const [equity, setEquity] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [tip, setTip] = useState(250);
  const { currentUser } = useSelector((state) => state.user);
  const [showCrypto, setShowCrypto] = useState(false);

  const params = useParams();

  useEffect(() => {
    const getChampaign = async (id) => {
      const res = await fetch(`/api/champaign/getSpecChampaign/${id}`);
      const data = await res.json();
      setData(data);
      if (data.userRef === currentUser?._id) setIsOwner(true);
      else setIsOwner(false);
    };
    getChampaign(params.id);
  }, [params.id, currentUser?._id]);

  useEffect(() => {
    if (currentUser !== null) setIsLogin(true);
  }, [currentUser]);

  const handleInvestmentChange = () => {
    const eqty = ((investment / data.amountRequired) * data.equity).toFixed(4);

    setEquity(eqty);
  };

  useEffect(() => {
    if (data) {
      handleInvestmentChange();
    }
  }, [data, investment]);

  const handleInvestment = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51OsnSiSCYJhYhwAnl1OhMTQ1ZBBGy9nJZcRsHzQWLj1cfBwToiNyuk0BAELYjq2z4PH2rZtAPInwzaEhV97PuxSP00YdKxlibp"
    );

    const body = {
      products: [
        {
          title: data.title,
          coverImage: data.coverImage,
          invested: investment,
          tip: tip,
          equity: equity,
          champaignID: params.id,
        },
      ],
    };
    const header = {
      "Content-Type": "Application/json",
    };
    const res = await fetch(`/api/champaign/payment/${params.id}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    });
    const session = await res.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (!data)
    return (
      <div className="">
        {" "}
        <Loader />{" "}
      </div>
    );

  return (
    <div className="container max-w-[1280px] p-[2rem] detailCamapaign mx-auto md:p-4 mb-10">
      <h1 className="text-5xl font-bold mb-4 capitalize pb-6 text-center">
        {data.title}
      </h1>

      <div className="flex px-4 flex-col md:flex-row md:space-x-4">
        <div className="md:w-2/3 shadow-lg">
          <div className="mb-4">
            <img
              src={data.coverImage}
              alt=""
              className="w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-gray-700 px-4">{data.description}</p>
          <div className="my-4 px-4 flex justify-between">
            <Link
              to={data.filesURL}
              className="bg-gray-600 p-1 my-3 text-slate-100 rounded-md px-4 inline-block"
              target="_blank"
            >
              Files
            </Link>
            {isOwner && (
              <Link to={`/updateChampaign/${params.id}`} className="text-2xl">
                {" "}
                <BiSolidEditAlt />
              </Link>
            )}
          </div>
          <div className="batches-section bg-gray-100 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Batches</h1>
            <div className="grid gap-6">
              {data?.batches.length > 0
                ? data.batches.map((item, index) => (
                    <div
                      key={item._id}
                      className={`batch-item bg-white p-6 rounded-md shadow-md ${
                        index > 0 ? "mt-6" : ""
                      }`}
                    >
                      <div className="flex justify-between font-bold">
                        <h2 className="text-lg capitalize font-semibold mb-2">
                          Batch {item.batchNumber} : {item.title}
                        </h2>
                      </div>
                      <p className="text-gray-700 mb-2">{item.description}</p>
                      <p className="text-gray-700 font-semibold">
                        <span className="font-bold">Time Required:</span>{" "}
                        {item.timeRequired} Months
                      </p>
                      <p className="text-gray-700 font-semibold">
                        <span className="font-bold">Amount Required:</span>{" "}
                        {item.amountRequired} USD
                      </p>
                      <div className="mt-2 flex justify-between">
                        {item.filesURL !== "" ? (
                          <Link
                            to={item.filesURL}
                            className="bg-gray-600 p-1 text-slate-100 rounded-md px-4"
                            target="_blank"
                          >
                            Files
                          </Link>
                        ) : (
                          <div></div>
                        )}
                        <StatusIndicator item={item.status} />
                      </div>
                    </div>
                  ))
                : "Batch information not available"}
            </div>
            <div className="flex items-center mt-8">
              <Link
                to={`/createBatch/${params.id}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-4"
              >
                Add Batches
              </Link>
              <p className="text-green-800 py-4 text-sm">
                Note: Adding batches helps investors to understand your project
                in a better way.
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-1/3 md:relative    ">
          <div className=" md:sticky md:top-8">
            <img
              className="w-full h-40  rounded-t-md"
              src="https://t4.ftcdn.net/jpg/04/35/43/67/360_F_435436717_rVpiZB8Uqa4kXbhIvBzbqqLwdS2veLCL.jpg"
              alt="banner image"
            />
            <h1 className="text-2xl py-2 mb-4">
              <b>{data.amountGained}</b> USD raised of {data.amountRequired}{" "}
              goal
            </h1>
            <ProgressBar
              value={Math.round(
                (data.amountGained / data.amountRequired) * 100
              )}
            />

            <div className="mb-4 py-4">
              <form onSubmit={handleInvestment} className="space-y-2">
                <div>
                  <label htmlFor="amount" className="block font-semibold pb-2">
                    Amount:
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="eg. 4500"
                    max={data.amountRequired - data.amountGained}
                    onChange={(e) => {
                      setInvestment(e.target.value);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block font-semibold pb-2">
                    Tip:
                  </label>
                  <input
                    type="number"
                    required
                    onChange={(e) => {
                      setTip(e.target.value);
                    }}
                    min={250}
                    placeholder=" eg. 250"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="amount" className="block font-semibold pb-2">
                    Equity:
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${equity} %`}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="font-bold text-md">
                  <button
                    type="submit"
                    className="bg-blue-500 w-full mt-2 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    disabled={isOwner || !isLogin}
                    style={{
                      cursor: isOwner || !isLogin ? "not-allowed" : "pointer",
                    }}
                    title={
                      isOwner
                        ? "Owner cannot invest in their own Campaign"
                        : !isLogin
                        ? "You Need to login before investing"
                        : ""
                    }
                  >
                    Invest Now
                  </button>
                </div>
              </form>
              <div className="">{showCrypto && <MetaMask data={data} />}</div>
              <button
                onClick={() => setShowCrypto(true)}
                className="bg-green-500 font-semibold w-full mt-2 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
                disabled={isOwner || !isLogin}
                style={{
                  cursor: isOwner || !isLogin ? "not-allowed" : "pointer",
                }}
                title={
                  isOwner
                    ? "Owner cannot invest in their own Campaign"
                    : !isLogin
                    ? "You Need to login before investing"
                    : ""
                }
              >
                Invest Using Crypto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedChampaign;
