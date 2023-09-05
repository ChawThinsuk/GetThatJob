import { Router } from "express";
import { pool } from "../utils/db.js";

const registerRouter = Router();

registerRouter.get("/", async (req, res) => {
  const results = await pool.query("SELECT * FROM recruiter");
  return res.json({
    message: results.rows,
  });
});
registerRouter.post("/users", async (req, res) => {
  try {
    const data = req.body;
    const isUnique = await pool.query(`SELECT user_id FROM users WHERE user_email = $1`, [data.user_email])
    if (!isUnique.rows[0]) {
        const results = await pool.query(
            `INSERT INTO users VALUES ($1, $2, now(), null)`, [data.user_email,data.user_password]
          );
          return res.json({
            message: "Created successfully",
          });
    } else {
        return (res.json({
            message: "This user already exists."
        }))
    }
  } catch (error) {
    return res.json({
      error,
    });
  }
});

registerRouter.post("/users-profile", async (req, res) => {
  try {
    const data = req.body;
    const isUnique = await pool.query(`SELECT * FROM user_profile WHERE user_id = $1`, [data.user_profile_id])
    if (!isUnique) {
    const results =
      await pool.query(`INSERT INTO user_profile VALUES ($1, $2,
        $3,$4,$5,$6,$7,$8,now(),null`, [data.user_profile_id,data.username,data.phone,data.birthdate,data.linkedin,data.experience,data.education,data.cv]);
    return res.json({
      message: "Created successfully",
    });
    } else {
        return (res.json({
            message: "This user_profile already exists."
        }))
    }
  } catch (error) {
    return res.json({
      error,
    });
  }
});
export default registerRouter;
// {
//   "user_profile_id":"25",
//   "username":"test@gmail.com",
//   "phone":"Pass",
//   "birthday":"25/04/2541",
  
// }
