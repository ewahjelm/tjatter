import { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { getMessages, sendMessage, deleteMessage } from "../api/api";

export default function Chat() {
  const { user } = useAuth(); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

/*   // Enkel sanering
  function sanitize(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  } */

  // Hämta meddelanden vid mount
  useEffect(() => {
    async function chatInit() {
      const data = await getMessages();
      setMessages(data);
    }
    chatInit();
  }, []);

  // Skicka nytt meddelande
  async function handleSend() {
    if (!input.trim()) return;

    const cleanText = sanitize(input);

    const newMsg = {
      text: cleanText,
      userId: user.id,
    };

    const saved = await sendMessage(newMsg);   // backend sparar och returnerar objektet

    setMessages(prev => [...prev, saved]);
    setInput("");
  }

  // Radera
  async function handleDelete(id) {
    await deleteMessage(id);

    setMessages(prev => prev.filter(m => m.id !== id));
  }

  return (
    <div className="chat-container">

      <div className="messages">
        {messages.map(msg => {
          const isMine = msg.userId === user.id;

          return (
            <div 
              key={msg.id} 
              className={`message ${isMine ? "mine" : "theirs"}`}
            >
              <p>{msg.text}</p>

              {isMine && (
                <button onClick={() => handleDelete(msg.id)}>
                  🗑
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
