import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 0 20px rgba(0,0,0,0.3)"
      }}
    >
      {/* MENU */}
      <div>
        <NavLink
          to="/dashboard"
          style={linkStyle}
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/resume/upload"
          style={linkStyle}
        >
          📄 Upload Resume
        </NavLink>

        <NavLink
          to="/resume/analyze/1"
          style={linkStyle}
        >
          🤖 Analyze
        </NavLink>
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600"
        }}
      >
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  display: "block",
  padding: "14px",
  marginBottom: "10px",
  textDecoration: "none",
  color: "white",
  background: "rgba(255,255,255,0.08)",
  borderRadius: "10px",
  transition: "0.3s"
};