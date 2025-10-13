import React from "react";
import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
  const thumbUrl = `https://picsum.photos/id/${photo.id}/400/300`;
  return (
    <Link to={`/photos/${photo.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={thumbUrl}
            alt={`Photo by ${photo.author}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium truncate">{photo.author}</h3>
        </div>
      </div>
    </Link>
  );
}
