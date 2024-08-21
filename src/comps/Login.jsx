import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // useEffect(() => {
    //     // Om användaren redan är inloggad, omdirigera till chat-sidan
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         navigate("/chat");
    //     }
    // }, [navigate]);

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

                // Kontrollera att vi får en JWT tillbaka
                if (token) {
                    // Spara token i localStorage
                    localStorage.setItem('token', token);
                    const decodedJwt = JSON.parse(atob(token.split('.')[1]));
                    localStorage.setItem('user', JSON.stringify(decodedJwt));

                    console.log("User data saved to localStorage:", JSON.stringify(decodedJwt));

                    // Omdirigera till chat-sidan
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
            <div>
                <h1>Logga in</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Användarnamn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="btn btn-primary" onClick={handleLogin}>Logga in</button>
            </div>
            <Footer />
        </>
    );
};

export default Login;


