import FlightsPage from "./components/pages/flightsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./components/pages/home";
import ButtonAppBar from "./components/appBar";
import CarsPage from "./components/pages/carsPage";
// import FactoryPage from "./components/pages/factoriesPage";
const LazyFactoryPage = lazy(() => import("./components/pages/factoriesPage"));

function App() {
  return (
    <>
      <div>
        <ButtonAppBar />
        <Suspense fallback={<div>Still Loading Page...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            {/* 2 */}
            <Route path="/flights" element={<FlightsPage />} />
            {/* 3 */}
            <Route path="/cars" element={<CarsPage />} />
            {/* 1 */}
            <Route path="/factories" element={<LazyFactoryPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
