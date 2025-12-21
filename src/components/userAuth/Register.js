import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../server/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async () => {
    if (!name || !email || !password) return alert("Please fill all fields");

    setLoading(true);
    const auth = getAuth();

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Update display name in Auth profile
      await updateProfile(user, { displayName: name });

      // 3️⃣ Save user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
        role: "user", // optional, can use "admin" for admin accounts
      });

      alert("Registration successful!");

      // 4️⃣ Redirect to original page or homepage
      const redirectPath = new URLSearchParams(location.search).get("redirect");
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate("/"); // homepage
      }

    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
