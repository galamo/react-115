import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { useEffect, useState } from "react";
import { getFactoriesApi, type FactoryClient } from "./service/getFactoriesApi";
import { PieChart } from "@mui/x-charts/PieChart";
import { getFactoriesReport } from "./utils";
const limitsValues = [10, 20, 30, 40, 50];
export default function FactoryPage() {
  const [_, setIsLoading] = useState(false);
  const [factories, setFactories] = useState<Array<Partial<FactoryClient>>>([]);
  const [limitOfResults, setLimitOfResults] = useState(10);

  useEffect(() => {
    async function getFactories() {
      try {
        setIsLoading(true);
        const result = await getFactoriesApi(limitOfResults);
        setFactories(result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    getFactories();
    return () => {};
  }, [limitOfResults]);

  const factoriesPerLocationReport = getFactoriesReport(factories);

  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <h1> Factory Page</h1>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="my-select-label">Limit</InputLabel>
          <Select
            labelId="my-select-label"
            id="my-select"
            value={limitOfResults}
            label="Age"
            onChange={async (event: any) => {
              setLimitOfResults(event.target.value);
            }}
          >
            {limitsValues.map((item: number) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <PieChart
            series={[
              {
                data: factoriesPerLocationReport,
              },
            ]}
            width={400}
            height={400}
          />
        </Box>
      </div>
    </div>
  );
}
