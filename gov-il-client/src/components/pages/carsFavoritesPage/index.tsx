import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import carData from "../../../types_def/car.json";
import type { CarClient } from "../carsPage/service/getCarApi";

export type CarType = typeof carData;

export default function CarsFavoritesPage() {
  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <h1> My Favorites Page</h1>

      {/* <CarCard {...currentCar} />} */}
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
