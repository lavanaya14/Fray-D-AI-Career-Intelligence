import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [atsDetails, setAtsDetails] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showATS, setShowATS] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [loadingATS, setLoadingATS] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [userName, setUserName] = useState("User");
  const [dashboard, setDashboard] = useState(null);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user") || "null");

  //   if (user?.name) {
  //     setUserName(user.name);
  //   }
  // }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user?.name) {
      setUserName(user.name);
    }

    // const resumeId = localStorage.getItem("resume_id");

    // if (!resumeId) return;

    // axios
    //   .get(`http://127.0.0.1:8000/resume/dashboard/${resumeId}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setDashboard(res.data);
    //   })
    axios
      .get("http://127.0.0.1:8000/resume/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDashboard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.hero}
      >
        <div>
          <h1 style={styles.heroTitle}>Welcome Back {userName}👋</h1>

          <p style={styles.heroSubtitle}>
            {/* Fray-D AI Career Intelligence Platform */}
            Fray-D helps you analyze resumes, improve ATS score, discover
            personalized jobs, and prepare for your dream career using AI.
          </p>

          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn}>Upload Resume</button>

            <button style={styles.secondaryBtn}>Analyze Resume</button>
          </div>
        </div>

        {/* <div style={styles.heroIcon}>🤖</div> */}

        <div style={styles.heroRight}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="AI"
            style={styles.heroImage}
          />
        </div>
      </motion.div>

      {/* STATS */}
      {/* resume + jobs */}
      <div style={styles.statsGrid}>
        {/* <motion.div
          whileHover={{ scale: 1.0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            ...styles.card,
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            boxShadow: "0 20px 40px rgba(37,99,235,.35)",
          }}
        > */}
        <motion.div
          whileHover={{ scale: 1.01, y: -8 }}
          transition={{ duration: 0.25 }}
          onClick={async () => {
            const resumeId = localStorage.getItem("resume_id");

            if (!resumeId) {
              alert("Please upload your resume first.");
              return;
            }

            setShowATS(!showATS);

            if (!atsDetails) {
              try {
                setLoadingATS(true);

                const res = await axios.get(
                  `http://127.0.0.1:8000/resume/analyze/${resumeId}`,
                );

                setAtsDetails(res.data);
              } catch (err) {
                console.log(err);
                alert("Unable to analyze resume");
              } finally {
                setLoadingATS(false);
              }
            }
          }}
          style={{
            ...styles.card,
            background: "linear-gradient(135deg,#7c3aed,#9333ea)",
            boxShadow: "0 20px 40px rgba(124,58,237,.35)",
            cursor: "pointer",
          }}
        >
          <h3>📄 Resume</h3>
          <h1
            style={{
              fontSize: "46px",
              margin: "15px 0",
              fontWeight: "800",
            }}
          >
            {" "}
            {dashboard?.uploaded ? 1 : 0}
          </h1>
          <p>Uploaded</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            ...styles.card,
            background: "linear-gradient(135deg,#7c3aed,#9333ea)",
            boxShadow: "0 20px 40px rgba(124,58,237,.35)",
          }}
        >
          <h3>📊 ATS Score</h3>
          {/* <h1>{dashboard ? `${dashboard.ats_score}%` : "--"}</h1> */}
          <h1
            style={{
              fontSize: "46px",
              margin: "15px 0",
              fontWeight: "800",
            }}
          >
            {dashboard?.uploaded ? `${dashboard.ats_score}%` : "0%"}
          </h1>
          <p>Current Score</p>
        </motion.div>

        {showATS && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={styles.detailsCard}
          >
            <h2>📊 Resume Analysis</h2>

            {loadingATS ? (
              <p>Analyzing your resume...</p>
            ) : (
              <>
                <div style={styles.analysisSection}>
                  <h3>💪 Strengths</h3>

                  <div style={styles.skills}>
                    {(atsDetails?.strengths || atsDetails?.skills || []).map(
                      (item, index) => (
                        <span key={index} style={styles.strength}>
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div style={styles.analysisSection}>
                  <h3>⚠️ Weaknesses</h3>

                  {(atsDetails?.weak_areas || []).length > 0 ? (
                    atsDetails.weak_areas.map((item, index) => (
                      <p key={index} style={styles.weakness}>
                        • {item}
                      </p>
                    ))
                  ) : (
                    <p>No major weaknesses found.</p>
                  )}
                </div>

                <div style={styles.analysisSection}>
                  <h3>🚀 Areas to Improve</h3>

                  {(atsDetails?.suggestions || []).length > 0 ? (
                    atsDetails.suggestions.map((item, index) => (
                      <p key={index} style={styles.suggestion}>
                        • {item}
                      </p>
                    ))
                  ) : (
                    <p>No suggestions available.</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* jobs + ai insight */}

      <div style={styles.statsGrid}>
        {/* <motion.div
          whileHover={{ scale: 1.0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            ...styles.card,
            background: "linear-gradient(135deg,#10b981,#059669)",
            boxShadow: "0 20px 40px rgba(16,185,129,.35)",
          }}
        > */}
        <motion.div
          whileHover={{ scale: 1.01, y: -8 }}
          transition={{ duration: 0.25 }}
          onClick={async () => {
            const resumeId = localStorage.getItem("resume_id");

            if (!resumeId) {
              alert("Please upload your resume first.");
              return;
            }

            setShowJobs(!showJobs);

            if (!jobs.length) {
              try {
                setLoadingJobs(true);

                // First find recommended role
                const matchRes = await axios.get(
                  `http://127.0.0.1:8000/resume/job-match/${resumeId}`,
                );

                const bestRole =
                  matchRes.data?.best_matches?.[0]?.role ||
                  "Software Developer";

                // Then get jobs for that role
                const jobsRes = await axios.get(
                  `http://127.0.0.1:8000/resume/jobs/${resumeId}`,
                  {
                    params: {
                      role: bestRole,
                      page: 1,
                    },
                  },
                );

                setJobs(jobsRes.data?.jobs || []);
              } catch (err) {
                console.log(err);
                alert("Unable to load jobs");
              } finally {
                setLoadingJobs(false);
              }
            }
          }}
          style={{
            ...styles.card,
            background: "linear-gradient(135deg,#10b981,#059669)",
            boxShadow: "0 20px 40px rgba(16,185,129,.35)",
            cursor: "pointer",
          }}
        >
          <h3>💼 Jobs</h3>
          {/* <h1>250+</h1>
          <p>Available</p> */}
          <h1
            style={{
              fontSize: "46px",
              margin: "15px 0",
              fontWeight: "800",
            }}
          >
            {/* {dashboard?.uploaded ? "250+" : "0"} */}

            {dashboard?.uploaded ? dashboard.job_count || "0" : "0"}
          </h1>
          <p>Jobs Available</p>
        </motion.div>

        {showJobs && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={styles.detailsCard}
          >
            <h2>💼 Recommended Jobs</h2>

            {loadingJobs ? (
              <p>Finding jobs based on your resume...</p>
            ) : jobs.length > 0 ? (
              <div style={styles.jobGrid}>
                {jobs.map((job, index) => (
                  <div key={index} style={styles.jobCard}>
                    <h3>{job.title || "Software Developer"}</h3>

                    <p>🏢 {job.company || "Company"}</p>

                    <p>📍 {job.location || "Remote"}</p>

                    <p>💻 {job.job_type || "Full Time"}</p>

                    <button
                      style={styles.applyBtn}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (job.url) {
                          window.open(job.url, "_blank");
                        }
                      }}
                    >
                      Apply Now →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No jobs found for your recommended role.</p>
            )}
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            ...styles.card,
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            boxShadow: "0 20px 40px rgba(249,115,22,.35)",
          }}
        >
          <h3>🤖 AI Insights</h3>
          {/* <h1>12</h1>
          <p>Generated</p> */}
          <h1
            style={{
              fontSize: "46px",
              margin: "15px 0",
              fontWeight: "800",
            }}
          >
            {dashboard?.uploaded ? dashboard.suggestions.length : 0}
          </h1>
          <p>Generated</p>
        </motion.div>
      </div>

      {/* Career */}
      {/* SECOND ROW */}
      {/* <div style={styles.bottomGrid}> */}
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25 }}
        style={styles.largeCard}
      >
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "20px",
          }}
        >
          🎯 Career Progress
        </h2>

        <div style={styles.progressWrapper}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                // width: `${dashboard?.ats_score || 0}%`,
                width: `${dashboard?.uploaded ? dashboard.ats_score : 0}%`,
              }}
            />
          </div>

          {/* <span style={{ color: "#fff" }}>{dashboard?.ats_score || 0}%</span> */}
          <span style={{ color: "#fff" }}>
            {dashboard?.uploaded ? dashboard.ats_score : 0}%
          </span>
        </div>

        {/* <p style={{ color: "#94a3b8" }}>
            Your profile is stronger than 80% of candidates.
          </p> */}
        <p
          style={{
            fontSize: "18px",
            lineHeight: "30px",
            color: "#94a3b8",
          }}
        >
          {dashboard?.uploaded
            ? `Your profile is stronger than ${dashboard.ats_score}% of candidates.`
            : "Upload your resume to see your career progress."}
        </p>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} style={styles.largeCard}>
        <h2>🔥 Recommended Skills</h2>

      

        <div style={styles.skills}>
          {dashboard?.skills?.length ? (
            dashboard.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                {skill}
              </span>
            ))
          ) : (
            // <p>No Resume Uploaded</p>
            <p style={{ color: "#94a3b8" }}>
              Upload Resume to see recommended skills.
            </p>
          )}
        </div>
      </motion.div>
    </div>
    // </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px 30px",
    boxSizing: "border-box",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    padding: "38px 42px",
    borderRadius: "22px",
    background: "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
    border: "1px solid rgba(255,255,255,.15)",
    overflow: "hidden",
    marginBottom: "24px",
    boxShadow: "0 15px 40px rgba(37,99,235,.25)",
  },

  heroRight: {
    display: "flex",
    justifyContent: "center",
  },

  heroImage: {
    width: "380px",
    objectFit: "contain",
  },

  heroTitle: {
    color: "#fff",
    fontSize: "38px",
    fontWeight: "800",
    lineHeight: 1.2,
    marginBottom: "10px",
  },

  heroSubtitle: {
    color: "#dbeafe",
    fontSize: "16px",
    maxWidth: "580px",
    lineHeight: "25px",
    marginBottom: "20px",
  },

  heroButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
  },

  detailsCard: {
    marginTop: "25px",
    marginBottom: "30px",
    padding: "35px",
    borderRadius: "28px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    color: "#fff",
  },

  analysisSection: {
    marginTop: "30px",
  },

  strength: {
    background: "rgba(16,185,129,.2)",
    padding: "7px 12px",
    borderRadius: "999px",
    color: "#6ee7b7",
    fontSize: "13px",
  },

  weakness: {
    color: "#fca5a5",
    fontSize: "14px",
    lineHeight: "24px",
  },

  suggestion: {
    color: "#93c5fd",
    fontSize: "14px",
    lineHeight: "24px",
  },

  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginTop: "20px",
  },

  jobCard: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.1)",
  },

  applyBtn: {
    marginTop: "12px",
    padding: "9px 17px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  primaryBtn: {
    background: "#fff",
    color: "#2563eb",
    border: "none",
    padding: "11px 20px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,.5)",
    padding: "11px 20px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
  },

  heroIcon: {
    fontSize: "90px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "18px",
    marginBottom: "22px",
    width: "100%",
  },

  card: {
    borderRadius: "18px",
    padding: "24px",
    minHeight: "135px",
    color: "#fff",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(18px)",
    transition: ".3s",
  },

  detailsCard: {
    marginTop: "18px",
    marginBottom: "22px",
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    color: "#fff",
  },

  analysisSection: {
    marginTop: "20px",
  },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },

  largeCard: {
    borderRadius: "20px",
    padding: "28px",
    marginBottom: "22px",
    background: "rgba(255,255,255,.05)",
    marginTop: "10px",
    border: "1px solid rgba(255,255,255,.1)",
    color: "#fff",
    overflow: "hidden",
  },

  progressWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "16px",
    marginBottom: "16px",
  },

  progressBar: {
    flex: 1,
    height: "9px",
    background: "#1e293b",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    borderRadius: "20px",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
  },

  skill: {
    background: "linear-gradient(135deg,#2563eb,#7c3aed)",
    padding: "7px 12px",
    borderRadius: "999px",
    fontSize: "13px",
  },
};
