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
    const isUnique = await pool.query(`SELECT * FROM users WHERE user_id = ${data.user_id}`)
    if (!isUnique) {
        const results = await pool.query(
            `INSERT INTO users VALUES (${data.user_id}, '${data.user_email}','${data.user_password}', now(), null)`
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
    const isUnique = await pool.query(`SELECT * FROM user_profile WHERE user_id = ${data.user_profile_id}`)
    if (!isUnique) {
    const results =
      await pool.query(`INSERT INTO user_profile VALUES (${data.user_profile_id}, '${data.username}',
        '${data.phone}','${data.birthdate}','${req.linkedin}','${body.experience}','${data.education}','${data.cv}',now(),null`);
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
//Chaw test -2
export default registerRouter;
