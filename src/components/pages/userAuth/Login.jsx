import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../../../config/supabase";
import styles from '../../NewHome.module.css';
import { Code } from 'lucide-react';

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter both email and password");
    }

    setLoading(true);

    try {
      // ✅ SUPABASE LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Invalid login details");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      alert("Login successful!");

      const redirectPath = new URLSearchParams(location.search).get("redirect");
      navigate(redirectPath || "/");

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#151022] px-4 py-4">
      
      {/* Top brand header */}
      <div className="mb-12 flex items-left justify-left w-full">
        <div
          className={styles['logo-wrapper']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Code className="w-6 h-6 text-primary" style={{ marginLeft: '20px'}} />
          <Link to='/'><span className={styles.logo}>GraceTech</span></Link>
        </div>
      </div>

      {/* Login card */}
      <div style={{ padding: '20px'}} className="w-full max-w-md bg-[#1c142f] rounded-2xl shadow-2xl flex flex-col items-center font-urbanist mt-20">
        
        <h2 className="text-white text-2xl font-semibold mb-6">Login</h2>

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
          <Link to="/register" className="text-[#7d52fd] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;