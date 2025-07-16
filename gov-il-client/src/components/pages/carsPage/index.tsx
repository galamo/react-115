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
import {
  addCarsForSale,
  addToFavorites,
  getCarByLP,
  removeFromFavorites,
} from "../../../store/features/cars/carSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

export type CarType = typeof carData;
// connect to redux!
export default function CarsPage() {
  const lpText = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCar, setCurrentCar] = useState<CarClient | null>(null);
  const data = useAppSelector((state) => state.cars.carsForSale.length);
  const details = useAppSelector((state) => state.userDetails?.details);

  const dispatch = useAppDispatch();

  const isAddToFavoritePermitted =
    Array.isArray(details?.permissions?.cars) &&
    details?.permissions?.cars.some((item) => item === "write");

  console.log(isAddToFavoritePermitted, "isAddToFavoritePermitted");
  async function handleLPsearch() {
    try {
      setIsLoading(true);
      if (!lpText.current || !lpText.current.value)
        throw new Error("Missing LP");

      //   dispatch(getCarByLP(lpText.current.value));
      const result = await getCarApi(lpText.current.value);
      if (!result || !result.lp) throw new Error("No Result");
      setCurrentCar(result);
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCarEvent(cCar: CarClient) {
    dispatch(
      addToFavorites({
        lp: cCar.lp,
        manufacturer: cCar.manufacturer,
        model: cCar.model,
        dateOfRelease: cCar.dateOfRelease,
        year: cCar.year,
        color: cCar.color,
        lastTestDate: cCar.lastTestDate,
      })
    );
  }
  function handleCarEventRemove(cCar: CarClient) {
    dispatch(removeFromFavorites({ lp: cCar.lp }));
  }

  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <h1> Cars Page {data}</h1>
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
            onChange={() => {
              dispatch(addCarsForSale({ lp: 1 }));
            }}
          />
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleLPsearch}> Search Car </Button>
        )}
      </div>
      <div>
        {currentCar && (
          <CarCard
            showFavorites={isAddToFavoritePermitted}
            {...currentCar}
            sendCurrentObj={handleCarEvent}
            remove={handleCarEventRemove}
          />
        )}
      </div>
    </div>
  );
}

function CarCard(
  props: CarClient & {
    sendCurrentObj: Function;
    remove: Function;
    showFavorites: boolean;
  }
) {
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
        {props.showFavorites ? (
          <Button
            size="large"
            onClick={() => {
              props.sendCurrentObj(props);
            }}
          >
            Add To Favorites
          </Button>
        ) : null}
        <Button
          size="large"
          onClick={() => {
            props.remove(props);
          }}
        >
          Remove?
        </Button>
      </CardActions>
    </Card>
  );
}
