import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import PhotosList from "./pages/PhotosList";
import PhotoDetails from "./pages/PhotoDetails";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-[100vw]">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/photos" className="text-xl font-semibold">
            Picsum Gallery
          </Link>
          <nav>
            <Link to="/photos" className="text-sm text-gray-600 hover:text-gray-900">
              Photos
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/photos" replace />} />
          <Route path="/photos" element={<PhotosList />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
