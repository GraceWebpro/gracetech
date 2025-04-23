import { useState } from "react";
import { auth, loginWithEmail } from "../server/firebase";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Import the CSS file

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      navigate("/admin/dashboard"); // Redirect to the admin dashboard
    } catch (error) {
      alert(error.message);
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
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <a href="/admin/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
