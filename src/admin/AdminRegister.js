import { useState } from "react";
import { auth, registerWithEmail } from "../server/firebase";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Import the CSS file

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();


  const handleRegister = async () => {
    try {
      // Register the user with email and password using Firebase Authentication
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      // After successful registration, assign the 'admin' role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "admin", // Set the role to 'admin'
      });

      // Redirect to the admin dashboard after successful registration
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.message);
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
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <a href="/admin/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
