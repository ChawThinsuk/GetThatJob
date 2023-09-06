import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const jobRouter = Router();

jobRouter.post("/", async (req, res) => {
    try {
      const data = req.body;
      if (!data.recruiter_id || !data.salary_id || !data.job_title || !data.job_category || !data.job_type || !data.job_position || !data.job_mandatory || !data.job_optional) {
        return res.json({
          message: "please check your body of API",
        });
      }
      const isUnique = await pool.query(
        `SELECT job_title FROM users WHERE user_email = $1`,
        [data.user_email]
      );
      if (!isUnique.rows[0]) {
        const results = await pool.query(
          `INSERT INTO users (user_email,user_password,created_at,update_at) VALUES ($1, $2, now(), null)`,
          [data.user_email, data.user_password]
        );
        return res.json({
          message: "Created users successfully",
        });
      } else {
        return res.json({
          message: "This user email already exists.",
        });
      }
    } catch (error) {
      return res.json({
        error,
      });
    }
  });

export default jobRouter;