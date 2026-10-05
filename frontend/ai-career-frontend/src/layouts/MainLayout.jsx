import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <div style={styles.wrapper}>
        {/* Blur Effects */}
        <div style={styles.blur1}></div>
        <div style={styles.blur2}></div>

        <div style={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",

    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",

    paddingTop: "90px",
  },

  content: {
    position: "relative",
    zIndex: 2,

    width: "100%",
    // maxWidth: "1400px",
    // margin: "0 auto",
    padding: "30px 40px",
  },

  blur1: {
    position: "absolute",
    top: "-200px",
    left: "-150px",

    width: "500px",
    height: "500px",

    borderRadius: "50%",

    background: "#7c3aed",
    opacity: 0.25,
    filter: "blur(140px)",
  },

  blur2: {
    position: "absolute",
    right: "-150px",
    top: "150px",

    width: "450px",
    height: "450px",

    borderRadius: "50%",

    background: "#2563eb",
    opacity: 0.2,
    filter: "blur(140px)",
  },
};