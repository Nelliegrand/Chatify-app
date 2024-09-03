import { useState, useEffect } from "react";
import Sidenav from "./SideNav";
import axios from "axios";
import DOMPurify from "dompurify";

function Chat() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");

    // Mockade meddelanden 
    const mockMessages = [
        { text: "Hejsan!", userId: "12345", timestamp: "2023-09-03T10:00:00Z" },
        { text: "Jag mår bra, hur mår du?", userId: "67890", timestamp: "2023-09-03T10:01:00Z" }
    ];

    useEffect(() => {
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
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Ingen giltig token hittad.");
                    return;
                }

                const response = await axios.get(
                    "https://chatify-api.up.railway.app/messages",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Hämtade meddelanden", response.data);

                if (response.data) {
                    const allMessages = [...response.data, ...mockMessages];
                    const allMessagesWithTimestamps = allMessages.map(message => {
                        if (!message.timestamp) {
                            return { ...message, timestamp: new Date().toISOString() };
                        }
                        return message;
                    });

                    allMessagesWithTimestamps.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                    setMessages(allMessagesWithTimestamps);
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
                    timestamp: new Date().toISOString()
                };


                const sanitizedMessage = {
                    ...newMessage,
                    text: DOMPurify.sanitize(newMessage.text) // Sanera texten
                };

                setMessages((prevMessages) => [
                    ...prevMessages,
                    sanitizedMessage
                ]);

                setText("");
            }
        } catch (error) {
            console.error("Kan ej skicka meddelande", error);
            if (error.response) {
                console.error(error.response.data);
            }
            setError("Kan ej skicka meddelande");
        }
    };

    return (
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
                                    className={`message ${message.userId === user?.id ? "self-end" : "self-start"}`}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: message.text }} />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="send-message-form">
                        <input
                            type="text"
                            placeholder="Skriv ett meddelande..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            onClick={handleSendMessage}
                        >
                            Skicka
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
