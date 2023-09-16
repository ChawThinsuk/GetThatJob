import { Router } from "express";
import { pool } from "../utils/db.js";
const AooRouter = Router();

AooRouter.get("/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    const result = await pool.query(
      "select * from professionals inner join users on professionals.user_id = users.user_id where users.user_id=$1",
      [user_id]
    );
    // console.log(result);
    return res.json({
      data: result.rows[0],
      message: "Get Professional profile successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

AooRouter.put("/:id", async (req, res) => {
  const user_id = req.params.id;
  const data = req.body;
  // const email = data.email;
  // const username = data.username;
  // const phone = req.body.phone;
  // const birthdate = req.body.birthdate;
  // const linkedin = req.body.linkedin;
  // const title = req.body.title;
  // const experience = req.body.experience;
  // const education = req.body.education;
  // const cv = req.body.cv;
  try {
    // Update the user's professional profile data in the database using SQL UPDATE statements
    await pool.query(
      `
      UPDATE professionals
      SET
        username = $1,
        phone = $2,
        birthdate = $3,
        linkedin = $4,
        title = $5,
        experience = $6,
        education = $7,
        cv = $8,
        updated_at = NOW()
      WHERE user_id = $9;
      `,
      [
        data.username,
        data.phone,
        data.birthdate,
        data.linkedin,
        data.title,
        data.experience,
        data.education,
        data.cv,
        data.user_id,
      ]
    );

    await pool.query(
      `
      UPDATE users
      SET
        email = $1,
        updated_at = NOW()
      WHERE user_id = $2;
      `,
      [email, user_id]
    );

    return res.json({
      message: "Professional profile updated successfully",
    });
  } catch (error) {
    // console.error("Error updating profile:", error); // Log the error
    return res.json({
      message: "hello",
      error: error.message, // Include the error message in the response
    });
  }
});

export default AooRouter;
