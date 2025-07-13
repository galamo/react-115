import { Input, TextField } from "@mui/material";
import { useState, useTransition } from "react";

const css = {
  margin: "auto",
  width: "80%",
  border: "1px solid black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "auto",
};
const bigList = Array.from({ length: 10000 }, (_, i) => `Item #${i}`);
// filter - input
// remove item
// add item

console.log(bigList);
export default function HeavyListPage() {
  const [input, setInput] = useState("");
  const [color, setColor] = useState("");
  const [list, setList] = useState(bigList);
  const [isLoading, startTransition] = useTransition();

  function handleChange(e: any) {
    const value = e.target.value;
    setInput(value);

    console.log("handleChange");
    startTransition(() => {
      const filteredItems = bigList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      console.log("filter items");
      setList(filteredItems);
    });
  }
  return (
    <div style={{ margin: "10px" }}>
      <div style={css}>
        <h1> List </h1>
      </div>
      <div style={css}>
        <TextField value={input} onChange={handleChange} />
        <input
          onChange={(e) => {
            startTransition(() => {
              setColor(e.target.value);
            });
          }}
          type="color"
        />
      </div>
      <div style={{ ...css }}>
        {isLoading ? <h1>Updating list..</h1> : null}
      </div>
      <div style={{ ...css, height: "100vh" }}>
        <ul>
          {list.slice(0, 100).map((item) => {
            return (
              <li key={item} style={{ background: color }}>
                {" "}
                {item}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
