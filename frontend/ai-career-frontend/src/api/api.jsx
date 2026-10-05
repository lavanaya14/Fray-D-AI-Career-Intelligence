const BASE_URL = "http://127.0.0.1:8000";

// LOGIN (FastAPI OAuth form-data)
export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  return res.json();
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

// UPLOAD RESUME
export const uploadResume = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/resume/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};

// GET RESUME
export const getResume = async (id) => {
  const res = await fetch(`${BASE_URL}/resume/${id}`);
  return res.json();
};

// ANALYZE RESUME
export const analyzeResume = async (id) => {
  const res = await fetch(`${BASE_URL}/resume/analyze/${id}`);
  return res.json();
};