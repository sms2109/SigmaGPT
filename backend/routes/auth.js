import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

// SIGN UP

router.post("/signup", async (req, res) => {
    try {
        // Get information from frontend
        const {name,email,password} = req.body;

        // 1. Validate input

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });

        }

        // 2. Password validation

        if (password.length < 6) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters",
            });

        }

        // 3. Check existing user

        const existingUser =
            await User.findOne({
                email,
            });


        if (existingUser) {

            return res.status(409).json({
                message:
                    "Email already registered",
            });

        }

        // 4. Hash password

        const hashedPassword =
            await bcrypt.hash(
                password,
                10    // The 10 is the salt rounds / cost factor. Higher cost generally means more computational work.
            );


        // 5. Create user

        const user =
            await User.create({
                name,
                email,
                password: hashedPassword,
            });

        // 6. Create JWT

        const token =
            jwt.sign(
                {
                    userId: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );

        // 7. Store JWT in cookie

        res.cookie(
            "token",
            token,
            {
                // JavaScript cannot access
                // this cookie directly.
                httpOnly: true,

                // HTTPS in production.
                secure:
                    process.env.NODE_ENV ===
                    "production",

                // Helps control
                // cross-site cookie behavior.
                sameSite:
                    process.env.NODE_ENV ===
                    "production"
                        ? "none"
                        : "lax",

                // Cookie expires after 7 days.
                maxAge:
                    7 *
                    24 *
                    60 *
                    60 *
                    1000,
            }
        );

        // 8. Send response

        res.status(201).json({

            message:
                "Account created successfully",

            // Never send password
            // back to frontend.
            user: {

                id: user._id,

                name: user.name,

                email: user.email,

            },

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error",
        });

    }

});


// LOGIN

router.post("/login", async (req, res) => {

    try {

        // Get login information
        const {
            email,
            password
        } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required",
            });

        }

        // 2. Find user
        const user =
            await User.findOne({
                email,
            });


        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password",
            });

        }

        // 3. Compare password
        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message:
                    "Invalid email or password",
            });

        }

        // 4. Create JWT
        const token =
            jwt.sign(
                {
                    userId: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            );


        // 5. Store JWT in cookie
        res.cookie(
            "token",
            token,
            {

                httpOnly: true,

                secure:
                    process.env.NODE_ENV ===
                    "production",

                sameSite:
                    process.env.NODE_ENV ===
                    "production"
                        ? "none"
                        : "lax",

                maxAge:
                    7 *
                    24 *
                    60 *
                    60 *
                    1000,

            }
        );

        // 6. Send user information
        res.json({
            message:
                "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
});

// GET CURRENT USER

router.get("/me", async (req, res) => {
    try {
        // Get JWT from cookie
        const token =
            req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message:
                    "Not authenticated",
            });

        }
        // Verify JWT
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        // Find user
        // select("-password") means:
        // don't return password.
        const user =
            await User.findById(
                decoded.userId
            ).select("-password");

        if (!user) {
            return res.status(401).json({
                message:
                    "User not found",
            });

        }

        res.json({
            user,
        });
    } catch (error) {

        res.status(401).json({
            message:
                "Not authenticated",
        });
    }
});

// LOGOUT
router.post("/logout", (req, res) => {
    res.clearCookie(
        "token",
        {
            httpOnly: true,
            secure:
                process.env.NODE_ENV ===
                "production",
            sameSite:
                process.env.NODE_ENV ===
                "production"
                    ? "none"
                    : "lax",
        }
    );
    res.json({
        message:
            "Logged out successfully",
    });

});

export default router;