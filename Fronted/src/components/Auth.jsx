import { useState } from "react";
import "./Auth.css";
import { apiFetch } from "../api.js";

function Auth({ onLogin, onBack }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const endpoint = isLogin
                ? "/api/auth/login"
                : "/api/auth/signup";

            const body = isLogin
                ? { email, password }
                : { name, email, password };

            const data = await apiFetch(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            });

            onLogin(data.user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin((prev) => !prev);
        setError("");
        setPassword("");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-logo">
                    <img
                        src="/SigmaGPTlogo.png"
                        alt="SigmaGPT Logo"
                    />
                </div>

                <h1>
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h1>

                <p className="auth-subtitle">
                    {isLogin
                        ? "Login to continue to SigmaGPT"
                        : "Create your SigmaGPT account"}
                </p>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Login"
                                : "Create Account"}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </span>

                    <button
                        type="button"
                        onClick={toggleAuthMode}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </div>

                <button
                    type="button"
                    className="continueGuestBtn"
                    onClick={onBack}
                >
                    ← Continue as Guest
                </button>

            </div>
        </div>
    );
}

export default Auth;
