import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ResumeCard({ title, path }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => path && navigate(path)}
      style={{
        padding: "20px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
    </motion.div>
  );
}