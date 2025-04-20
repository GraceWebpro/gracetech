import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginWithEmail } from "../server/firebase"; // Your login function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To get the redirect URL if available

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);

      // Get the redirect path from query parameters (if any)
      const redirectPath = new URLSearchParams(location.search).get("redirect");

      if (redirectPath) {
        navigate(redirectPath); // Redirect to the original action page
      } else {
        navigate("/"); // Redirect to homepage if no redirect URL
      }
    } catch (error) {
      alert(error.message); // Display any error messages from login failure
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
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
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
