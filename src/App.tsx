import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/global";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
}

export default App;
