import axios from "axios";
import "./Cars.css";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { PieChart, Pie, Tooltip } from 'recharts';


const URL = "http://localhost:2200";
console.log(debounce);
type Car = { name: string; price: string; type: string };
export function Cars(): JSX.Element {
    const [isCarsLoading, setIsCarsLoading] = useState<boolean>(false);
    const [cars, setCars] = useState([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isLatestResult, setIsLatestResult] = useState(false);

    // lifecycle
    // mounted

    useEffect(() => {
        getCars();
        return () => {
            console.log("canceling set state for", searchInput);
            setIsLatestResult(false);
        };
    }, [searchInput]);

    async function getCars() {
        try {
            setIsLatestResult(true);
            setIsCarsLoading(true);
            const result = await axios.get(`${URL}/cars?search=${searchInput}`);
            if (isLatestResult) {
                console.log("set state is working");
                setCars(result?.data?.data);
            }
        } catch (error) {
            alert("Something went wrong");
        } finally {
            setIsCarsLoading(false);
        }
    }
    const debouncedSetSearch = useMemo(
        () =>
            debounce((value) => {
                setSearchInput(value);
            }, 500), // 500ms delay
        []
    );
    const handleChange = (event: any) => {
        debouncedSetSearch(event.target.value);
    };

    function calcCarsTypes(cars: Array<Car>) {
        if (!Array.isArray(cars)) return;
        const result: { [key: string]: number } = cars.reduce((statsResult, currentCar) => {
            const currentType = currentCar.type;
            if (statsResult[currentType]) {
                statsResult[currentType]++;
            } else {
                statsResult[currentType] = 1
            }
            return statsResult
        }, {} as { [key: string]: number })
        return result;
    }
    const heavyCalculation = useMemo(() => calcCarsTypes(cars), [cars])
    const adaptData = Object.entries(heavyCalculation as {}).map(item => {
        return { name: item[0], value: item[1] }
    })
    return (
        <div className="Cars">
            <h1>Cars</h1>
            <div>
                <input type="text" onChange={handleChange} placeholder="Search..." />
                {/* <input type="text" onChange={handleChange} /> */}
            </div>
            <div>
                {isCarsLoading ? <h2>Loading...</h2> : JSON.stringify(heavyCalculation)}
            </div>
            <div>
                {isCarsLoading ? (
                    <h2>Loading...</h2>
                ) : (
                    <div
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 3,
                        }}
                    >
                        {cars?.map((c: Car) => {
                            return (
                                <div style={{ border: "1px solid black" }}>
                                    <h2>{c.name}</h2>
                                    <h2>{c.price}</h2>
                                    <h2>{c.type}</h2>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>


            <PieChart width={600} height={500}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={adaptData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>


        </div>
    );
}
