import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function fetchDailySummary() {
  const token = localStorage.getItem("jwt");

  // 1. No token → force login
  if (!token) {
    localStorage.removeItem("jwt");
    window.location.href = "/";
    throw new Error("Not authenticated");
  }

  try {
    const res = await axios.get(
      `${API_BASE_URL}/dashboard/daily-summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    // 2. Token invalid / expired
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      window.location.href = "/";
    }

    throw new Error("Failed to load dashboard data");
  }
}
