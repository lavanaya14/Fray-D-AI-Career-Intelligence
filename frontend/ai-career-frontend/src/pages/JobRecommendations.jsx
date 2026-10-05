import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function JobRecommendations() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bestMatches, setBestMatches] = useState([]);
  const [otherRoles, setOtherRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/resume/job-match/${id}`)
      .then((res) => {
        setBestMatches(res.data.best_matches || []);
        setOtherRoles(res.data.other_roles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Career Recommendations...
      </h2>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.hero}>
          <h1 style={styles.title}>🎯 Career Recommendations</h1>
          <p style={styles.subtitle}>
            AI analyzed your resume and found the most suitable career paths.
          </p>
        </div>

        {/* BEST MATCHES */}
        <h2 style={styles.sectionTitle}>🔥 Best Career Matches</h2>

        <div style={styles.grid}>
          {bestMatches.map((role, index) => (
            <div key={index} style={styles.roleCard}>
              <div style={styles.matchBadge}>{role.match}%</div>

              <h3>{role.role}</h3>

              <p style={{ color: "#94a3b8" }}>
                Highly compatible with your profile
              </p>

              <button
                onClick={() =>
                  navigate(`/jobs/${id}/${encodeURIComponent(role.role)}`)
                }
                style={styles.button}
              >
                View Live Jobs →
              </button>
            </div>
          ))}
        </div>

        {/* OTHER ROLES */}
        <h2 style={styles.sectionTitle}>🚀 Other Suitable Roles</h2>

        <div style={styles.tagContainer}>
          {otherRoles.map((role, index) => (
            <span
              key={index}
              style={styles.tag}
              onClick={() =>
                navigate(`/jobs/${id}/${encodeURIComponent(role)}`)
              }
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
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

  card: {
    width: "100%",
  },

  hero: {
    textAlign: "center",
    marginBottom: "50px",
  },

  title: {
    color: "#fff",
    fontSize: "48px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "18px",
  },

  sectionTitle: {
    color: "#fff",
    marginBottom: "25px",
    fontSize: "28px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
    marginBottom: "50px",
  },

  roleCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "30px",
    color: "white",
    transition: "0.3s",
  },

  matchBadge: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    marginBottom: "20px",
  },

  button: {
    marginTop: "20px",
    width: "10%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },

  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },

  tag: {
    padding: "12px 20px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#cbd5e1",
    cursor: "pointer",
    transition: "0.3s",
  },
};
