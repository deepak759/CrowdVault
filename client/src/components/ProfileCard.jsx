/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ProfilePic from "../assets/profile.avif";
import { useState } from "react";

const ProfileCard = ({ item }) => {
  const [error, setError] = useState(null);
  const handleVerifyClick = async () => {
    try {
      const res = await fetch(`/api/admin/verify/${item._id}`);
      const verified = await res.json();
      if (verified.success == false) {
        setError(verified.message);
      } else {
        item = verified;
      }
    } catch (error) {
      setError(error);
    }
  };
  console.log(error);
  return (
    <div>
      <div className="w-full px-4 pt-2 max-w-sm bg-gray-500 border border-gray-200 rounded-lg shadow ">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={ProfilePic}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {item.userName}
          </h5>
          <span className="text-sm text-gray-100 ">{item.email}</span>
          <div className="flex mt-4 md:mt-6">
            <Link
              to={`/getProfile/${item._id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Profile
            </Link>
            <button
              disabled={item.varificationDocURL == ""}
              style={{
                cursor:
                  item.varificationDocURL == "" ? "not-allowed" : "pointer",
              }}
              title={
                item.varificationDocURL == ""
                  ? "They haven't submitted any document"
                  : ""
              }
              onClick={handleVerifyClick}
              className={`py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 ${
                item.varificationDocURL == ""
                  ? "dark:bg-gray-600"
                  : "dark:bg-gray-800"
              }  dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
            >
              {item.isVarified ? "Varified" : "Verify"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
