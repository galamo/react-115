import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
let renders = 0;
const URL = "http://localhost:2200";

export function Home(): JSX.Element {
  const [isSalesLoading, setIsSalesLoading] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const [sales, setSales] = useState<
    {
      description: string;
      price: string;
      endDate: string;
    }[]
  >([]);
  // lifecycle
  // mounted
  renders++;
  console.log("Render component...", renders);

  useEffect(() => {
    getSales();
    return () => {};
  }, [currentMonth]);

  async function getSales() {
    try {
      setIsSalesLoading(true);
      const result = await axios.get(`${URL}/sales?input=${currentMonth}`);
      setSales(result?.data?.data);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsSalesLoading(false);
    }
  }

  return (
    <div className="Home">
      <h1> Home</h1>

      <button
        onClick={() => {
          setCurrentMonth((new Date().getMonth() + 1).toString());
        }}
      >
        This Month Sales
      </button>

      <button
        onClick={() => {
          setCurrentMonth((new Date().getMonth() + 2).toString());
        }}
      >
        Next Month Sales
      </button>

      <button
        onClick={() => {
          setCurrentMonth("");
        }}
      >
        All Sales
      </button>

      {isSalesLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>{JSON.stringify(sales)}</div>
      )}
    </div>
  );
}
