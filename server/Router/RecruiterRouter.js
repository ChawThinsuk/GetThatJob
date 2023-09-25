import { Router } from "express";
import { pool } from "../utils/db.js";
const RecruiterRouter = Router();

RecruiterRouter.get("/:id", async (req, res) => {
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

RecruiterRouter.post("/getrecruiter", async (req, res) => {
  const recruiter_id = req.body.id;
  // console.log(recruiter_id);

  if (!recruiter_id) {
    return res.status(400).json({
      message: "Recruiter ID is required",
    });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM recruiters WHERE user_id = $1",
      [recruiter_id]
    );
    // console.log(result);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.json({
      data: result.rows[0],
      message: "Get recruiter's profile successfully",
    });
  } catch (error) {
    console.error("Error:", error.stack);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

RecruiterRouter.post("/:id", async (req, res) => {
  const user_id = req.params.id;
  // const {
  //   email,
  //   name,
  //   phone,
  //   birthDate,
  //   linkedinUrl,
  //   title,
  //   professionalExperience,
  //   educationalInfo,
  //   cv,
  // } = req.body;

  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const birthDate = req.body.birthDate;
  const linkedinUrl = req.body.linkedinUrl;
  const title = req.body.title;
  const professionalExperience = req.body.professionalExperience;
  const educationalInfo = req.body.educationalInfo;
  const cv = req.body.cv;

  try {
    // Update the user's professional profile data in the database using SQL UPDATE statements
    await pool.query(
      `
      UPDATE professionals
      SET
        username = $2,
        phone = $3,
        birthdate = $4,
        linkedin = $5,
        title = $6,
        experience = $7,
        education = $8,
        cv = $9,
       
      WHERE user_id = $1;
      `,
      [
        user_id,
        name,
        phone,
        birthDate,
        linkedinUrl,
        title,
        professionalExperience,
        educationalInfo,
        cv,
      ]
    );

    await pool.query(
      `
      UPDATE users
      SET
        email = $2
      WHERE user_id = $1;
      `,
      [user_id, email]
    );

    return res.json({
      message: "Professional profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log the error
    return res.status(500).json({
      message:
        "An error occurred while updating your profile. Please try again later.",
      error: error.message, // Include the error message in the response
    });
  }
});

RecruiterRouter.put("/getrecruiter/:id", async (req, res) => {
  const user_id = req.params.id;

  const company_email = req.body.company_email;
  const company_name = req.body.company_name;
  const company_website = req.body.company_website;
  const company_description = req.body.company_description;
  const logo = req.body.logo;

  try {
    // Update the recruiter's profile data in the database
    await pool.query(
      `
      UPDATE recruiters
      SET
        company_email = $2,
        company_name = $3,
        company_website = $4,
        company_description = $5,
        logo = $6,
        updated_at = NOW()
      WHERE user_id = $1;
      `,
      [
        user_id,
        company_email,
        company_name,
        company_website,
        company_description,
        logo,
      ]
    );

    return res.json({
      message: "Recruiter profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message:
        "An error occurred while updating your profile. Please try again later.",
      error: error.message,
    });
  }
});

RecruiterRouter.post("/:id/createjob", async (req, res) => {
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

RecruiterRouter.post("/get-job-posting", async (req, res) => {
  try {
    const data = req.body;
    const query = queryCommand();
    let errorMessage = validateJobPosting(data);
    if (errorMessage) {
      return res.json({
        ERROR: errorMessage,
      });
    }
    if (data.job_status === "track" || data.job_status === "closed") {
      const results = await pool.query(query.queryJobWithStatus, [
        data.recruiter_id,
        data.job_status,
      ]);
      return res.json(results.rows);
    }
    const results = await pool.query(query.queryJob, [data.recruiter_id]);
    return res.json(results.rows);
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
RecruiterRouter.put("/job-status", async (req, res) => {
  try {
    const data = req.body;
    let errorMessage = validateJobClose(data);
    const query = queryCommand();
    if (errorMessage) {
      return res.json({
        ERROR: errorMessage,
      });
    }
    const results = await pool.query(query.queryCloseJob, [data.job_id]);
    return res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
RecruiterRouter.post("/getjob", async (req, res) => {
  try {
    const data = req.body;
    const query = queryCommand();
    let errorMessage = validateWithJobId(data);
    if (errorMessage) {
      return res.json({
        ERROR: errorMessage,
      });
    }
    const results = await pool.query(query.queryJobWithJobId, [data.job_id]);
    return res.json(results.rows);
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
RecruiterRouter.post("/getcandidate", async (req, res) => {
  try {
    const data = req.body;
    const errorMessage = validateGetCandidate(data);
    const query = queryCommand();
    if (errorMessage) {
      return res.json({
        ERROR: errorMessage,
      });
    }
    if (
      data.job_user_mark === "waiting" ||
      data.job_user_mark === "in_progress" ||
      data.job_user_mark === "finished"
    ) {
      const results = await pool.query(query.queryCandidateWithStatus, [
        data.job_id,
        data.job_user_mark,
      ]);
      return res.json({
        data: results.rows,
      });
    }
    const results = await pool.query(query.queryCandidate, [data.job_id]);
    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
RecruiterRouter.put("/candidate-status", async (req, res) => {
  try {
    const data = req.body;
    let errorMessage = validateCandidateStatus(data);
    const query = queryCommand();
    if (errorMessage) {
      return res.json({
        ERROR: errorMessage,
      });
    }
    const results = await pool.query(query.queryUpdateCandidateStatus, [
      data.job_user_mark,
      data.job_professional_id,
    ]);
    return res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
});
function validateJobPosting(data) {
  if (!data.job_status || !data.recruiter_id) {
    return "please check your body of API";
  }
  if (
    data.job_status !== "all" &&
    data.job_status !== "track" &&
    data.job_status !== "closed"
  ) {
    return "invalid job_status";
  }
}
function validateJobClose(data) {
  if (!data.job_id) {
    return "please check your body of API";
  }
}
function validateGetCandidate(data) {
  if (!data.job_id || !data.job_user_mark) {
    return "please check your body of API";
  }
  if (
    data.job_user_mark !== "all" &&
    data.job_user_mark !== "waiting" &&
    data.job_user_mark !== "in_progress" &&
    data.job_user_mark !== "finished"
  ) {
    return "invalid candidate status";
  }
}
function validateWithJobId(data) {
  if (!data.job_id) {
    return "please check your body of API";
  }
}
function validateCandidateStatus(data) {
  if (!data.job_user_mark || !data.job_professional_id) {
    return "please check your body of API";
  }
  if (
    data.job_user_mark !== "all" &&
    data.job_user_mark !== "waiting" &&
    data.job_user_mark !== "in_progress" &&
    data.job_user_mark !== "finished"
  ) {
    return "invalid candidate status";
  }
}
function queryCommand() {
  const queryJob = `select j.*, COALESCE(pc.total_candidate,0) total_candidate,COALESCE(am.candidate_on_track,0) candidate_on_track from jobs j 
left join (select job_id, count (professional_id) total_candidate from jobs_professional group by job_id) pc 
on j.job_id = pc.job_id 
left join(select job_id, count (professional_id) candidate_on_track from jobs_professional where job_user_mark = 'in_progress' group by job_id) am 
on j.job_id = am.job_id 
where j.recruiter_id = $1 `;
  const queryJobWithStatus = `select j.*, COALESCE(pc.total_candidate,0) total_candidate,COALESCE(am.candidate_on_track,0) candidate_on_track from jobs j 
left join (select job_id, count (professional_id) total_candidate from jobs_professional group by job_id) pc 
on j.job_id = pc.job_id 
left join(select job_id, count (professional_id) candidate_on_track from jobs_professional where job_user_mark = 'in_progress' group by job_id) am 
on j.job_id = am.job_id 
where j.recruiter_id = $1 AND j.job_status = $2`;

  const queryJobWithJobId = `select j.*, COALESCE(pc.total_candidate,0) total_candidate,COALESCE(am.candidate_on_track,0) candidate_on_track from jobs j 
left join (select job_id, count (professional_id) total_candidate from jobs_professional group by job_id) pc 
on j.job_id = pc.job_id 
left join(select job_id, count (professional_id) candidate_on_track from jobs_professional where job_user_mark = 'in_progress' group by job_id) am 
on j.job_id = am.job_id 
where j.job_id = $1`;

  const queryCandidate = `select  pd.*,us.email,jp.job_user_mark, jp.updated_at,jp.job_professional_id,jp.job_user_cv, jp.created_at application_created_at from jobs_professional jp

left join (select  * from professionals group by  professional_id,user_id) pd
on jp.professional_id = pd.professional_id
left join (select user_id,email from users where user_type = 'PROFESSIONAL' group by user_id) us
on pd.user_id = us.user_id
where job_id = $1`;

  const queryCandidateWithStatus = `select  pd.*,us.email,jp.job_user_mark, jp.updated_at ,jp.job_professional_id,jp.job_user_cv,jp.created_at application_created_at  from  jobs_professional jp

left join (select  * from professionals group by  professional_id,user_id) pd
on jp.professional_id = pd.professional_id
left join (select user_id,email from users where user_type = 'PROFESSIONAL' group by user_id) us
on pd.user_id = us.user_id
where job_id = $1 and job_user_mark = $2`;
  const queryCloseJob = `UPDATE jobs SET job_status = 'closed', closed_at = now() where job_id = $1`;
  const queryUpdateCandidateStatus = `UPDATE jobs_professional SET job_user_mark = $1 where job_professional_id = $2`;

  let query = {
    queryJob,
    queryJobWithStatus,
    queryCandidate,
    queryCandidateWithStatus,
    queryCloseJob,
    queryJobWithJobId,
    queryUpdateCandidateStatus,
  };
  return query;
}


export default RecruiterRouter;
