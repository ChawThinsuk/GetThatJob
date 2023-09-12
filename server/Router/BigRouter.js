import { Router } from "express";
import { pool } from "../utils/db.js"


const bigRouter = Router();


bigRouter.get('/', async(req, res) => {
// const id = req.query.id;
// const title = req.query.title;
// const category = req.query.category;
// const minSalary = req.query.minSalary;
// const maxSalary = req.query.maxSalary;
// const type = req.query.type;
// const position = req.query.position;
// const mandatody = req.query.mandatody;
// const optional = req.query.optional;
// const date = req.query.date
// const logo = req.query.logo;
// const name = req.query.name;
const data = req.query
console.log(data)
const jobs = await pool.query(`
SELECT jobs.job_id, jobs.job_title, jobs.job_category, jobs.salary_min, jobs.salary_max, jobs.job_type, jobs.job_position, jobs.job_mandatory, jobs.job_optional, jobs.created_at, recruiters.company_name, recruiters.logo
FROM jobs
INNER JOIN recruiters
ON jobs.recruiter_id = recruiters.recruiter_id
`)


return res.json({
data: jobs
});
});


export default bigRouter;




// const query = {};


// if (title) {
// query.title = title;
// }


// if (category) {
// query.category = category;
// }


// if (minSalary) {
// query.minSalary = minSalary;
// }


// if (maxSalary) {
// query.minSalary = maxSalary;
// }


// if (type) {
// query.type = type;
// }


// if (position) {
// query.position = position;
// }


// if (mandatody) {
// query.mandatody = mandatody;
// }


// if (optional) {
// query.optional = optional;
// }


// if (name) {
// query.name = name;
// }




// .find(query).sort({ createdAt: -1 }).toArray()
