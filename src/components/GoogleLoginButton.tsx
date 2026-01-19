import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const token = credentialResponse.credential;

          const res = await axios.post(
            "http://localhost:8000/auth/google",
            { token }
          );

          // ✅ store JWT
          localStorage.setItem("access_token", res.data.access_token);

          // ✅ redirect to dashboard
          navigate("/dashboard");
        } catch (err) {
          alert("Login failed at backend");
          console.error(err);
        }
      }}
      onError={() => {
        alert("Google login failed");
      }}
    />
  );
};

export default GoogleLoginButton;
