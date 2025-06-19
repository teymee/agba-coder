import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/localStorageServices";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function RedirectURI() {
  const hash = window.location.hash;

  const navigate = useNavigate();

  let params = new URLSearchParams(hash);
  const data = {
    token: params.get("#access_token"),
    expiryIn: params.get("expires_in"),
    expiryAt: params.get("expires_at"),
    refreshToken: params.get("refresh_token"),
  };

  useEffect(() => {
    if (data.token) {
      setLocalStorage("tokenDetails", data);
      navigate("/dashboard");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
}
