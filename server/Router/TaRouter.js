import { Router } from "express";
import { pool } from "../utils/db.js";
const taRouter = Router();

taRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const selcectQuery = `SELECT professionals.experience, professionals.cv FROM professionals INNER JOIN users ON professionals.user_id = users.user_id WHERE users.user_id = ${id}`;

  try {
    const data = await pool.query(selcectQuery);
    return res.json({
      message: "already get job professional",
      data: data.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching data" });
  }
});

const updateTimestamp = new Date();

// ...

taRouter.put("/users/:user_id/jobs/:job_id", async (req, res) => {
  const { user_id, job_id } = req.params;
  const checkingQuery = `
    SELECT * FROM jobs_professional
    INNER JOIN jobs ON jobs_professional.job_id = jobs.job_id
    INNER JOIN professionals ON jobs_professional.professional_id = professionals.professional_id
    WHERE professionals.user_id = $1 AND jobs.job_id =$2`;

  try {
    const data = await pool.query(checkingQuery, [user_id, job_id]);
    console.log(req.body);

    if (data.rows[0]) {
      const updateQuery = `
        UPDATE jobs_professional
        SET
          job_user_cv = $1,
          job_user_experience = $2,
          job_user_interesting = $3,
          updated_at = $4,
          job_user_mark = 'waiting',
          job_user_application = true
        WHERE
          job_professional_id = $5
      `;

      await pool.query(updateQuery, [
        req.body.job_user_cv,
        req.body.job_user_experience,
        req.body.job_user_interesting,
        updateTimestamp,
        data.rows[0].job_professional_id,
      ]);

      return res.status(200).json({ message: "Data has been updated" });
    } else {
      const professionalIdQuery = await pool.query(
        `SELECT professional_id FROM professionals WHERE user_id = $1`,
        [user_id]
      );
      const insertQuery = `
        INSERT INTO jobs_professional (
          job_user_application,
          job_user_cv,
          job_user_experience,
          job_user_interesting,
          job_id,
          professional_id,
          created_at,
          updated_at,
          job_user_mark,
          job_user_application
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'waiting', true)
      `;
      await pool.query(insertQuery, [
        true,
        req.body.job_user_cv,
        req.body.job_user_experience,
        req.body.job_user_interesting,
        job_id,
        professionalIdQuery.rows[0].professional_id,
        updateTimestamp,
        updateTimestamp,
      ]);

      return res.status(200).json({ message: "Data has been added" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while checking/inserting data" });
  }
});

export default taRouter;
