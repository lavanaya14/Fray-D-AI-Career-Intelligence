import { useState } from "react";
import axios from "axios";

export default function CareerChatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm Fray-D, your AI Career Intelligence Assistant. Ask me about careers, interviews, resumes, skills, roadmaps, jobs, and more.",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chatbot", {
        message: message,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Something went wrong.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.chatContainer}>
        <div style={styles.header}>
          <div style={styles.avatar}>F</div>

          <div>
            <h1 style={styles.title}>Fray-D</h1>
            <p style={styles.subtitle}>AI Career Intelligence Assistant</p>
          </div>
        </div>

        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  marginBottom: "4px",
                  color: "#64748b",
                }}
              >
                {msg.sender === "user" ? "You" : "🤖 Fray-D"}
              </span>

              <div
                style={{
                  ...styles.message,
                  background:
                    msg.sender === "user"
                      ? "linear-gradient(135deg,#2563eb,#4f46e5)"
                      : "#f1f5f9",

                  color: msg.sender === "user" ? "#fff" : "#0f172a",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Ask Fray-D anything about your career..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            style={styles.input}
          />

          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f8fafc,#e2e8f0)",
    padding: "20px",
  },

  chatContainer: {
    width: "950px",
    background: "#fff",
    borderRadius: "24px",
    padding: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "15px",
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "24px",
  },

  title: {
    margin: 0,
    color: "#2563eb",
    fontSize: "30px",
  },

  subtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  chatBox: {
    height: "500px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    background: "#fafafa",
  },

  message: {
    maxWidth: "75%",
    padding: "14px 16px",
    borderRadius: "14px",
    wordWrap: "break-word",
    lineHeight: "1.5",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#2563eb,#4f46e5)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },
};
