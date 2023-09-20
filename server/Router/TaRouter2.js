import { Router } from "express";
import { pool } from "../utils/db.js";
const taRouter2 = Router();

taRouter2.get("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const selcectQuery = `SELECT  *
                            FROM jobs_professional 
                            INNER JOIN professionals ON jobs_professional.professional_id = professionals.professional_id
                            INNER JOIN jobs ON jobs_professional.job_id = jobs.job_id                            
                            LEFT OUTER JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id  
                            WHERE professionals.user_id = ${user_id} `;

  try {
    const data = await pool.query(selcectQuery);
    return res.json({
      message: "already get job professional",
      data: data.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching data" });
  }
});

export default taRouter2;
