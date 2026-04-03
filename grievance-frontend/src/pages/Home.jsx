import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container} className="home-container">
      <div style={styles.navbar} className="home-navbar">
        <div style={styles.logo} className="home-logo">SmartGrievance</div>
        <div style={styles.navLinks} className="home-navLinks">
          <span style={styles.navLink} className="home-navLink" onClick={() => navigate("/login")}>Login</span>
          <button style={styles.navBtn} className="home-navBtn" onClick={() => navigate("/join-system")}>Join System</button>
        </div>
      </div>

      <div style={styles.heroSection} className="home-heroSection">
        <div style={styles.textContent} className="home-textContent">
          <div style={styles.badge} className="home-badge">v2.0 Approved Production</div>
          <h1 style={styles.title} className="home-title">
            Next-Gen Grievance <span style={styles.highlight} className="home-highlight">Management</span>
          </h1>
          <p style={styles.subtitle} className="home-subtitle">
            A fully transparent, streamlined platform to escalate and resolve issues instantly. Premium level service mapping.
          </p>

          <div style={styles.buttonGroup} className="home-buttonGroup">
            <button 
              style={styles.primaryBtn} 
              className="home-primaryBtn"
              onClick={() => navigate("/create-system")}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Create Workspace
            </button>
            <button 
              style={styles.secondaryBtn} 
              className="home-secondaryBtn"
              onClick={() => navigate("/join-system")}
              onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
              onMouseOut={(e) => e.target.style.background = '#ffffff'}
            >
              Join Existing
            </button>
          </div>
        </div>
        
        <div style={styles.imageContent} className="home-imageContent">
          <img src="/hero_illustration.png" alt="Hero Illustration" style={styles.heroImage} className="home-heroImage" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    overflow: "hidden"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 60px",
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(15px)",
    borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
    boxShadow: "0 4px 10px -2px rgba(0, 0, 0, 0.05)"
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1e1b4b",
    letterSpacing: "-0.5px"
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px"
  },
  navLink: {
    cursor: "pointer",
    fontWeight: "600",
    color: "#4338ca",
    transition: "color 0.2s"
  },
  navBtn: {
    padding: "10px 24px",
    background: "#1e1b4b",
    color: "white",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, background 0.2s"
  },
  heroSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1350px",
    margin: "0 auto",
    padding: "100px 40px",
    gap: "50px",
    flexWrap: "wrap"
  },
  textContent: {
    flex: "1 1 500px",
    maxWidth: "600px"
  },
  badge: {
    display: "inline-block",
    padding: "8px 16px",
    background: "rgba(79, 70, 229, 0.1)",
    color: "#4338ca",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "24px",
    border: "1px solid rgba(79, 70, 229, 0.2)"
  },
  title: {
    fontSize: "58px",
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: "1.15",
    marginBottom: "24px",
    letterSpacing: "-1.5px"
  },
  highlight: {
    color: "#4f46e5",
    background: "linear-gradient(90deg, #4f46e5, #0ea5e9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subtitle: {
    fontSize: "20px",
    color: "#475569",
    lineHeight: "1.6",
    marginBottom: "40px"
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  primaryBtn: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  secondaryBtn: {
    padding: "16px 32px",
    background: "#ffffff",
    color: "#312e81",
    border: "2px solid #e0e7ff",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    transition: "background 0.2s, border 0.2s"
  },
  imageContent: {
    flex: "1 1 500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  heroImage: {
    width: "100%",
    maxWidth: "650px",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
    transform: "perspective(1000px) rotateY(-5deg)",
    transition: "transform 0.5s ease"
  }
};