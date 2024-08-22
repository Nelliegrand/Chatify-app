import { useState, useEffect } from "react";
import Sidenav from "./SideNav";

function Chat() {

    const [user, setUser] = useState(null)


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log("Användare", parsedUser); // Logga användaruppgifterna
            }
        } catch (error) {
            console.error(error);
            setUser(null); // Återställ användarstate om det misslyckas
        }
    }, []);

    return (
        <div>
            <Sidenav />
            <header>
                {/* Visa användarnamn och avatar om användaren är inloggad */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <h2>Välkommen, {user.user}!</h2>
                    </div>
                ) : (
                    <h2>Avatar:</h2>
                )}
            </header>

            <div>
                <h1>Din chatt</h1>

            </div>
        </div>
    );
}

export default Chat;