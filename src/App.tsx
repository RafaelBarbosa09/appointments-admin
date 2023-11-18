import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/global";
import Home from "./components/pages/HomePage";
import Appointments from "./components/pages/AppointmentsPage";
import { ThemeProvider, createTheme } from "@mui/material";
import NewAppointmentPage from "./components/pages/AppointmentsPage/NewAppointmentPage";
import { AppointmentProvider } from "./contexts/AppointmentProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { Login } from "./components/pages/Login";

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
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/appointments/new" element={<NewAppointmentPage />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
          <GlobalStyles />
        </ThemeProvider>
      </AppointmentProvider>
    </>
  );
}

export default App;
