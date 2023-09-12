import { Router } from 'express';
import { pool } from '../utils/db.js';

const proRouter = Router();
proRouter.get('/job/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jobID = Number(id);
    const job = await pool.query(
      'SELECT * FROM jobs INNER JOIN recruiters ON recruiters.recruiter_id = jobs.recruiter_id WHERE jobs.job_id = $1',
      [jobID]
    );
    if (!job.rows[0]) {
      return res.json({ message: 'Job not founded' });
    }
    return res
      .status(200)
      .json({ message: 'job query success', job: job.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default proRouter;
