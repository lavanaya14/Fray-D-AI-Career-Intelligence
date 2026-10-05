import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi, I'm Fray-D. Your AI Career Intelligence Assistant.",
    },
  ]);

  const [position, setPosition] = useState({
    x: window.innerWidth - 120,
    y: window.innerHeight - 120,
  });

  const dragRef = useRef(null);

  const startDrag = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = position.x;
    const initialY = position.y;

    const onMove = (moveEvent) => {
      setPosition({
        x: initialX + (moveEvent.clientX - startX),
        y: initialY + (moveEvent.clientY - startY),
      });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chatbot/",
        {
          message,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.response,
        },
      ]);
    } catch (err) {
      console.log(err);

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
    <>
      {/* Floating Fray-D Orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        onMouseDown={startDrag}
        onDoubleClick={() => setOpen(true)}
        style={{
          ...styles.orb,
          left: position.x,
          top: position.y,
          right: "auto",
          bottom: "auto",
        }}
      >
        F
      </motion.div>

      {/* Overlay */}
      {open && (
        <div style={styles.overlay}>
          <div style={styles.chatWindow}>
            <div style={styles.header}>
              <div style={styles.logo}>F</div>

              <div>
                <h2 style={{ margin: 0 }}>
                  Fray-D
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    opacity: 0.8,
                  }}
                >
                  AI Career Intelligence Assistant
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <div style={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user"
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <div
                    style={{
                      ...styles.message,
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg,#2563eb,#4f46e5)"
                          : "#f1f5f9",

                      color:
                        msg.sender === "user"
                          ? "#fff"
                          : "#111827",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.inputArea}>
              <input
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    sendMessage();
                }}
                placeholder="Ask Fray-D anything..."
                style={styles.input}
              />

              <button
                onClick={sendMessage}
                style={styles.sendBtn}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999998,
  },

  chatWindow: {
    position: "fixed",

    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",

    width: "65vw",
    maxWidth: "1000px",

    height: "75vh",

    background: "#fff",

    borderRadius: "24px",

    overflow: "hidden",

    boxShadow:
      "0 25px 60px rgba(0,0,0,0.3)",

    display: "flex",
    flexDirection: "column",

    zIndex: 999999,
  },

  header: {
    display: "flex",
    alignItems: "center",

    gap: "12px",

    padding: "18px",

    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "#fff",
  },

  logo: {
    width: "50px",
    height: "50px",

    borderRadius: "50%",

    background: "rgba(255,255,255,0.2)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontWeight: "bold",
    fontSize: "22px",
  },

  closeBtn: {
    marginLeft: "auto",

    border: "none",
    background: "transparent",

    color: "#fff",

    fontSize: "22px",

    cursor: "pointer",
  },

  messages: {
    flex: 1,

    overflowY: "auto",

    padding: "20px",

    background: "#f8fafc",

    display: "flex",
    flexDirection: "column",

    gap: "14px",
  },

  message: {
    maxWidth: "75%",

    padding: "14px 16px",

    borderRadius: "14px",

    lineHeight: "1.5",
  },

  inputArea: {
    display: "flex",

    gap: "10px",

    padding: "15px",

    borderTop: "1px solid #e5e7eb",
  },

  input: {
    flex: 1,

    padding: "14px",

    borderRadius: "12px",

    border: "1px solid #cbd5e1",

    outline: "none",
  },

  sendBtn: {
    padding: "14px 22px",

    border: "none",

    borderRadius: "12px",

    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    color: "#fff",

    cursor: "pointer",

    fontWeight: "bold",
  },

  orb: {
    position: "fixed",

    width: "80px",
    height: "80px",

    borderRadius: "50%",

    background:
      "radial-gradient(circle at 30% 30%, #60a5fa, #7c3aed, #2563eb)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    color: "#fff",

    fontWeight: "bold",
    fontSize: "26px",

    boxShadow:
      "0 0 45px rgba(96,165,250,0.9)",

    cursor: "grab",

    zIndex: 999999,
  },
};