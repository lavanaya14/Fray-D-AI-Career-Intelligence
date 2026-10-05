import { motion } from "framer-motion";
import Wavify from "react-wavify";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, #4a6fa5, #6c8ecf)",
        color: "white",
        padding: "40px",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1>AI Career Assistant</h1>
      <p>Upload Resume • Get ATS Score • Improve Skills</p>

      <Wavify
        fill="#ffffff"
        paused={false}
        options={{
          height: 20,
          amplitude: 30,
          speed: 0.25,
          points: 3,
        }}
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
      />
    </motion.div>
  );
}