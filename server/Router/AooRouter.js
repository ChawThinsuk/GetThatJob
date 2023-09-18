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

AooRouter.post("/:id/createjob", async (req, res) => {
  const user_id = req.params.id;
  const selectRec_id = `select recruiter_id from recruiters where user_id = ${user_id}`;
  const recruiterResult = await pool.query(selectRec_id);
  const recruiter_id = recruiterResult.rows[0].recruiter_id;

  const {
    job_title,
    job_position,
    job_mandatory,
    job_optional,
    job_category,
    job_type,
    salary_min,
    salary_max,
  } = req.body;

  // const job_title = req.body.job_title;
  // const job_position = req.body.job_position;
  // const job_mandatory = req.body.job_mandatory;
  // const job_optional = req.body.job_optional;
  // const job_category = req.body.job_category;
  // const job_type = req.body.job_type;
  // const salary_min = req.body.salary_min;
  // const salary_max = req.body.salary_max;

  const newJob = {
    job_title,
    job_position,
    job_mandatory,
    job_optional,
    job_category,
    job_type,
    salary_min,
    salary_max,
  };
  const jobStatus = "track";
  let insertData = `INSERT INTO jobs (recruiter_id, job_title, job_category, salary_min, salary_max, job_type, job_position, job_mandatory, job_optional,job_status, created_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`;

  try {
    await pool.query(insertData, [
      recruiter_id,
      newJob.job_title,
      newJob.job_category,
      newJob.salary_min,
      newJob.salary_max,
      newJob.job_type,
      newJob.job_position,
      newJob.job_mandatory,
      newJob.job_optional,
      jobStatus,
    ]);

    return res.json({
      message: "Professional profile posted successfully",
    });
  } catch (error) {
    return res.json({
      message: "Bomb has been planted.",
      error: error.message,
    });
  }
});

export default AooRouter;
