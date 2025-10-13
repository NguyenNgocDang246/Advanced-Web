import React, { useEffect, useState, useRef } from "react";
import { fetchPhotosPage } from "../api/photos";
import PhotoCard from "../components/PhotoCard";
import Loader from "../components/Loader";

export default function PhotosList() {
  const LIMIT = 20;
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const loadPhotos = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    try {
      const data = await fetchPhotosPage(pageNum, LIMIT, abortRef.current.signal);
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => [...prev, ...data]);
        if (data.length < LIMIT) setHasMore(false);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to load photos");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos(1); // load lần đầu
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Photos</h1>

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </section>

      {error && <div className="mt-4 text-red-600 text-center">Lỗi: {error}</div>}

      {error ? (
        ""
      ) : (
        <div className="flex justify-center mt-6">
          {loading ? (
            <Loader />
          ) : hasMore ? (
            <button
              onClick={() => loadPhotos(page)}
              className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Load More
            </button>
          ) : (
            <p className="text-gray-500 text-sm">Không còn ảnh để tải thêm.</p>
          )}
        </div>
      )}
    </div>
  );
}
