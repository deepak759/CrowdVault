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

import Header from "./components/Header";
import Success from "./pages/Success";
import UpdateChampaign from "./pages/UpdateChampaign";
import SearchResult from "./pages/SearchResult";
function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <div className="main mb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/search/:searchTerm' element={<SearchResult /> }/>
        
         
          <Route
            path="/detailedChamapaign/:id"
            element={<DetailedChampaign />}
          />

          <Route element={<PrivateRoute />}>
            <Route path="/success" element={<Success />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createBatch/:id" element={<CreateBatch />} />
            <Route path="/createChampaign" element={<CreateChampaign />} />
            <Route path="/updateChampaign/:id" element={<UpdateChampaign />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
