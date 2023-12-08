import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/global";
import Home from "./components/pages/HomePage";
import Appointments from "./components/pages/AppointmentsPage";
import { ThemeProvider, createTheme } from "@mui/material";
import NewAppointmentPage from "./components/pages/AppointmentsPage/NewAppointmentPage";
import { AppointmentProvider } from "./contexts/AppointmentProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { Login } from "./components/pages/Login";
import NewAvailabilityPage from "./components/pages/AvailabilityPage/NewAvailabilityPage";
import AvailabilityPage from "./components/pages/AvailabilityPage";
import PrivateRoute from "./components/shared/PrivateRoute";
import ROLE from "./utils/types/Role";
import SignUpPage from "./components/pages/SignUpPage";
import ProfileAdminPage from "./components/pages/AdminProfilePage";
import UserProfilePage from "./components/pages/UserProfilePage";
import Layout from "./components/shared/Layout";

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
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/appointments/new" element={<PrivateRoute roles={[ROLE.USER]} component={NewAppointmentPage} />} />
                  <Route path="/availability/new" element={<PrivateRoute roles={[ROLE.ADMIN]} component={NewAvailabilityPage} />} />
                  <Route path="/profile/admin" element={<PrivateRoute roles={[ROLE.ADMIN]} component={ProfileAdminPage} />} />
                  <Route path="/availability" element={<PrivateRoute roles={[ROLE.ADMIN]} component={AvailabilityPage} />} />
                  <Route path="/profile/user" element={<UserProfilePage />} />
                </Route>
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route path="login" element={<Login />} />
                <Route path="/signup" element={<SignUpPage />} />
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
