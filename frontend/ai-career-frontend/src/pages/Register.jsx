import { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    const res = await registerUser(form);
    alert("Registered Successfully");
    console.log(res);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "320px",
        margin: "80px auto",
        padding: "30px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Register
      </motion.h2>

      {/* NAME */}
      <motion.input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        style={inputStyle}
      />

      {/* EMAIL */}
      <motion.input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        style={inputStyle}
      />

      {/* PASSWORD */}
      <motion.input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        style={inputStyle}
      />

      {/* BUTTON */}
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={buttonStyle}
      >
        Register
      </motion.button>
    </motion.div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#4a6fa5",
  color: "#fff",
  cursor: "pointer"
};