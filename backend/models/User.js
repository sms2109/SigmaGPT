import mongoose from "mongoose";

// User schema defines the structure of a user document in MongoDB.
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        // We will store the HASHED password here.
        // We will NEVER store the plain password.
        password: {
            type: String,
            required: true,
        },

    },

    {
        // Automatically creates:
        // createdAt
        // updatedAt
        timestamps: true,
    }
);


// Create MongoDB model
const User = mongoose.model(
    "User",
    UserSchema
);


export default User;