import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";

const professionalRouter = Router();

professionalRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (!data.professional_email || !data.professional_password) {
      return res.json({
        message: "please check your body of API",
      });
    }
    const salt = await bcrypt.genSalt(10);
    data.professional_password = await bcrypt.hash(data.professional_password, salt)
    const isUnique = await pool.query(
      `SELECT professional_email FROM professionals WHERE professional_email = $1`,
      [data.professional_email]
    );
    if (!isUnique.rows[0]) {
      const results = await pool.query(
        `INSERT INTO professionals (professional_email,professional_password,created_at,updated_at) VALUES ($1, $2, now(), null)`,
        [data.professional_email, data.professional_password]
      );
      return res.json({
        message: "Created professional account successfully",
      });
    } else {
      return res.json({
        message: "This professional email already exists.",
      });
    }
  } catch (error) {
    return res.json({
      error,
    });
  }
});

professionalRouter.post("/profile", async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.username ||
      !data.phone ||
      !data.birthdate ||
      !data.linkedin ||
      !data.experience ||
      !data.education ||
      !data.cv ||
      !data.professional_id
    ) {
      return res.json({
        message: "please check your body of API",
      });
    }
    const isForeignKeyUnique = await pool.query(
      `SELECT professional_id FROM professionals_profile WHERE professional_id = $1`,
      [data.professional_id]
    );
    if (!isForeignKeyUnique.rows[0]) {
      const idSerch = await pool.query(
        `SELECT professional_id FROM professionals`
      );
      const id = idSerch.rows;
      const isForeignKey = id.find(
        ({ professional_id }) =>
          Number(professional_id) === data.professional_id
      );
      if (!isForeignKey) {
        return res.json({
          message: "Invalid foreign key",
        });
      }
    } else {
      return res.json({
        message: "This foreign key is already use",
      });
    }
    const checkDate = !isNaN(new Date(data.birthdate));
    if (!checkDate) {
        return res.json({
            message: "Invalid Date of birth",
          });
    }

    const isUnique = await pool.query(
      `SELECT username FROM professionals_profile WHERE username = $1`,
      [data.username]
    );
    if (!isUnique.rows[0]) {
      const results = await pool.query(
        `INSERT INTO professionals_profile (username,phone,birthdate,linkedin,experience,education,cv,created_at,update_at,professional_id) VALUES ($1, $2,
          $3,$4,$5,$6,$7,now(),null,$8)`,
        [
          data.username,
          data.phone,
          data.birthdate,
          data.linkedin,
          data.experience,
          data.education,
          data.cv,
          data.professional_id,
        ]
      );
      return res.json({
        message: "Created professional-profile Successfully",
      });
    } else {
      return res.json({
        message: "This username already exists.",
      });
    }
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});

export default professionalRouter;
