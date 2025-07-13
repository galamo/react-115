import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ButtonAppBar from "./components/appBar";
const LazyFactoryPage = lazy(() => import("./components/pages/factoriesPage"));
const LazyHomePage = lazy(() => import("./components/pages/home"));
const LazyCarsPage = lazy(() => import("./components/pages/carsPage"));
const LazyFlightsPage = lazy(() => import("./components/pages/flightsPage"));
const LazyHeavyPage = lazy(() => import("./components/pages/heavyPage"));
const LazyHeavyListPage = lazy(
  () => import("./components/pages/heavyListPage")
);

function App() {
  return (
    <>
      <div>
        <ButtonAppBar />
        <Suspense fallback={<div>Still Loading Page...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<LazyHomePage />} />
            <Route path="/flights" element={<LazyFlightsPage />} />
            <Route path="/cars" element={<LazyCarsPage />} />
            <Route path="/factories" element={<LazyFactoryPage />} />
            <Route path="/heavy-route" element={<LazyHeavyPage />} />
            <Route path="/heavy-list-page" element={<LazyHeavyListPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
