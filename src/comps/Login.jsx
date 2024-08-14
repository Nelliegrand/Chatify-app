import React from "react";

function Login() {
    return (
        <div>
            <div>
                <h2>Logga in</h2>
                <form>
                    <label htmlFor="username">Emailadress:</label>
                    <input type="text" />
                    <label htmlFor="password">Lösenord:</label>
                    <input type="password" />
                    <button type='submit'>Logga in</button>
                </form>
            </div>
        </div>
    )
}

export default Login