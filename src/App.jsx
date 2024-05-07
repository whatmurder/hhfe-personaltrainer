import {AppBar, Container, CssBaseline, Toolbar, Typography} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

export default function App() {
    return (
        <div className="App">
            <AppBar position="static" sx={{backgroundColor: '#B1B1EF'}}>
                <CssBaseline/>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontWeight: 700,
                        letterSpacing: '2%',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                        >
                        Personal Training
                    </Typography>
                    <nav>
                        <Link to={"/customers"}>Customers</Link>
                        <Link to={"/trainings"}>Trainings</Link>
                        <Link to={"/calendar"}>Calendar</Link>
                        <Link to={"/charts"}>Charts</Link>
                    </nav>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
                <Outlet/>
            </Container>
        </div>
    );
}