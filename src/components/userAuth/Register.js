import { useState } from "react";
import { useNavigate, useLocation , Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../server/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import styles from '../../new-ui/NewHome.module.css';
import { Code } from 'lucide-react';

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      alert("Registration successful!");

      const redirectPath = new URLSearchParams(location.search).get("redirect");
      navigate(redirectPath || "/");
    } catch (error) {
      console.error("User registration error:", error);
      alert(error.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#151022] px-4">
      
      {/* Top brand header */}
      <div className="mb-12 flex items-center justify-center w-full">
        <div
          className={styles['logo-wrapper']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Code className="w-6 h-6 text-primary" style={{ marginLeft: '20px'}} />
          <Link to='/'><span className={styles.logo}>GraceTech</span></Link>
        </div>
      </div>

      {/* Register card */}
      <div style={{ padding: '20px'}} className="w-full max-w-md bg-[#1c142f] rounded-2xl shadow-2xl p-8 flex flex-col items-center font-urbanist">
        
        <h2 className="text-white text-2xl font-semibold mb-6">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#151022] text-[#d0cfd3] placeholder-[#9d8bff] focus:outline-none focus:ring-2 focus:ring-[#7d52fd]"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-[#151022] text-[#d0cfd3] placeholder-[#9d8bff] focus:outline-none focus:ring-2 focus:ring-[#7d52fd]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#151022] text-[#d0cfd3] placeholder-[#9d8bff] focus:outline-none focus:ring-2 focus:ring-[#7d52fd]"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-xl bg-gradient-to-r from-[#7d52fd] to-[#9d8bff] text-[#151022] font-bold shadow-lg hover:scale-[1.02] transition transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-[#d0cfd3]">
          Already have an account?{" "}
          <a href="/login" className="text-[#7d52fd] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
