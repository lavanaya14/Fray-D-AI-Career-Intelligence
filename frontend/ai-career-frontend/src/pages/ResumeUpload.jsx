import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // console.log("TOKEN =", localStorage.getItem("token"));

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://127.0.0.1:8000/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const resumeId = res.data.resume_id;

      localStorage.setItem("resume_id", resumeId);

     
      navigate(`/resume/analyze/${resumeId}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={styles.icon}>📄</div>

        <h1 style={styles.title}>Upload Your Resume</h1>

        <p style={styles.subtitle}>
          Let AI analyze your resume and discover the best career opportunities.
        </p>

        <label style={styles.dropZone}>
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div>
            <h3>Drag & Drop Resume</h3>

            <p>PDF, DOCX supported</p>

            {file && <div style={styles.fileBox}>✅ {file.name}</div>}
          </div>
        </label>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={upload}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Analyzing Resume..." : "Upload & Analyze"}
        </motion.button>
      </motion.div>
    </div>
  );
}



const styles = {

  wrapper: {
    minHeight: "100vh",
    background: "#0b1120",
    color: "#fff",
    padding: "30px 24px 50px",
    boxSizing: "border-box",
  },


card: {
  width: "100%",
  maxWidth: "1600px",
  padding: "50px",
  boxSizing: "border-box",

  borderRadius: "30px",

  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",

  border: "1px solid rgba(255,255,255,0.08)",

  textAlign: "center",
  color: "white",

  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
},

  icon: {
    fontSize: "70px",
    marginBottom: "20px",
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "35px",
    fontSize: "17px",
  },

  dropZone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    minHeight: "220px",

    border: "2px dashed rgba(255,255,255,0.15)",

    borderRadius: "20px",

    cursor: "pointer",

    background: "rgba(255,255,255,0.03)",

    marginBottom: "25px",
  },

  fileBox: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(59,130,246,0.2)",
  },

  button: {
    width: "100%",
    padding: "16px",

    border: "none",

    borderRadius: "14px",

    background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",

    color: "white",

    fontWeight: "700",

    fontSize: "16px",

    cursor: "pointer",
  },
};
