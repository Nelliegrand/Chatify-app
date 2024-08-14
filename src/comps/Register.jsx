import React from "react";

function Register() {
    return (
        <div>
            <div>
                <h2>Registrering</h2>
                <form>
                    <label htmlFor="username">Emailadress:</label>
                    <input type="text" />
                    <label htmlFor="password">Lösenord:</label>
                    <input type="password" />
                    <button type='submit'>Registrera</button>
                </form>
            </div>
        </div>
    )
}

export default Register