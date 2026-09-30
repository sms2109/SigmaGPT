import { useState } from "react";

import "./Auth.css";

import { apiFetch } from "../api.js";


// ========================================
// AUTH COMPONENT
// ========================================

function Auth({ onLogin,onBack }) {

    // true  = login page
    // false = signup page
    const [isLogin, setIsLogin] =
        useState(true);


    const [name, setName] =
        useState("");


    const [email, setEmail] =
        useState("");


    const [password, setPassword] =
        useState("");


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState("");


    // ====================================
    // FORM SUBMIT
    // ====================================

    const handleSubmit =
        async (e) => {

            // Prevent browser page refresh.
            e.preventDefault();


            setError("");
            setLoading(true);


            try {

                // Choose API endpoint.
                const endpoint =
                    isLogin
                        ? "/api/auth/login"
                        : "/api/auth/signup";


                // Login only needs:
                // email + password
                //
                // Signup needs:
                // name + email + password
                const body =
                    isLogin

                        ? {
                            email,
                            password,
                        }

                        : {
                            name,
                            email,
                            password,
                        };


                // Call backend.
                const data =
                    await apiFetch(
                        endpoint,
                        {

                            method: "POST",

                            body:
                                JSON.stringify(
                                    body
                                ),

                        }
                    );


                // Authentication successful.
                //
                // Send user information
                // to App.jsx.
                onLogin(
                    data.user
                );


            } catch (error) {

                // Show backend error.
                setError(
                    error.message
                );


            } finally {

                setLoading(false);

            }

        };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo" >
                    <img src="/SigmaGPTlogo.png" alt="SigmaGPT Logo" />
                </div>


                <h1>

                    {isLogin
                        ? "Welcome Back"
                        : "Create Account"}

                </h1>


                <p className="auth-subtitle">

                    {isLogin
                        ? "Login to continue to SigmaGPT"
                        : "Create your SigmaGPT account"}

                </p>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* NAME */}

                    {!isLogin && (

                        <div
                            className=
                                "input-group"
                        >

                            <label>
                                Name
                            </label>

                            <input
                                type="text"

                                placeholder=
                                    "Enter your name"

                                value={name}

                                onChange={
                                    (e) =>
                                        setName(
                                            e.target.value
                                        )
                                }

                                required
                            />

                        </div>

                    )}


                    {/* EMAIL */}

                    <div
                        className=
                            "input-group"
                    >

                        <label>
                            Email
                        </label>

                        <input
                            type="email"

                            placeholder=
                                "Enter your email"

                            value={email}

                            onChange={
                                (e) =>
                                    setEmail(
                                        e.target.value
                                    )
                            }

                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div
                        className=
                            "input-group"
                    >

                        <label>
                            Password
                        </label>

                        <input
                            type="password"

                            placeholder=
                                "Enter your password"

                            value={password}

                            onChange={
                                (e) =>
                                    setPassword(
                                        e.target.value
                                    )
                            }

                            required
                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <p className="auth-error">
                            {error}
                        </p>

                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"

                        className=
                            "auth-button"

                        disabled={loading}
                    >

                        {loading

                            ? "Please wait..."

                            : isLogin
                                ? "Login"
                                : "Create Account"}

                    </button>


                </form>


                {/* SWITCH LOGIN/SIGNUP */}

                <div className="auth-switch">

                    {isLogin

                        ? "Don't have an account?"

                        : "Already have an account?"}


                    <button
                        type="button"

                        onClick={() => {

                            setIsLogin(
                                !isLogin
                            );

                            setError("");

                        }}
                    >

                        {isLogin
                            ? "Sign Up"
                            : "Login"}

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