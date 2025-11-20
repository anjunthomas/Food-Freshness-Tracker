import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password
            });

            localStorage.setItem("userId", response.data.id);

            navigate("/dashboard");

        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="login-container">
            <div className="white-box">
                <h1>Sign In!</h1>

                <form onSubmit={handleSubmit}>
                    
                    <p className="error-text">{error}</p>

                    <input
                        type="email"
                        placeholder=" Email"
                        className="field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="password"
                        placeholder=" Password"
                        className="field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="submit"
                        value="Login"
                        className="login-btn"
                    />

                    <br /><br />

                    <button type="reset" onClick={() => {
                        setEmail("");
                        setPassword("");
                        setError("");
                    }}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;