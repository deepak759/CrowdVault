import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [start,setStart]=useState(false)
  const [data,setData]=useState()
 useEffect(()=>{
  const getUserData=async()=>{
    try {
      const res=await fetch('/api/user/profile');
      const data=await res.json();
     setStart(true)

      setData(data)
    } catch (error) {
     console.log(error) 
    }
  }
  getUserData()
 },[])
 useEffect(() => {
  if (data) {
    // Loop through each item in data.investedChampaigns
    const updatedChampaigns = data.investedChampaigns.map(item => {
      // Find corresponding item in currentUser.invested based on champaignID
      const investedItem = currentUser.invested.find(investedItem => investedItem.champaignID === item._id);
      // If corresponding item is found, update equity and invested properties
      if (investedItem) {
        item.equityHolder = investedItem.equity;
        item.invested = investedItem.invested;
      }
      return item;
    });

    // Update state with modified investedChampaigns array
    setData(prevData => ({
      ...prevData,
      investedChampaigns: updatedChampaigns
    }));
  }
}, [start]);
console.log(data)
if(!data)return <div className=""><Loader/></div>

  return <div>{
    
  }
    </div>;
};

export default Profile;
