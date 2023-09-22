import { Router } from 'express';
import { pool } from '../utils/db.js';
import { protect } from '../middlewares/protect.js';

const bigRouter = Router();
bigRouter.use(protect);
bigRouter.get('/', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const category = req.query.category;
  const type = req.query.type;
  const minSalary = req.query.minSalary;
  const maxSalary = req.query.maxSalary;
  const location = req.query.location;
  const queryParams = [];
  const queryParts = [
    'SELECT jobs.job_id, jobs.job_title, jobs.job_category, jobs.salary_min, jobs.salary_max, jobs.job_type, jobs.job_position, jobs.job_mandatory, jobs.job_optional, jobs.created_at, jobs.job_location, recruiters.company_name, recruiters.logo FROM jobs INNER JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id WHERE 1 = 1',
  ];

  if (searchTerm) {
    queryParams.push(searchTerm);
    queryParts.push(
      'AND UPPER(job_title) ~ UPPER($1) OR UPPER(job_category) ~ UPPER($1) OR UPPER(company_name) ~ UPPER($1) OR UPPER(job_type) ~ UPPER($1) OR UPPER(job_location) ~ UPPER($1)'
    );
  }

  if (category) {
    queryParams.push(category);
    queryParts.push('AND job_category ~ $' + queryParams.length);
  }

  if (type) {
    queryParams.push(type);
    queryParts.push('AND job_type ~ $' + queryParams.length);
  }

  if (minSalary) {
    queryParams.push(minSalary);
    queryParts.push('AND salary_min >= $' + queryParams.length);
  }

  if (maxSalary) {
    queryParams.push(maxSalary);
    queryParts.push('AND salary_max <= $' + queryParams.length);
  }

  if (location) {
    queryParams.push(location);
    queryParts.push('AND job_location ~ $' + queryParams.length);
  }
  // queryParts.push(`LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`);
  // queryParams.push(PAGE_SIZE, offset);

  const query = queryParts.join(' ');
  // const totalQuery = 'SELECT COUNT(*) FROM jobs';

  try {
    const jobs = await pool.query(query, queryParams);
    // const total_page = await pool.query(totalQuery);
    return res.json({
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  // const jobs = await pool.query(`
  // SELECT jobs.job_id, jobs.job_title, jobs.job_category, jobs.salary_min, jobs.salary_max, jobs.job_type, jobs.job_position, jobs.job_mandatory, jobs.job_optional, jobs.created_at, recruiters.company_name, recruiters.logo
  // FROM jobs
  // INNER JOIN recruiters
  // ON jobs.recruiter_id = recruiters.recruiter_id
  // WHERE
  //     (jobs.job_title = $1 OR $1 IS NULL) OR
  //     (jobs.job_category = $2 OR $2 IS NULL) OR
  //     (jobs.salary_min = $3 OR $3 IS NULL) OR
  //     (jobs.salary_max = $4 OR $4 IS NULL) OR
  //     (jobs.job_type = $5 OR $5 IS NULL) OR
  //     (jobs.job_position = $6 OR $6 IS NULL) OR
  //     (recruiters.company_name = $7 OR $7 IS NULL);
  // `, [title, category, minSalary, maxSalary, type, position, name]);
});
bigRouter.get('/job/popular', async (req, res) => {
  try {
    const popularJobs = await pool.query(
      'SELECT jobs.job_title,jobs.job_category FROM jobs_professional INNER JOIN jobs ON jobs_professional.job_id = jobs.job_id INNER JOIN recruiters ON recruiters.recruiter_id = jobs.recruiter_id WHERE jobs_professional.job_user_following = true GROUP BY jobs.job_id, recruiters.recruiter_id,jobs.job_category ORDER BY count(jobs.job_id) desc limit 8'
    );
    return res.status(200).json({
      message: 'get popular jobs complete',
      popularJobs: popularJobs.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
export default bigRouter;
