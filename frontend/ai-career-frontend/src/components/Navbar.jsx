import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
// import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import {
  FaSearch,
  FaMoon,
  FaHome,
  FaFileAlt,
  FaRobot,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userName = user?.name || "User";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav style={styles.navbar}>
      {/* Logo */}

      <div style={styles.logoSection}>
        <div style={styles.logoIcon}>F</div>

        <div>
          <div style={styles.logo}>Fray-D</div>
          <div style={styles.tagline}>Career Intelligence Platform</div>
        </div>
      </div>

      {/* searchbar */}

      <div style={styles.searchBox}>
        <FaSearch color="#94a3b8" />
        <input
          placeholder="Search jobs, skills..."
          style={styles.searchInput}
        />
      </div>

      {/* Menu */}

      <div style={styles.centerMenu}>
        {/* <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "#60a5fa" : "#e2e8f0",
          })}
        >
          Home
        </NavLink> */}

        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...styles.link,
            background: isActive ? "rgba(59,130,246,.18)" : "transparent",
            color: isActive ? "#60a5fa" : "#e2e8f0",
          })}
        >
          {/* <FaHome size={18} /> */}
          <span>Home</span>
        </NavLink>

        {/* <NavLink
          to="/resume/upload"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "#60a5fa" : "#e2e8f0",
          })}
        >
          Resume
        </NavLink> */}

        <NavLink
          to="/resume/upload"
          style={({ isActive }) => ({
            ...styles.link,
            background: isActive ? "rgba(59,130,246,.18)" : "transparent",
            color: isActive ? "#60a5fa" : "#e2e8f0",
          })}
        >
          {/* <FaFileAlt size={18} /> */}
          <span>Resume</span>
        </NavLink>

        {/* <NavLink
          to="/resume/analyze/1"
          style={({ isActive }) => ({
            ...styles.link,
            color: isActive ? "#60a5fa" : "#e2e8f0",
          })}
        >
          ATS Analysis
        </NavLink> */}

        <NavLink
          to="/career-chatbot"
          style={({ isActive }) => ({
            ...styles.link,
            background: isActive ? "rgba(59,130,246,.18)" : "transparent",
            color: isActive ? "#60a5fa" : "#e2e8f0",
          })}
        >
          {/* <FaRobot size={18} /> */}
          <span>Fray-D AI</span>
        </NavLink>
      </div>

      {/* Right Side */}

      <div style={styles.rightSection}>
        <button style={styles.themeBtn}>
          <FaMoon />
        </button>

        <div style={styles.profile}>
          {/* <FaUserCircle size={34} /> */}
          <span>{userName}</span>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* <div style={styles.rightSection}>
       ///// {/* <div style={styles.profile}>👤 Lavanaya</div> */}
      {/* <div style={styles.profile}>👤 {userName}</div>

        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div> */}
    </nav>
  );
}

const styles = {
  // navbar: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   position: "fixed",
  //   // top: "15px",
  //   // left: "50%",
  //   // transform: "translateX(-50%)",

  //   width: "100%",
  //   // maxWidth: "1400px",

  //   height: "75px",

  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",

  //   padding: "0 40px",

  //   // background: "rgba(255,255,255,0.08)",
  //   background: "rgba(10,15,35,0.9)",
  //   backdropFilter: "blur(20px)",

  //   border: "1px solid rgba(255,255,255,0.08)",

  //   // borderRadius: "20px",

  //   zIndex: 9999,
  // },

  navbar: {
    position: "fixed",
    top: 0,
    left: 0,

    width: "100%",
    height: "80px",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "0 40px",

    background: "rgba(10,15,35,0.95)",
    backdropFilter: "blur(20px)",

    borderBottom: "1px solid rgba(255,255,255,0.08)",

    zIndex: 9999,

    boxSizing: "border-box",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  },

  logoIcon: {
    width: "45px",
    height: "45px",

    borderRadius: "12px",

    background: "linear-gradient(135deg,#2563eb,#7c3aed)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    color: "#fff",
    fontWeight: "bold",
    fontSize: "20px",
  },

  logo: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "800",
  },

  centerLinks: {
    display: "flex",
    gap: "40px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  tagline: {
    color: "#94a3b8",
    fontSize: "12px",
  },

  centerMenu: {
    display: "flex",
    gap: "55px",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  // link: {
  //   textDecoration: "none",
  //   color: "#cbd5e1",
  //   fontWeight: "600",
  //   fontSize: "15px",
  //   padding: "0",
  //   background: "transparent",
  //   // transition: "0.3s",
  // },

  // link: {
  //   textDecoration: "none",
  //   color: "#cbd5e1",
  //   fontWeight: "600",
  //   fontSize: "15px",
  //   transition: ".3s",
  //   padding: "8px 14px",
  //   borderRadius: "10px",
  // },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",

    textDecoration: "none",

    color: "#e2e8f0",

    fontWeight: "700",

    fontSize: "17px",

    padding: "12px 18px",

    borderRadius: "14px",

    transition: "0.3s ease",
  },

  rightSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "15px",
    flex: 1,
  },

  profile: {
    // color: "#fff",
    // background: "rgba(255,255,255,0.08)",
    // padding: "10px 15px",
    // borderRadius: "12px",
    color: "#cbd5e1",
    background: "transparent",
    padding: "0",
  },

  // logout: {
  //   border: "none",

  //   padding: "10px 16px",

  //   borderRadius: "12px",

  //   background: "linear-gradient(135deg,#ef4444,#dc2626)",

  //   color: "#fff",
  //   cursor: "pointer",
  //   fontWeight: "600",
  // },

  logout: {
    display: "flex",
    alignItems: "center",
    gap: "8px",

    border: "none",

    padding: "12px 22px",

    borderRadius: "14px",

    background: "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "#fff",

    fontWeight: "700",

    fontSize: "15px",

    cursor: "pointer",
  },

  // searchBox: {
  //   flex: 1,
  //   maxWidth: "420px",
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "10px",
  //   background: "rgba(255,255,255,0.08)",
  //   padding: "10px 18px",
  //   borderRadius: "14px",
  //   margin: "0 35px",
  // },

  searchBox: {
    flex: 1,
    maxWidth: "500px",

    height: "52px",

    display: "flex",
    alignItems: "center",
    gap: "12px",

    padding: "0 18px",

    borderRadius: "18px",

    background: "rgba(255,255,255,.06)",

    border: "1px solid rgba(255,255,255,.08)",

    margin: "0 35px",
  },

  // searchInput: {
  //   width: "100%",
  //   border: "none",
  //   outline: "none",
  //   background: "transparent",
  //   color: "white",
  //   fontSize: "15px",
  // },

  searchInput: {
    width: "100%",

    background: "transparent",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: "16px",
  },

  // themeBtn: {
  //   width: "42px",
  //   height: "42px",
  //   borderRadius: "12px",
  //   border: "none",
  //   cursor: "pointer",
  //   background: "rgba(255,255,255,0.08)",
  //   color: "white",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  themeBtn: {
    width: "50px",
    height: "50px",

    borderRadius: "16px",

    border: "1px solid rgba(255,255,255,.08)",

    background: "rgba(255,255,255,.06)",

    color: "#FFD54F",

    cursor: "pointer",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: "18px",
  },
};
