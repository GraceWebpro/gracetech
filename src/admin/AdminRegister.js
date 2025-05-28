import { useState } from "react";
import { auth, registerWithEmail } from "../server/firebase";
import { useNavigate } from "react-router-dom";
import { getFirestore, setDoc, addDoc, doc } from "firebase/firestore"; // Import required Firebase functions
import "./Admin.css"; // Import the CSS file

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for feedback
  const navigate = useNavigate();
  const db = getFirestore();

  const handleRegister = async () => {
    setLoading(true); // Set loading to true when the registration starts
    try {
      // Register the user with email and password using Firebase Authentication
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      /* After successful registration, assign the 'admin' role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "admin", // Set the role to 'admin'
      });*/

      await setDoc(doc(db, "admins", user.uid), {
        isAdmin: true,
        role: "admin",
        email: user.email,
      });
      

      // Redirect to the admin dashboard after successful registration
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false); // Set loading to false once registration completes
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
          {loading ? "Registering..." : "Register"} {/* Button text changes based on loading state */}
        </button>
        <p>
          Already have an account? <a href="/admin/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
