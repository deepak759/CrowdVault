import { Link, useNavigate } from "react-router-dom";
import HomeBg from "../assets/homebg.jpg";
import HometopBg from "../assets/hometopimg.png";
import CampaignCard from "../components/CampaignCard";


const Home = () => {
  sessionStorage.removeItem("investmentProcessed");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/detailedChamapaign/66324e4d8f5e73c0626625f7");
  };
  return (
    <div>
      <div className="relative">
        <div className="HomeBanner">
          <div className="relative">
            <img
              src={HomeBg}
              className="w-full blur-sm md:h-[80vh]"
              alt="HomeBG"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className=" absolute flex flex-col justify-center  px-3  inset-0">
              <div className=" topbanner  flex justify-around px-3  inset-0">
                <div className=" w-[75%] md:w-[60%] ">
                  <h1 className="text-3xl md:text-7xl font-bold  md:mb-4">
                    Invest in Batches,
                  </h1>
                  <h1 className="text-4xl md:text-7xl font-bold text-slate-800 md:mb-4">
                    Secure Your Investment
                  </h1>
                  <p className="text-lg md:text-4xl md:mr-24 text-gray-200">
                    A unique way of investment where investors invest in batches
                    of a program. Rest assured, your investment is safe and you
                    can withdraw whenever you want.
                  </p>
                </div>
                <div className="">
                  <img src={HometopBg} className="" alt="" />
                </div>
              </div>
              <div className="px-3 mt-3 md:pl-24 text-xl">
                <Link to={'/signin'} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 px-6 ">
      <h1 className="text-center mb-6 font-bold  text-4xl uppercase">Campaigns</h1>
        <CampaignCard/>
      </div>
    </div>
  );
};

export default Home;
