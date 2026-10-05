import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResumeView() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/resume/${id}`)
      .then((res) => setResume(res.data));
  }, [id]);

  if (!resume) return <h2>Loading...</h2>;



return (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }}
  >
    <div
      style={{
        width: "900px",
        background: "rgba(255,255,255,.08)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "30px",
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,.3)"
      }}
    >
      <h2>{resume.filename}</h2>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.5",
          color: "#e2e8f0"
        }}
      >
        {resume.parsed_text}
      </pre>

      <button
        onClick={() =>
          navigate(`/resume/analyze/${id}`)
        }
      >
        Analyze Resume
      </button>
    </div>
  </div>
);
}