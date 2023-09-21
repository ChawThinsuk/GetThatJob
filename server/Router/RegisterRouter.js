import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const RegisterRouter = Router();

RegisterRouter.post("/register-professional", async (req, res) => {
  try {
    const data = req.body;
    let messageError = await validateProfessional(data); //"Error 101"
    let bcryptPassword = await generatePassword(data.password);
    if (messageError) {
      return res.json({
        message: messageError,
      });
    }
    const results = await pool.query(
      `INSERT INTO users (email,password,user_type,created_at,updated_at) VALUES ($1, $2, $3, now(), null) RETURNING user_id;`,
      [data.email, bcryptPassword, data.user_type]
    );
    let user_id = Number(results.rows[0].user_id);
    await pool.query(
      `INSERT INTO professionals (username,phone,birthdate,linkedin,title,experience,education,cv,created_at,updated_at,user_id) VALUES ($1, $2,
          $3,$4,$5,$6,$7,$8,now(),null,$9)`,
      [
        data.username,
        data.phone,
        data.birthdate,
        data.linkedin,
        data.title,
        data.experience,
        data.education,
        data.cv,
        user_id,
      ]
    );
    return res.json({
      message: "Create success",
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
RegisterRouter.post("/register-recruiter", async (req, res) => {
  try {
    const data = req.body;
    let bcryptPassword = await generatePassword(data.password);
    let messageError = await validateRecruiter(data);
    if (messageError) {
      return res.json({
        message: messageError,
      });
    }
    const results = await pool.query(
      `INSERT INTO users (email,password,user_type,created_at,updated_at) VALUES ($1,$2,$3,now(),NULL) RETURNING user_id`,
      [data.email, bcryptPassword, data.user_type]
    );
    let user_id = Number(results.rows[0].user_id);
    console.log(user_id);
    await pool.query(
      `INSERT INTO recruiters (company_name,company_website,company_description,logo,created_at,updated_at,user_id) VALUES ($1,$2,$3,$4,now(),NULL,$5)`,
      [
        data.company_name,
        data.company_website,
        data.company_description,
        data.logo,
        user_id,
      ]
    );
    return res.json({
      message: "Create success",
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
async function validateProfessional(data) {
  const checkDate = !isNaN(new Date(data.birthdate));
  const isUniqueEmail = await pool.query(
    `SELECT email FROM users WHERE email = $1`,
    [data.email]
  );
  const isUniqueUsername = await pool.query(
    `SELECT username FROM professionals WHERE username = $1`,
    [data.username]
  );
  if (
    !data.email ||
    !data.password ||
    !data.user_type ||
    !data.username ||
    !data.phone ||
    !data.birthdate ||
    !data.linkedin ||
    !data.title ||
    !data.experience ||
    !data.education ||
    !data.cv
  ) {
    return "please check your body of API";
  }
  if (data.user_type !== "PROFESSIONAL") {
    return "Invalid user type";
  }
  if (isUniqueEmail.rows[0]) {
    return "This professional email already exists.";
  }
  if (!checkDate) {
    return "Invalid Date of birth";
  }
  if (isUniqueUsername.rows[0]) {
    return "This username already exists.";
  }
}
async function validateRecruiter(data) {
  const isUniqueEmail = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [data.email]
  );
  const isUniqueName = await pool.query(
    `SELECT company_name FROM recruiters WHERE company_name = $1`,
    [data.company_name]
  );
  if (
    !data.email ||
    !data.password ||
    !data.user_type ||
    !data.company_name ||
    !data.company_website ||
    !data.company_description ||
    !data.logo
  ) {
    return "please check your body of API";
  }
  if (data.user_type !== "RECRUITER") {
    return "Invalid user type";
  }
  if (isUniqueEmail.rows[0]) {
    return "This email already use";
  }
  if (isUniqueName.rows[0]) {
    return "This company name already exists";
  }
}
async function generatePassword(password) {
  const salt = await bcrypt.genSalt(10);
  let bcryptPassword = await bcrypt.hash(password, salt);
  return bcryptPassword;
}

export default RegisterRouter;
