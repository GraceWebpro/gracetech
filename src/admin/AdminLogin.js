import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import "./Admin.css";

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
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          Don't have an account? <a href="/admin/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
