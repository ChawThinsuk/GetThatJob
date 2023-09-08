import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const RegisterRouter = Router();

RegisterRouter.post("/register-professional", async (req, res) => {
  try {
    const data = req.body;
    // validate data professional
    let messageError = await validateProfessional(data);
    if (messageError) {
      return res.json({
        message: messageError,
      });
    }
    // validate data profile
    messageError = await validateDataProfile(data);
    if (messageError) {
      return res.json({
        message: messageError,
      });
    }
    // insert data professsional
    let bcryptPassword = await generatePassword(data.professional_password);
    const results = await pool.query(
      `INSERT INTO professionals (professional_email,professional_password,created_at,updated_at) VALUES ($1, $2, now(), null) RETURNING professional_id;`,
      [data.professional_email, bcryptPassword]
    );
    let professional_id = Number(results.rows[0].professional_id)
    // insert data profile
    await pool.query(
      `INSERT INTO professionals_profile (username,phone,birthdate,linkedin,title,experience,education,cv,created_at,update_at,professional_id) VALUES ($1, $2,
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
        professional_id,
      ]
    );
    return (res.json({
      message: "Create success"
    }))
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
RegisterRouter.post("/register-recruiter", async (req, res) => {
  try {
    const data = req.body;
    let messageError = await validateRecruiter(data);
    if (messageError) {
      return res.json({
        message: messageError
      })
    }
    messageError = await validateCompaniesInformation(data);
    if (messageError) {
      return res.json({
        message: messageError
      });
    };
    let bcryptPassword = await generatePassword(data.recruiter_password)
    const results = await pool.query(
      `INSERT INTO recruiters (recruiter_email,recruiter_password,created_at,updated_at) VALUES ($1,$2,now(),NULL) RETURNING recruiter_id`,
      [data.recruiter_email,bcryptPassword]); 
    let recruiter_id = Number(results.rows[0].recruiter_id);
    await pool.query(`INSERT INTO companies_information (company_name,company_website,company_description,created_at,updated_at,logo,recruiter_id) VALUES ($1,$2,$3,now(),NULL,$4,$5)`,
     [data.company_name,
      data.company_website,
      data.company_description,
      data.logo,
      recruiter_id]);
    return (res.json({
      message: "Create success"
    }));
  } catch (error) {
    return res.json({
      message: error,
    });
  };
});
async function validateProfessional (data) {
  if (!data.professional_email || !data.professional_password) {
    return "please check your body of API";
  }
  const isUniqueEmail = await pool.query(
    `SELECT professional_email FROM professionals WHERE professional_email = $1`,
    [data.professional_email]
  );
  if (isUniqueEmail.rows[0]) {
    return "This professional email already exists.";
  }
};
async function generatePassword (password) {
  const salt = await bcrypt.genSalt(10);
  let bcryptPassword = await bcrypt.hash(password, salt);
  return bcryptPassword;
}
async function validateDataProfile (data) {
  if (
    !data.username ||
    !data.phone ||
    !data.birthdate ||
    !data.linkedin ||
    !data.title ||
    !data.experience ||
    !data.education ||
    !data.cv 
  ) {
    return "please check your body of API"
  }
  const checkDate = !isNaN(new Date(data.birthdate));
  if (!checkDate) {
    return "Invalid Date of birth"
  }
  const isUniqueUsername = await pool.query(
    `SELECT username FROM professionals_profile WHERE username = $1`,
    [data.username]
  );
  if (isUniqueUsername.rows[0]) {
    return "This username already exists.";
  }
};
async function validateRecruiter (data) { 
  if (!data.recruiter_email || !data.recruiter_password) {
    return "please check your body of API"
  };
  const isUniqueEmail = await pool.query(`SELECT * FROM recruiters WHERE recruiter_email = $1`,[data.recruiter_email]);
  if (isUniqueEmail.rows[0]) {
    return "This recruiter email already exists"
  }
};
async function validateCompaniesInformation (data) {
  if (!data.company_name || !data.company_website || !data.company_description || !data.logo ) {
    return "please check your body of API";
  };
  const isUniqueName = await pool.query(`SELECT company_name FROM companies_information WHERE company_name = $1`,[data.company_name]);
  if (isUniqueName.rows[0]) {
    return "This company name already exists";
  }
};


export default RegisterRouter;

