import { Router, query } from "express";
import { pool } from "../utils/db.js";

const proRouter = Router();
//Get singleJob
proRouter.get("/job/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jobID = Number(id);
    const job = await pool.query(
      "SELECT *,jobs.created_at AS job_created_at FROM jobs INNER JOIN recruiters ON recruiters.recruiter_id = jobs.recruiter_id WHERE jobs.job_id = $1",
      [jobID]
    );
    if (!job.rows[0]) {
      return res.json({ message: "Job not founded" });
    }
    return res
      .status(200)
      .json({ message: "job query success", job: job.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
// job following Status
proRouter.get("/follow/job", async (req, res) => {
  const userID = req.query.userID;
  const jobID = req.query.job_id;
  try {
    const companyFollow = await pool.query(
      "SELECT jobs_professional.job_professional_id, jobs_professional.job_user_following FROM jobs_professional INNER JOIN professionals ON professionals.professional_id = jobs_professional.professional_id WHERE professionals.user_id = $1 AND jobs_professional.job_id = $2",
      [userID, jobID]
    );
    return res.json({
      message: "get following status complete",
      data: companyFollow.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
// Update Follow Job
proRouter.put("/follow/job", async (req, res) => {
  const { job_professional_id, job_professional_follow } = req.body.data;
  const updateFollow = await pool.query(
    "UPDATE jobs_professional SET job_user_following = $1, updated_at = $2 WHERE job_professional_id = $3",
    [job_professional_follow, new Date(), job_professional_id]
  );
  return res.status(200).json({ message: "Update complete" });
});

//add Job_professional data
proRouter.post("/jobpro", async (req, res) => {
  const { userID, job_id } = req.body.data;
  try {
    const professionalID = await pool.query(
      "SELECT professional_id FROM professionals WHERE user_id = $1",
      [userID]
    );
    const addJobProfessional = await pool.query(
      "INSERT INTO jobs_professional (job_user_following,job_user_application,professional_id,job_id,created_at,updated_at) VALUES ($1,$2,$3,$4,$5)",
      [
        true,
        false,
        Number(professionalID.rows[0].professional_id),
        job_id,
        new Date(),
        new Date(),
      ]
    );
    return res.status(200).json({ message: "Update complete" });
  } catch (error) {
    console.log(error);
  }
});
// get professional experience

export default proRouter;
