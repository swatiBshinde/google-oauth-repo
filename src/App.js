import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./App.css";

function App() {
  const [isLoginTrue, setIsLoginTrue] = useState(false);
  const [userName, setUserName] = useState("");

  const onSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    let jwtDecoded = jwt_decode(credentialResponse.credential);
    console.log(jwtDecoded.email_verified);
    setIsLoginTrue(jwtDecoded.email_verified);
    setUserName(jwtDecoded.name);
  };
  const onError = () => {
    console.log("Login Failed");
  };

  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      {isLoginTrue ? (
        <span> Welcome {userName}!</span>
      ) : (
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      )}
    </div>
  );
}

export default App;
