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

  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Update the user's professional profile data
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
        user_id,
      ]
    );

    // Update the user's email address
    await pool.query(
      `
      UPDATE users
      SET
        email = $1,
        updated_at = NOW()
      WHERE user_id = $2;
      `,
      [data.email, user_id]
    );

    // Commit the transaction
    await pool.query("COMMIT");

    return res.json({
      message: "Professional profile updated successfully",
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query("ROLLBACK");

    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      error: error.message,
    });
  }
});

export default AooRouter;
