import React from 'react';
import "./Login.css";

export default () => {
    return (
        <div className="login">
            <button onClick={handleFacebookLogin}>Login com Facebook</button>
        </div>
    )
}