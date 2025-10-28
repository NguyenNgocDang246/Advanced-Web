import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-md mt-8 mb-6 bg-white shadow rounded-lg p-4 flex justify-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-blue-700 underline underline-offset-4"
                : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-blue-700 underline underline-offset-4"
                : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `font-medium ${
              isActive
                ? "text-blue-700 underline underline-offset-4"
                : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          Login
        </NavLink>
      </nav>

      {/* Nội dung chính */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mb-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Our App 👋</h1>
        <p className="text-gray-600">Explore our features — sign up or log in to get started.</p>
      </div>
    </div>
  );
}
