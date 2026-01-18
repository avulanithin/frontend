import axios from "axios";

export async function fetchDailySummary() {
  const token = localStorage.getItem("jwt");

  const res = await axios.get(
    "http://127.0.0.1:8000/dashboard/daily-summary",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
