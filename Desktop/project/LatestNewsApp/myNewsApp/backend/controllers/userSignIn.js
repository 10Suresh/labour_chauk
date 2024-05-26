import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js';

export const userSignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("Please enter your email and password");
      }
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.SECRET_KEY,
        { expiresIn: process.env.SESSION_VALIDITY }
      );
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: true, 
        maxAge: 1000 * 60 * 60 * 24 * 7 
      });
  
      res.status(200).json({ 
        token, 
        email: existingUser.email, 
        role: existingUser.role,
        message: "Login Successfully" 
      });
    } catch (error) {
      console.error('Error signing in:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
  