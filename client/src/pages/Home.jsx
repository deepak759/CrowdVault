import { useNavigate } from "react-router-dom";

const Home = () => {
  
  sessionStorage.removeItem("investmentProcessed")

  const navigate=useNavigate()
  const handleClick=()=>{
    navigate('/detailedChamapaign/66324e4d8f5e73c0626625f7')
  }
  return (
    <div>
      <button onClick={handleClick}>Detailed Campaign</button>
    </div>
  )
}

export default Home
