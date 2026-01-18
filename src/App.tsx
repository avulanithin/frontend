import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

type User = {
  email: string;
  name: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ email: payload.email, name: payload.name });
      } catch {
        localStorage.removeItem("jwt");
      }
    }
    setLoading(false);
  }, []);

  const handleGoogleSuccess = async (res: any) => {
    const backendRes = await axios.post(
      "http://127.0.0.1:8000/auth/google",
      { token: res.credential }
    );

    localStorage.setItem("jwt", backendRes.data.access_token);
    setUser(backendRes.data.user);
    window.location.href = "/dashboard";
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    window.location.href = "/";
  };

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h1>AI Executive Secretary</h1>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Login failed")}
                />
              </div>
            ) : (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {user && (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
