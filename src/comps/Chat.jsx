import { useState, useEffect } from "react";
import Sidenav from "./SideNav";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "./Header";
import Footer from "./Footer";

//Mina setters
function Chat() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");

    // Mockade meddelanden 
    const mockMessages = [
        { text: "Hejsan!", userId: "12345", createdAt: "2023-09-03T10:00:00Z" },
        { text: "Hur mår du?", userId: "67890", createdAt: "2023-09-03T10:01:00Z" }
    ];

    useEffect(() => {
        // Hämta och parsa användardata från localStorage
        const storedUser = localStorage.getItem("user");
        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log("Användare:", parsedUser);
            }
        } catch (error) {
            console.error("Failed to parse user:", error);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        // Hämta meddelande funktion
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Ingen giltig token hittad.");
                    return;
                }

                // Hämta meddelanden från API
                const response = await axios.get(
                    "https://chatify-api.up.railway.app/messages",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Hämtade meddelanden", response.data); //Loga förr att se hämtade meddelanden

                if (response.data) {
                    // blanda mockade meddeleanden med mina skickade meddelanden
                    const allMessages = [...response.data, ...mockMessages];


                    const userMessages = allMessages.map(message => {
                        if (!message.createdAt) {
                            return { ...message, createdAt: new Date().toISOString() };
                        }
                        return message;
                    });


                    userMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));


                    setMessages(userMessages);
                }

            } catch (error) {
                console.error("Kan ej hämta meddelanden", error);
                if (error.response) {
                    console.error(error.response.data);
                }
                setError("Kunde inte hämta meddelanden");
            }
        };


        fetchMessages();
    }, []);

    //funktion för att skicka meddelanden
    const handleSendMessage = async () => {

        console.log("Text:", text);
        console.log("User:", user);

        if (text.trim() === "") {
            console.warn("Inget meddelande att skicka");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Ingen giltig token hittad.");
                return;
            }

            // Skickar det nya meddelandet till API
            const response = await axios.post(
                "https://chatify-api.up.railway.app/messages",
                {
                    text: text,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            console.log(response.data);

            if (response.data) {
                const newMessage = {
                    ...response.data.latestMessage,
                    userId: user.id,
                    createdAt: new Date().toISOString()
                };
                // Använt sanering med DOMPurify och dangerouslySetInnerHTML
                const sanitizedMessage = {
                    ...newMessage,
                    text: DOMPurify.sanitize(newMessage.text)
                };

                // Lägger till det nya meddelandet i listan av meddelanden
                setMessages((prevMessages) => [
                    ...prevMessages,
                    sanitizedMessage
                ]);

                setText(""); // Tömt textfältet efter meddelandet har skickats
            }
        } catch (error) {
            console.error("Kan ej skicka meddelande", error);
            if (error.response) {
                console.error(error.response.data);
            }
            setError("Kan ej skicka meddelande");
        }
    };

    // Hanterar radering av ett meddelande
    const handleDeleteMessage = async (messageId) => {

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Ingen giltig token hittad.");
                return;
            }

            // Anropar API för att radera meddelandet
            await axios.delete(
                `https://chatify-api.up.railway.app/messages/${messageId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Uppdatera meddelandelistan efter radering
            setMessages((prevMessages) =>
                prevMessages.filter((message) => message.id !== messageId)
            );

        } catch (error) {
            console.error("Kan ej radera meddelande", error);
            setError("Kan ej radera meddelande");
        }
    };

    return (
        <>
            <Header />
            <div>
                <Sidenav />
                <div id="main">
                    <header>
                        {user ? (
                            <div className="logged-in-user">
                                <img className="avatar-pic"
                                    src={user.avatar}
                                    alt="Avatar"
                                />
                                <h2>Välkommen, {user.user}!</h2>
                            </div>
                        ) : (
                            <h2>Avatar:</h2>
                        )}
                    </header>

                    <div>
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="messages">
                                <h4>Dina meddelanden med [Person]</h4>
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`message-wrapper ${message.userId === user?.id ? "self-end" : "self-start"}`}
                                    >
                                        {/* Avatar ligger ovanför meddelandet */}
                                        <img
                                            className="message-avatar"
                                            src={message.userId === user?.id ? user.avatar : "https://i.pravatar.cc/200"}
                                            alt="User Avatar"
                                        />

                                        <div className={`message-container`}>
                                            <div className="message">
                                                <p dangerouslySetInnerHTML={{ __html: message.text }} />
                                            </div>

                                            {message.userId === user?.id && (
                                                <div className="delete-button-container">
                                                    <button onClick={() => handleDeleteMessage(message.id)} className="delete-button">Radera</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="send-message-form">
                            <input
                                type="text"
                                placeholder="Skriv ett meddelande..." //Placeholder
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button
                                onClick={handleSendMessage} //knapp för skicka meddelande
                            >
                                Skicka
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Chat;