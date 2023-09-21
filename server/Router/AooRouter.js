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

AooRouter.post("/getrecruiter", async (req, res) => {
  const recruiter_id = req.body.id;
  // console.log(recruiter_id);

  if (!recruiter_id) {
    return res.status(400).json({
      message: "Recruiter ID is required",
    });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM recruiters WHERE user_id = $1",
      [recruiter_id]
    );
    // console.log(result);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.json({
      data: result.rows[0],
      message: "Get recruiter's profile successfully",
    });
  } catch (error) {
    console.error("Error:", error.stack);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

AooRouter.post("/:id", async (req, res) => {
  const user_id = req.params.id;
  // const {
  //   email,
  //   name,
  //   phone,
  //   birthDate,
  //   linkedinUrl,
  //   title,
  //   professionalExperience,
  //   educationalInfo,
  //   cv,
  // } = req.body;

  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const birthDate = req.body.birthDate;
  const linkedinUrl = req.body.linkedinUrl;
  const title = req.body.title;
  const professionalExperience = req.body.professionalExperience;
  const educationalInfo = req.body.educationalInfo;
  const cv = req.body.cv;

  try {
    // Update the user's professional profile data in the database using SQL UPDATE statements
    await pool.query(
      `
      UPDATE professionals
      SET
        username = $2,
        phone = $3,
        birthdate = $4,
        linkedin = $5,
        title = $6,
        experience = $7,
        education = $8,
        cv = $9,
       
      WHERE user_id = $1;
      `,
      [
        user_id,
        name,
        phone,
        birthDate,
        linkedinUrl,
        title,
        professionalExperience,
        educationalInfo,
        cv,
      ]
    );

    await pool.query(
      `
      UPDATE users
      SET
        email = $2
      WHERE user_id = $1;
      `,
      [user_id, email]
    );

    return res.json({
      message: "Professional profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error
    return res.status(500).json({
      message:
        "An error occurred while updating your profile. Please try again later.",
      error: error.message, // Include the error message in the response
    });
  }
});

AooRouter.put("/getrecruiter/:id", async (req, res) => {
  const user_id = req.params.id;

  const company_email = req.body.company_email;
  const company_name = req.body.company_name;
  const company_website = req.body.company_website;
  const company_description = req.body.company_description;
  const logo = req.body.logo;

  try {
    // Update the recruiter's profile data in the database
    await pool.query(
      `
      UPDATE recruiters
      SET
        company_email = $2,
        company_name = $3,
        company_website = $4,
        company_description = $5,
        logo = $6,
        updated_at = NOW()
      WHERE user_id = $1;
      `,
      [
        user_id,
        company_email,
        company_name,
        company_website,
        company_description,
        logo,
      ]
    );

    return res.json({
      message: "Recruiter profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message:
        "An error occurred while updating your profile. Please try again later.",
      error: error.message,
    });
  }
});

export default AooRouter;
