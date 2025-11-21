import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DOMPurify from "dompurify";

export default function Chat() {
    const { user, getMessages, sendMessage, deleteMessage } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // Toggle för mock
    const useMock = true;
    const registerToApiWhenMock = true;

    const MOCK_MESSAGES = [
        { id: "m1", text: "Hej! Välkommen till Chatify 👋", userId: "u2" },
        { id: "m2", text: "Tack! Hur funkar det här?", userId: "u1" },
        { id: "m3", text: "Skriv ett meddelande i rutan nedan.", userId: "u2" },
    ];

    function mkId() {
        return `temp-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
    }

    function generateMockReply(text) {
        const t = text.toLowerCase();
        if (t.includes("hej") || t.includes("hallå")) return "Hej!";
        if (t.includes("tack")) return "Varsågod!";
        if (t.includes("mår")) return "Jag mår fint!";
        return "🟢 Echo: " + (text.length > 60 ? text.slice(0, 57) + "..." : text);
    }

    // Initiera meddelanden
    useEffect(() => {
        async function init() {
            if (useMock) {
                const mapped = MOCK_MESSAGES.map(m =>
                    m.userId === "u1" ? { ...m, userId: user?.id ?? "u1" } : m
                );
                setMessages(mapped);
                return;
            }

            try {
                const data = await getMessages();
                setMessages(data);
            } catch (err) {
                console.error("Kunde inte hämta API, fallback → mock", err);
                setMessages(MOCK_MESSAGES);
            }
        }
        if (user) init();
    }, [user]);

    // Skicka meddelande
    async function handleSend() {
        if (!input.trim()) return;

        const cleanInput = DOMPurify.sanitize(input);
        setInput("");

        const tempId = mkId();
        const tempMsg = {
            id: tempId,
            text: cleanInput,
            userId: user.id,
        };

        // Visa direkt i UI (optimistiskt)
        setMessages(prev => [...prev, tempMsg]);

        // Skicka till servern
        if (!useMock || registerToApiWhenMock) {
            try {
                const savedMsg = await sendMessage(cleanInput); // detta returnerar latestMessage
                setMessages(prev =>
                    prev.map(m => (m.id === tempId ? savedMsg : m))
                );
            } catch (err) {
                console.error("Fel vid skick av meddelande:", err);
            }
        }

        // Auto-reply från mock
        if (useMock) {
            setTimeout(() => {
                const reply = {
                    id: `mock-reply-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
                    text: generateMockReply(cleanInput),
                    userId: "u2",
                };
                setMessages(prev => [...prev, reply]);
            }, 800 + Math.random() * 800);
        }
    }

    // Radera meddelande
    async function handleDelete(id) {
        if (useMock) {
            setMessages(prev => prev.filter(m => m.id !== id));
            return;
        }
        try {
            await deleteMessage(id);
            setMessages(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error("Kunde inte ta bort:", err);
        }
    }

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map(msg => {
                    const isMine = msg.userId === user.id;
                    const key = msg.id || `msg-${Math.random()}`; // säkerställ unik key
                    return (
                        <div key={key} className={`message-row ${isMine ? "mine" : "theirs"}`}>
                            <div className={`message ${isMine ? "mine" : "theirs"}`}>
                                <p>{msg.text}</p>
                            </div>
                            {isMine && (
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(msg.id)}
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="message-input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Skriv ett meddelande..."
                />
                <button onClick={handleSend}>Skicka</button>
            </div>
        </div>
    );
}
