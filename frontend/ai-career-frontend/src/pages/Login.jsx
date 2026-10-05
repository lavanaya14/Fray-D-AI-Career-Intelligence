import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "../api/api";
import { useAuth } from "../context/Auth";

export default function Login() {
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "login") {
        const res = await loginUser(form.email, form.password);

        // if (res.access_token) {
        //   login(res.access_token);

        //   localStorage.setItem("token", res.access_token);

        //   localStorage.setItem(
        //     "user",
        //     JSON.stringify({
        //       name: res.name,
        //       email: res.email,
        //     }),
        //   );

        //   navigate("/dashboard");
        // }
        // if (res.access_token) {
        //   login(res.access_token);
        //   localStorage.setItem("token", res.access_token);
        //   navigate("/dashboard");
        // }
        if (res.access_token) {
          login(res.access_token);

          localStorage.setItem("token", res.access_token);
          localStorage.setItem("user", JSON.stringify(res.user));

          navigate("/dashboard");
        } else {
          alert("Login failed");
        }
      } else {
        const res = await registerUser(form);

        if (res) {
          alert("Registered successfully");
          setState("login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h2 style={styles.title}>
          {state === "login" ? "Welcome Back 👋" : "Create Account"}
        </h2>

        <p style={styles.subtitle}>AI Career Assistant Dashboard</p>

        {state === "register" && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Processing..." : state === "login" ? "Login" : "Sign Up"}
        </motion.button>

        <p
          onClick={() => setState(state === "login" ? "register" : "login")}
          style={styles.switch}
        >
          {state === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span style={{ color: "#4a6fa5", fontWeight: "bold" }}>
            Click here
          </span>
        </p>
      </motion.form>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #1e3a8a, #0f172a)",
  },

  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },

  title: {
    color: "white",
    marginBottom: "0px",
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "13px",
    marginTop: "-8px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
  },

  button: {
    padding: "12px",
    background: "linear-gradient(135deg,#6366f1,#3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  switch: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#cbd5e1",
    cursor: "pointer",
    textAlign: "center",
  },
};
