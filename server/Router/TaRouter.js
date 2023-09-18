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
  SELECT job_user_cv, job_user_experience, job_user_interesting FROM jobs_professional 
  INNER JOIN jobs ON jobs_professional.job_id = jobs.job_id INNER JOIN professionals 
  ON jobs_professional.professional_id = professionals.professional_id WHERE professionals.user_id = ${user_id} AND jobs.job_id =${job_id}`;

  try {
    const data = await pool.query(checkingQuery);

    const userCV = data.rows[0].job_user_cv;
    const userExp = data.rows[0].job_user_experience;
    const userInt = data.rows[0].job_user_interesting;
    console.log(userCV);
    console.log("123543");
    if (userCV === null || userExp === null || userInt === null) {
      const insertQuery = `
      UPDATE jobs_professional
      SET
        job_user_cv = 'updated_cv_value',
        job_user_experience = 'updated_experience_value',
        job_user_interesting = 'updated_interesting_value'
      WHERE
        user_id = ${user_id}
        AND job_id = ${job_id}
      
      `;

      await pool.query(insertQuery, [userCV, userExp, userInt]);

      return res.status(200).json({ message: "Data has been inserted" });
    } else {
      return res.status(200).json({ message: "Data already exists" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while checking/inserting data" });
  }
});

export default taRouter;
