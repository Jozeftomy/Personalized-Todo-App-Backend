import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "Email already in use" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });
        
        await user.save();

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" } // Longer token expiration
        );

        res.status(201).json({ 
            success: true,
            token,
            userId: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error during registration" 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" } // Longer token expiration
        );

        res.json({ 
            success: true,
            token,
            userId: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false,
            message: "Server error during login" 
        });
    }
};