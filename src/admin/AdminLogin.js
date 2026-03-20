import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import "./Admin.css";
import styles from '../new-ui/NewHome.module.css'
import BrandLogo from '../assets/brand-logo.png'

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");
    setLoading(true);

    try {
      // 1️⃣ Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Check if user exists in admins collection
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
        alert("Access denied: You are not an admin");
        return;
      }

      // ✅ Admin verified, redirect to dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      alert(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151022] px-4 py-4">

      
      {/* Top brand header */}
      <div className="mb-12 flex items-center justify-center w-full">
        <div
          className={styles['logo-wrapper']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={BrandLogo} alt="brand-logo" className="w-6 h-6 text-primary" style={{ marginLeft: '20px'}} />
          <Link to='/'><span className={styles.logo}>GraceTech</span></Link>
        </div>
      </div>

      {/* Login card */}
      <div style={{ padding: '20px'}} className="w-full max-w-md bg-[#1c142f] rounded-2xl shadow-2xl flex flex-col items-center font-urbanist">

        <h2 className="text-white text-2xl font-semibold mb-6">Admin Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#151022] text-[#d0cfd3] placeholder-[#9d8bff] focus:outline-none focus:ring-2 focus:ring-[#7d52fd]"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#151022] text-[#d0cfd3] placeholder-[#9d8bff] focus:outline-none focus:ring-2 focus:ring-[#7d52fd]"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-xl bg-gradient-to-r from-[#7d52fd] to-[#9d8bff] text-[#151022] font-bold shadow-lg hover:scale-[1.02] transition transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-[#d0cfd3]">
          Don't have an account?{" "}
          <a href="/admin/register" className="text-[#7d52fd] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
