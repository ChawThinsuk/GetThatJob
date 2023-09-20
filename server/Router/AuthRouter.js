import { Router, query } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../utils/db.js';
import dotenv from 'dotenv';
dotenv.config();

const authRouter = Router();
authRouter.post('/login', async (req, res) => {
  const { userType, email, password } = req.body;
  try {
    // query data from users record and check for existance of email
    let userData = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND user_type = $2`,
      [email, userType]
    );
    userData = userData.rows[0];
    if (!userData) {
      return res.status(404).json({ message: 'Invalid email' });
    }
    // compare password with bcrypt
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Token generation with signing userID and userType data
    const token = jwt.sign(
      {
        userID: userData.user_id,
        userType: userType,
      },
      process.env.SECRET_KEY,
      { expiresIn: '90000000' }
    );
    return res.status(200).json({ message: 'Login success', token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

authRouter.put("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    return res.status(200).json({ message: "Change Password success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default authRouter;