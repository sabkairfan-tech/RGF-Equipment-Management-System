import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-3 rounded-lg mb-2 ${
    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
  }`;

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-4 ">
      <h2 className="text-xl font-bold mb-20"></h2>

      <NavLink to="/" end className={linkClass}>
        Dashboard
      </NavLink>

      <NavLink to="/equipment" className={linkClass}>
        Equipment
      </NavLink>

      <NavLink to="/employees" className={linkClass}>
        Employees
      </NavLink>

      <NavLink to="/assignments" className={linkClass}>
        Assignments
      </NavLink>

      <NavLink to="/returns" className={linkClass}>
        Returns
      </NavLink>

      <NavLink to="/test" className={linkClass}>
        Test
      </NavLink>
    </div>
  );
}