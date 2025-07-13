import { lazy, Suspense } from "react";
const HeavyCalender = lazy(() => import("./calender"));
const HeavyChart = lazy(() => import("./chart"));
const css = {
  margin: "auto",
  width: "80%",
  border: "1px solid black",
  height: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function HeavyPage() {
  return (
    <div style={{ margin: "10px" }}>
      <div style={css}>
        <Suspense fallback={<h1> Loading heavy Calender... </h1>}>
          <HeavyCalender />
        </Suspense>
      </div>

      <div style={css}>
        <Suspense fallback={<h1> Loading heavy Chart... </h1>}>
          <HeavyChart />
        </Suspense>
      </div>
    </div>
  );
}
