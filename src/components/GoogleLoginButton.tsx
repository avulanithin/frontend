import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const token = credentialResponse.credential;

        const res = await axios.post("http://localhost:8000/auth/google", {
          token,
        });

        localStorage.setItem("access_token", res.data.access_token);
      }}
      onError={() => {
        console.error("Google Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;
