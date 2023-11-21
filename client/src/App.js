import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppContext from "./config/AppContext";
import Home from "./screen/home/Home";
import Restaurants from "./screen/restaurants/Restaurants";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import SingleRestaurant from "./screen/singleRestaurant/SingleRestaurant";
import "./app.css";
import Footer from "./components/footer/Footer";
import Booking from "./screen/singleRestaurant/Booking";
function App() {
  const [ActualData_AccessedName, setActualData_AccessedName] = useState(null);
  const [visitTime, setVisitTime] = useState(null);
  const [CurrentRestaurant, setCurrentRestaurant] = useState(null);
  const [CurrentPromotion, setCurrentPromotion] = useState(null);
  const [dataSection1, setDataSection1] = useState(null);
  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          visitTime,
          setVisitTime,
          dataSection1,
          setDataSection1,
          ActualData_AccessedName,
          setActualData_AccessedName,
          CurrentPromotion,
          setCurrentPromotion,
          CurrentRestaurant,
          setCurrentRestaurant,
        }}
      >
        <div className="app-bars">
          <div className="app-sidebar">
            <Sidebar />
          </div>
          <div className="app-body">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:name" element={<SingleRestaurant />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/my-restaurants" element={<Restaurants />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
