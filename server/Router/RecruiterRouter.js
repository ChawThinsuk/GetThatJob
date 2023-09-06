import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const recruiterRouter = Router();



recruiterRouter.post("/", async (req,res) => {
  try {
    const data = req.body;
    if (!data.recruiter_email || !data.recruiter_password) {
      return (res.json({
        message: "please check your body of API"
      }))
    }
    const salt = await bcrypt.genSalt(10);
    data.recruiter_password = await bcrypt.hash(data.recruiter_password, salt);
    const isUnique = await pool.query(`SELECT * FROM recruiters WHERE recruiter_email = $1`,[data.recruiter_email]);
    if (!isUnique.rows[0]) {
      const results = await pool.query(`INSERT INTO recruiters (recruiter_email,recruiter_password,created_at,updated_at) VALUES ($1,$2,now(),NULL)`,[data.recruiter_email,data.recruiter_email])
      return (res.json({
        message: "Created recruiters Successfully"
      }));
    } else {
      return (res.json({
        message: "This recruiter email already exists"
      }));
    }
  } catch (error) {
    return (res.json({
      message: error
    }));
  }
})

recruiterRouter.post("/companies-information", async (req,res) => {
  try {
    const data = req.body;
    if (!data.company_email || !data.company_name || !data.company_website || !data.company_description || !data.recruiter_id) {
      return (res.json({
        message: "please check your body of API"
      }));
    };
    const isUnique = await pool.query(`SELECT * FROM companies_information WHERE company_name = $1`,[data.company_name]);
    if (!isUnique.rows[0]) {
      const results = pool.query(`INSERT INTO companies_information (company_email,company_name,company_website,company_description,created_at,updated_at,recruiter_id) VALUES ($1,$2,$3,$4,now(),NULL,$5)`, [data.company_email,data.company_name,data.company_website,data.company_description,data.recruiter_id]);
      return (res.json({
        message: "Created companies-information Successfully"
      }));
    } else {
      return (res.json({
        message: "This company name already exists"
      }));
    }
  } catch (error) {
    return (res.json({
      message: error
    }));
  }
});



export default recruiterRouter;



