import { Routes, Route, NavLink } from "react-router-dom";
import SignUp from "./pages/auth/register";
import Login from "./pages/auth/login";

export default function App() {
  return (
    <div className="min-h-screenbg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-md mt-8 mb-6 bg-white shadow rounded-lg p-4 flex justify-center gap-8">
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `font-medium ${
              isActive ? "text-blue-700 underline-offset-4" : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `font-medium ${
              isActive ? "text-blue-700 underline-offset-4" : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          Login
        </NavLink>
      </nav>

      {/* Routes */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-12">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}
