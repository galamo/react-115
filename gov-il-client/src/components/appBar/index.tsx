import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";


export default function ButtonAppBar() {
    const favorites = useAppSelector(state => state.cars.favorites)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/home">Home</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/flights">Flights</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/cars">Cars</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/cars-favorites">Cars Favorites Page ({favorites.length}) </Link>
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/factories">factories</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/heavy-route">Heavy</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/heavy-list-page">List </Link>
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
