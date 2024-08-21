import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const avatars = Array.from({ length: 10 }, (_, index) =>
        `https://i.pravatar.cc/150?img=${index + 1}`
    );

    const handleRegister = async () => {
        try {
            const res = await axios.patch("https://chatify-api.up.railway.app/csrf");

            console.log('csrfToken is: ', res.data.csrfToken);

            const response = await axios.post("https://chatify-api.up.railway.app/auth/register", {
                username,
                email,
                password,
                avatar: avatarUrl,
                csrfToken: res.data.csrfToken
            });

            if (response.status === 201) {
                setSuccess("Registrering lyckad, du omdirigeras nu att logga in!");
                setTimeout(() => navigate("/login"), 3000);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError("Användarnamn eller e-postadress finns redan");
            } else {
                setError("Ett oväntat fel uppstod. Försök igen senare.");
            }
        }
    };

    return (
        <>
            <Header />
            <div>
                <h1>Registrera nytt konto</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>} {/* Visa framgångsmeddelande */}
                <h2>Välj en Avatar</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {avatars.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Avatar ${index + 1}`}
                            style={{
                                cursor: 'pointer',
                                margin: '5px',
                                border: avatarUrl === url ? '2px solid blue' : 'none' // Markera vald avatar
                            }}
                            onClick={() => setAvatarUrl(url)}
                        />
                    ))}
                </div>

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
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        type="text"
                        className="grow"
                        placeholder="Username"
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
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button className="btn btn-primary" onClick={handleRegister}>Registrera</button>
            </div>
            <Footer />
        </>
    );
}

export default Register;