import { Router } from "express";
import { pool } from "../utils/db.js"

const bigRouter = Router();

bigRouter.get('/', async(req, res) => {
const id = req.query.id;
const title = req.query.title;
const category = req.query.category;
const minSalary = req.query.minSalary;
const maxSalary = req.query.maxSalary;
const type = req.query.type;
const position = req.query.position;
const mandatody = req.query.mandatody;
const optional = req.query.optional;
const date = req.query.date
const logo = req.query.logo;
const name = req.query.name;
const data = req.query
console.log(data)
const queryParams = [];
const queryParts = ["SELECT jobs.job_id, jobs.job_title, jobs.job_category, jobs.salary_min, jobs.salary_max, jobs.job_type, jobs.job_position, jobs.job_mandatory, jobs.job_optional, jobs.created_at, recruiters.company_name, recruiters.logo FROM jobs INNER JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id  WHERE 1 = 1"];

if (type) {
  queryParams.push(type);
  queryParts.push("AND job_type ~ $" + queryParams.length);
}

if (category) {
  queryParams.push(category);
  queryParts.push("AND job_category ~ $" + queryParams.length);
}

// queryParts.push(`LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`);
// queryParams.push(PAGE_SIZE, offset);

const query = queryParts.join(" ");
// const totalQuery = 'SELECT COUNT(*) FROM jobs';
console.log(query)
console.log(queryParams)

try {
  const jobs = await pool.query(query, queryParams);
  // const total_page = await pool.query(totalQuery);
  return res.json({
    data: jobs
  });
} catch (error) {
    return res.status(500).json({message: error})
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

export default bigRouter;