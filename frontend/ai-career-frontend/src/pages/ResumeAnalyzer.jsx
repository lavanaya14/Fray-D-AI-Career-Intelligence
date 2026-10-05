import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResumeAnalyzer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [resumeRes, analysisRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/resume/${id}`),
          axios.get(`http://127.0.0.1:8000/resume/analyze/${id}`),
        ]);

        console.log("RESUME =", resumeRes.data);
        console.log("ATS ANALYSIS =", analysisRes.data);

        setResume(resumeRes.data);
        setAnalysis(analysisRes.data);
      } catch (error) {
        console.error("ATS ERROR =", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingCard}>
          <h2>🤖 Analyzing Your Resume...</h2>
          <p>AI is checking your resume and calculating your ATS score.</p>
        </div>
      </div>
    );
  }

  const ai = analysis || {};

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <div style={styles.topHeader}>
        <div>
          <h1>📊 Resume ATS Analysis</h1>
          <p>
            Here's how your resume performs against modern ATS systems.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
        >
          ← Dashboard
        </button>
      </div>


      {/* RESUME + ATS SCORE */}
      <div style={styles.topGrid}>

        {/* RESUME CARD */}
        <motion.div
          style={styles.resumeCard}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div style={styles.icon}>📄</div>

          <div>
            <h2>Your Resume</h2>

            <p style={styles.filename}>
              {resume?.filename || "Uploaded Resume"}
            </p>

            <p style={styles.resumeStatus}>
              ✓ Successfully uploaded and analyzed
            </p>
          </div>
        </motion.div>


        {/* ATS SCORE */}
        <motion.div
          style={styles.scoreCard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div style={styles.circle}>
            {ai.ats_score || 0}%
          </div>

          <div>
            <h2>ATS Score</h2>

            <p style={styles.muted}>
              Current resume compatibility score
            </p>
          </div>
        </motion.div>

      </div>


      {/* STRENGTHS */}
      <motion.div
        style={styles.section}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>💪 Strengths</h2>

        <p style={styles.sectionSubtitle}>
          Skills and technologies detected from your resume.
        </p>

        {ai.skills?.length > 0 ? (
          <div style={styles.skillsWrap}>
            {ai.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p style={styles.muted}>No skills detected.</p>
        )}
      </motion.div>


      {/* WEAKNESSES */}
      <motion.div
        style={styles.section}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>⚠️ Areas To Improve</h2>

        <p style={styles.sectionSubtitle}>
          These areas may reduce your resume's ATS performance.
        </p>

        {ai.weak_areas?.length > 0 ? (
          <div>
            {ai.weak_areas.map((item, index) => (
              <div key={index} style={styles.weakCard}>
                <span>⚠️</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.muted}>
            No major weaknesses detected.
          </p>
        )}
      </motion.div>


      {/* AI SUGGESTIONS */}
      <motion.div
        style={styles.section}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>💡 AI Suggestions</h2>

        <p style={styles.sectionSubtitle}>
          Recommendations to improve your resume.
        </p>

        {ai.suggestions?.length > 0 ? (
          <div>
            {ai.suggestions.map((item, index) => (
              <div key={index} style={styles.suggestionCard}>
                <span>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.muted}>
            No suggestions available.
          </p>
        )}
      </motion.div>


      {/* NEXT STEP */}
      <div style={styles.nextCard}>
        <h2>🎯 Find Your Best Career Options</h2>

        <p>
          Based on your resume, AI can recommend the most suitable
          career roles for you.
        </p>

        <button
          onClick={() => navigate(`/job-match/${id}`)}
          style={styles.nextButton}
        >
          View Career Recommendations →
        </button>
      </div>

    </div>
  );
}


const styles = {

  // wrapper: {
  //   minHeight: "100vh",
  //   background: "#0b1120",
  //   color: "#fff",
  //   padding: "30px 24px 50px",
  //   boxSizing: "border-box",
  // },

wrapper: {
  width: "calc(100% - 40px)",
  minHeight: "100vh",

  background: "#0b1120",
  color: "#fff",

  padding: "30px 24px 50px",

  boxSizing: "border-box",

  marginRight: "40px",
},

  topHeader: {
    maxWidth: "1100px",
    margin: "0 auto 22px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  backButton: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    cursor: "pointer",
  },

  topGrid: {
    maxWidth: "1100px",
    margin: "0 auto 20px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  resumeCard: {
    padding: "24px",
    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",

    display: "flex",
    alignItems: "center",
    gap: "18px",

    border: "1px solid rgba(255,255,255,.15)",
  },

  icon: {
    fontSize: "40px",
  },

  filename: {
    margin: "6px 0",
    fontWeight: "700",
    fontSize: "16px",
  },

  resumeStatus: {
    color: "#bfdbfe",
    fontSize: "13px",
  },

  scoreCard: {
    padding: "24px",
    borderRadius: "18px",

    background:
      "linear-gradient(135deg,#7c3aed,#9333ea)",

    display: "flex",
    alignItems: "center",
    gap: "20px",

    border: "1px solid rgba(255,255,255,.15)",
  },

  circle: {
    width: "105px",
    height: "105px",

    minWidth: "105px",

    borderRadius: "50%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: "rgba(255,255,255,.12)",

    border: "5px solid rgba(255,255,255,.75)",

    fontSize: "28px",
    fontWeight: "800",
  },

  muted: {
    color: "#94a3b8",
  },

  section: {
    maxWidth: "1100px",
    margin: "0 auto 18px",

    padding: "24px",

    borderRadius: "18px",

    background: "rgba(255,255,255,.04)",

    border: "1px solid rgba(255,255,255,.1)",
  },

  sectionSubtitle: {
    color: "#94a3b8",
    marginTop: "5px",
    marginBottom: "15px",
  },

  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "9px",
    marginTop: "15px",
  },

  skill: {
    padding: "8px 13px",

    borderRadius: "999px",

    background: "rgba(16,185,129,.18)",

    border: "1px solid rgba(16,185,129,.25)",

    color: "#6ee7b7",

    fontSize: "14px",
    fontWeight: "600",
  },

  weakCard: {
    display: "flex",
    gap: "10px",

    padding: "12px 15px",

    marginTop: "9px",

    borderRadius: "10px",

    background: "rgba(239,68,68,.1)",

    border: "1px solid rgba(239,68,68,.2)",

    color: "#fca5a5",
  },

  suggestionCard: {
    display: "flex",
    gap: "10px",

    padding: "12px 15px",

    marginTop: "9px",

    borderRadius: "10px",

    background: "rgba(37,99,235,.1)",

    border: "1px solid rgba(37,99,235,.2)",

    color: "#93c5fd",
  },

  nextCard: {
    maxWidth: "1100px",
    margin: "25px auto 0",

    padding: "28px",

    borderRadius: "18px",

    textAlign: "center",

    background:
      "linear-gradient(135deg,#172554,#312e81)",

    border: "1px solid rgba(255,255,255,.12)",
  },

  nextButton: {
    marginTop: "15px",

    padding: "12px 22px",

    border: "none",

    borderRadius: "10px",

    background: "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "#fff",

    fontWeight: "700",

    cursor: "pointer",
  },

  loading: {
    minHeight: "100vh",
    background: "#0b1120",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    color: "#fff",
  },

  loadingCard: {
    textAlign: "center",
    padding: "40px",
  },
};