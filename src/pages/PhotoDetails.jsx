import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPhotoById } from "../api/photos";
import Loader from "../components/Loader";

export default function PhotoDetails() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    fetchPhotoById(id, abortRef.current.signal)
      .then((data) => setPhoto(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => abortRef.current && abortRef.current.abort();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!photo) return <div>Không tìm thấy ảnh</div>;

  const { author, width, height, download_url } = photo;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/photos" className="text-sm text-gray-600 hover:text-gray-900">
        &larr; Quay lại
      </Link>
      <div className="mt-4 bg-white rounded-lg shadow-sm overflow-hidden">
        <img
          src={download_url}
          alt={author}
          className="w-full h-auto max-h-[70vh] object-contain"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Tác giả: {author}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Kích thước: {width} × {height}
          </p>
        </div>
      </div>
    </div>
  );
}
