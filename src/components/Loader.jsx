import React from "react";

export default function Loader() {
  return (
    <button
      disabled
      className="flex items-center gap-2 bg-gray-200 text-gray-600 px-5 py-2 rounded-md cursor-not-allowed"
    >
      <svg
        className="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      Loading...
    </button>
  );
}
