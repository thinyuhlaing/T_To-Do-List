import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppTrash from "./AppTrash";
import Home from "./Home";

function AppRounter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trash" element={<AppTrash />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRounter;
