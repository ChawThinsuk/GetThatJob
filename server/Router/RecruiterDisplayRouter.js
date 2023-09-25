import { Router, query } from "express";
import { pool } from "../utils/db.js";

const RecruiterDisplayRouter = Router();

RecruiterDisplayRouter.post("/get-job-posting", async (req, res) => {
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
RecruiterDisplayRouter.put("/job-status", async (req, res) => {
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
RecruiterDisplayRouter.post("/getjob", async (req, res) => {
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
RecruiterDisplayRouter.post("/getcandidate", async (req, res) => {
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
RecruiterDisplayRouter.put("/candidate-status", async (req, res) => {
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

export default RecruiterDisplayRouter;
