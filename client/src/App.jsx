import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateBatch from "./pages/CreateBatch";
import CreateChampaign from "./pages/CreateChampaign";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DetailedChampaign from "./pages/DetailedChampaign";
import PrivateRoute from "./components/PrivateRoute";
import UpdateChampaign from "./pages/UpdateChampaign";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detailedChamapaign/:id" element={<DetailedChampaign />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createBatch" element={<CreateBatch />} />
          <Route path="/createChampaign" element={<CreateChampaign />} />
          <Route path="/updateChampaign" element={<UpdateChampaign />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
