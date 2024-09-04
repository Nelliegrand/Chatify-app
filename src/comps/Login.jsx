import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onLogin }) {  // Ta emot onLogin som en prop
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.patch("https://chatify-api.up.railway.app/csrf");

            const response = await axios.post("https://chatify-api.up.railway.app/auth/token", {
                username: username,
                password: password,
                csrfToken: res.data.csrfToken
            });

            if (response.status === 200) {
                const token = response.data.token;

                if (token) {
                    localStorage.setItem('token', token);
                    const decodedJwt = JSON.parse(atob(token.split('.')[1]));
                    localStorage.setItem('user', JSON.stringify(decodedJwt));

                    console.log("User data saved to localStorage:", JSON.stringify(decodedJwt));

                    onLogin();
                    navigate("/chat");
                } else {
                    setError("Användardata saknas");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Felaktigt användarnamn eller lösenord");
        }
    };

    return (
        <>
            <Header />
            <div className="form-container">
                <h1 className="login">Logga in</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label className="input-field">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Användarnamn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="input-field">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="password"
                        placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="btn-primary-register-login" onClick={handleLogin}>Logga in</button>
            </div>
            <Footer />
        </>
    );
}

export default Login;



