import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function AuthTest() {
  const handleSuccess = async (res: any) => {
    console.log("Google response:", res);

    const googleToken = res.credential;

    const backendRes = await axios.post(
      "http://127.0.0.1:8000/auth/google",
      { token: googleToken }
    );

    console.log("Backend response:", backendRes.data);

    localStorage.setItem("jwt", backendRes.data.access_token);
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Google Auth Test</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Failed")} />
    </div>
  );
}
