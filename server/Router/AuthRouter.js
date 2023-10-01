import { Router, query } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../utils/db.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const authRouter = Router();

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: 'GET THAT JOB Password Recovery',
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>
      </head>
      <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #F48FB1;text-decoration:none;font-weight:600">Get That job</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
          <h2 style="background: #F48FB1;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />Get That Job Team</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>GTJ Inc</p>
            <p>112 Bangna Bangna Bangkok 10250</p>
            <p>Thailand</p>
          </div>
        </div>
      </div>
      </body>
      </html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        reject({ message: 'An error has occurred' });
      } else {
        resolve({ message: 'Email sent successfully' });
      }
    });
  });
}
authRouter.post('/send-otp', async (req, res) => {
  const email = req.body.recipient_email;
  const otp = req.body.OTP;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (result.rows[0]) {
      sendEmail(req.body)
        .then((response) => res.json({ message: 'ok' }))
        .catch((error) => res.status(500).send(error.message));
    } else {
      return res.json({ message: 'No User' });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
});
authRouter.post('/login', async (req, res) => {
  const { userType, email, password } = req.body;
  try {
    // query data from users record and check for existance of email
    let userData = await pool.query(
      `SELECT * FROM users WHERE email = $1 and user_type = $2`,
      [email,userType]
    );
    userData = userData.rows[0];
    console.log(userData);
    if (!userData) {
      return res.json({ status: 404 });
    }
    // compare password with bcrypt
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      return res.json({ status: 401 });
    }
    // Token generation with signing userID and userType data
    const token = jwt.sign(
      {
        userID: userData.user_id,
        userType: userData.user_type,
        email: userData.email
      },
      process.env.SECRET_KEY,
      { expiresIn: '90000000' }
    );
    return res.status(200).json({ status: 200, token });
  } catch (error) {
    return res.json({ status: 500 });
  }
});
authRouter.put('/password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await pool.query(
      `UPDATE users SET password = $1, updated_at = $2 WHERE email = $3`,
      [hashedPassword, new Date(), email]
    );

    return res.status(200).json({ message: 'Change Password success' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default authRouter;
