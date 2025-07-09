import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import carData from "../../../types_def/car.json";
import { useRef, useState } from "react";
import { getCarApi, type CarClient } from "./service/getCarApi";

export type CarType = typeof carData;

export default function CarsPage() {
  const lpText = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCar, setCurrentCar] = useState<CarClient | null>(null);

  async function handleLPsearch() {
    try {
      setIsLoading(true);
      if (!lpText.current || !lpText.current.value)
        throw new Error("Missing LP");
      const result = await getCarApi(lpText.current.value);
      if (!result || !result.lp) throw new Error("No Result");
      setCurrentCar(result);
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <h1> Cars Page</h1>
      <div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            inputRef={lpText}
            id="outlined-basic"
            label="Car LP"
            variant="outlined"
          />
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleLPsearch}> Search Car </Button>
        )}
      </div>
      <div>{currentCar && <CarCard {...currentCar} />}</div>
    </div>
  );
}

function CarCard(props: CarClient) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {props.lp}
        </Typography>
        <Typography variant="h5" component="div">
          {" "}
          {props.color}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {props.lastTestDate}
        </Typography>
        <Typography variant="body2">
          {props.manufacturer}
          <br />
          {props.year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{props.dateOfRelease}</Button>
      </CardActions>
    </Card>
  );
}
