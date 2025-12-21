import { useState } from "react";
import { auth, registerWithEmail } from "../server/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import "./Admin.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  const handleRegister = async () => {
    if (!email || !password) return alert("Please fill all fields");
    setLoading(true);
    try {
      // 1️⃣ Register admin in Firebase Auth
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      // 2️⃣ Add to admins collection
      await setDoc(doc(db, "admins", user.uid), {
        uid: user.uid,
        email: user.email,
        role: "admin",
        createdAt: new Date(),
      });

      alert("Admin registration successful!");

      // 3️⃣ Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin registration error:", error);
      alert(error.message || "Error during admin registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Register</h2>
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
        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          Already have an account? <a href="/admin/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
