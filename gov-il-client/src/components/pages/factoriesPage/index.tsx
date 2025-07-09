import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import { getFactoriesApi, type FactoryClient } from "./service/getFactoriesApi";
import { PieChart } from "@mui/x-charts/PieChart";
import { getFactoriesReport } from "./utils";

export default function FactoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [factories, setFactories] = useState<Array<Partial<FactoryClient>>>([]);

  useEffect(() => {
    async function getFactories() {
      try {
        setIsLoading(true);
        const result = await getFactoriesApi();
        setFactories(result);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    getFactories();
  }, []);

  const factoriesPerLocationReport = getFactoriesReport(factories);

  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <h1> Factory Page</h1>
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
