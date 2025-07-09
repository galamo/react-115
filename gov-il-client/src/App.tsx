import { useState } from "react";
import FlightsPage from "./components/pages/flightsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home";
import ButtonAppBar from "./components/appBar";
import CarsPage from "./components/pages/carsPage";
import FactoryPage from "./components/pages/factoriesPage";
function App() {
  return (
    <>
      <div>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/factories" element={<FactoryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
