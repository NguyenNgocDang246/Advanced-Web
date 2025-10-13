const BASE = "https://picsum.photos";

export async function fetchPhotosPage(page = 1, limit = 20, signal) {
  const url = `${BASE}/v2/list?page=${page}&limit=${limit}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Failed to fetch photos (status ${res.status})`);
  return res.json();
}

export async function fetchPhotoById(id, signal) {
  const url = `${BASE}/id/${id}/info`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Failed to fetch photo (status ${res.status})`);
  return res.json();
}
