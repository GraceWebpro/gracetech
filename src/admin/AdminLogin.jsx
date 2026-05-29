import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import styles from "../components/NewHome.module.css";
import { Code } from "lucide-react";
import logo from '../assets/brandLogo.png'

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password)
      return alert("Please enter both email and password");

    setLoading(true);
    setError("");

    try {
      // 1. LOGIN WITH SUPABASE AUTH
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError("Invalid login details");
        setLoading(false);
        return;
      }

      const user = data.user;

      // 2. CHECK IF USER IS ADMIN
      const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", user.email.trim().toLowerCase());
    
    if (adminError || adminData.length === 0) {
      setError("Access denied: Not an admin");
      // console.log("ADMIN QUERY RESULT:", adminData);
      // console.log("ERROR:", adminError);
      // console.log("USER:", user);
    
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

      // 3. SUCCESS → GO TO ADMIN DASHBOARD
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#151022] px-4 py-4">

      {/* Top brand header */}
      <div className="mb-12 flex items-left justify-left w-full">
        <div
          className={styles["logo-wrapper"]}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          <img src={logo}
            className="w-8 h-8 text-primary"
            style={{ marginLeft: "20px", marginRight: "20px" }}
          />
          <Link to="/">
            <span className={styles.logo}>GraceTech</span>
          </Link>
        </div>
      </div>

      {/* Login card */}
      <div
        style={{ padding: "20px" }}
        className="w-full max-w-md bg-[#1c142f] rounded-2xl shadow-2xl flex flex-col items-center font-urbanist mt-20"
      >
        <h2 className="text-white text-2xl font-semibold mb-6">
          Admin Login
        </h2>

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

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-xl bg-gradient-to-r from-[#7d52fd] to-[#9d8bff] text-[#151022] font-bold shadow-lg hover:scale-[1.02] transition transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;