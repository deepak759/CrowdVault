/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const InvestmentCard = ({ item, category }) => {
  return (
    <Link to={`/detailedChamapaign/${item._id}`}>
    <div className="border border-gray-300 rounded-lg shadow-lg bg-gray-100 flex flex-col">
      <img
        src={item.coverImage}
        alt={item.title}
        className="w-full object-cover rounded-md mb-2 h-64"
      />
      <h1 className="text-xl h-16 font-bold mb-2 px-3">{item.title}</h1>
      <p className="text-gray-700 mb-2 px-3">{item.description.substring(0,200)}...</p>
      <div className="flex justify-between mb-2 px-3">
        <h2 className="font-semibold">
          {category === "invested" ? (
            <span>
              <span className="font-bold">Invested:</span>{" "}
              <span className="font-semibold">{item.invested} USD</span>
            </span>
          ) : (
            <span>
              <span className="font-bold">Amount Required: </span>
              <span className="font-semibold">{item.amountRequired} USD</span>
            </span>
          )}
        </h2>
        <h2 className="font-semibold">
          {category === "invested"
            ? 
            <span>
              <span className="font-bold">Equity:</span>{" "}
              <span className="font-semibold">{item.equityHolder}%</span>
            </span>
            : 
            
            <span>
              <span className="font-bold">Amount Gained:</span>{" "}
              <span className="font-semibold">{item.amountGained} USD</span>
            </span>
            }
        </h2>
      </div>
    </div>
    </Link>
  );
};

export default InvestmentCard;
