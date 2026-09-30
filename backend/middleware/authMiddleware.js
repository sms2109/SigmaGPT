import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        // Get JWT from browser cookie
        const token = req.cookies.token;


        // If token doesn't exist,
        // user is not logged in.
        if (!token) {
            return res.status(401).json({
                message: "Not authenticated",
            });

        }

        // Verify the JWT using our secret.
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Save decoded user information inside the request.
        // Now other routes can access: req.user.userId
        req.user = decoded;

        // Continue to the actual route.
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};


export default authMiddleware;