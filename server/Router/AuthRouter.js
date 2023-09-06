import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../utils/db.js';
import dotenv from 'dotenv';
dotenv.config();
const authRouter = Router();
// test
authRouter.post('/login', async (req, res) => {
  const { userType, email, password } = req.body;
  const recordName =
    userType === 'PROFESSIONAL' ? 'professionals' : 'recruiters';
  const idField =
    userType === 'PROFESSIONAL' ? 'professional_id' : 'recruiter_id';
  const emailField =
    userType === 'PROFESSIONAL' ? 'professional_email' : 'recruiter_email';
  const passwordlField =
    userType === 'PROFESSIONAL'
      ? 'professional_password'
      : 'recruiter_password';

  try {
    let userData = await pool.query(
      `SELECT * FROM ${recordName} WHERE ${emailField} = $1`,
      [email]
    );
    userData = userData.rows[0];

    if (!userData) {
      return res.status(404).json({ message: 'Invalid email' });
    }
    // const isValidPassword = await bcrypt.compare(
    //   password,
    //   userData[passwordlField]
    // );
    const isValidPassword = password === userData[passwordlField];
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign(
      {
        id: userData[idField],
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

export default authRouter;
