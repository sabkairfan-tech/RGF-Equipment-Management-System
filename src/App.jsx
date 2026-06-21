import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Equipment from "./pages/Equipment";
import Assignments from "./pages/Assignments";
import Returns from "./pages/Returns";
import Test from "./pages/Test";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="returns" element={<Returns />} />
          <Route path="test" element={<Test />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}