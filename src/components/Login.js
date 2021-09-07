import React from "react";
import Api from "../Api";
import "./Login.css";

export default () => {
  /* handles */
  const handleFacebookLogin = async () => {
    let result = await Api.Popup();
    if (result) {
    } else {
      alert("Erro!");
    }
  };

  return (
    <div className="login">
      <button onClick={handleFacebookLogin}>Login com Facebook</button>
    </div>
  );
};
