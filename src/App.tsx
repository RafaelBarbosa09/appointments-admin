import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/global";
import Home from "./components/pages/HomePage";
import Appointments from "./components/pages/AppointmentsPage";
import { ThemeProvider, createTheme } from "@mui/material";
import NewAppointmentPage from "./components/pages/AppointmentsPage/NewAppointmentPage";
import { AppointmentProvider } from "./contexts/AppointmentProvider";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat, sans-serif',
    },
  });

  return (
    <>
      <AppointmentProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/appointments/new" element={<NewAppointmentPage />} />
            </Routes>
          </BrowserRouter>
          <GlobalStyles />
        </ThemeProvider>
      </AppointmentProvider>
    </>
  );
}

export default App;
