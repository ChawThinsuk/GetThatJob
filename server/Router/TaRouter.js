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

taRouter.put("/users/:user_id/jobs/:job_id", async (req, res) => {
  const { user_id, job_id } = req.params;
  const checkingQuery = `
  SELECT * FROM jobs_professional 
  INNER JOIN jobs ON jobs_professional.job_id = jobs.job_id INNER JOIN professionals 
  ON jobs_professional.professional_id = professionals.professional_id WHERE professionals.user_id = ${user_id} AND jobs.job_id =${job_id}`;

  try {
    const data = await pool.query(checkingQuery);
    console.log(req.body);

    if (data.rows[0]) {
      const updateQuery = `
      UPDATE jobs_professional
      SET
        job_user_cv = $1,
        job_user_experience = $2,
        job_user_interesting = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE
        job_professional_id = $4
    `;

      await pool.query(updateQuery, [
        req.body.job_user_cv,
        req.body.job_user_experience,
        req.body.job_user_interesting,
        data.rows[0].job_professional_id,
      ]);

      return res.status(200).json({ message: "Data has been Updated" });
    } else {
      const professionalIdQuery = await pool.query(
        `SELECT professional_id FROM professionals WHERE user_id = ${user_id}`
      );
      const insertQuery = `INSERT INTO jobs_professional (job_user_application, job_user_cv, job_user_experience, job_user_interesting, job_id, professional_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`;
      await pool.query(insertQuery, [
        true,
        req.body.job_user_cv,
        req.body.job_user_experience,
        req.body.job_user_interesting,
        job_id,
        professionalIdQuery.rows[0].professional_id,
      ]);
      return res.status(200).json({ message: "Add data success" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while checking/inserting data" });
  }
});

export default taRouter;
