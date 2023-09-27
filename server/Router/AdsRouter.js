import { Router, query } from "express";
import cors from "cors";
import dotenv from "dotenv";
import stripe from "stripe";
import { pool } from "../utils/db.js";
dotenv.config();
const stripeSecretKey = process.env.SECRET_KEY_STRIPE;
const stripeClient = stripe(stripeSecretKey);

const adsRouter = Router();
const updateTimestamp = new Date();
adsRouter.get("/success/jobs/:job_id", async (req, res) => {
  const { job_id } = req.params;
  try {
    const sessionData = await pool.query(
      `SELECT created_at,session_id, transaction_id,accumulation_added FROM transactions WHERE job_id = ${job_id} ORDER BY created_at DESC LIMIT 1`
    );

    const { transaction_id, session_id, accumulation_added } =
      sessionData.rows[0];

    const session = await stripeClient.checkout.sessions.retrieve(session_id);

    const { payment_status, amount_total } = session;

    const updateTransectionQuery = `UPDATE transactions  SET
                                    payment_status = '${payment_status}',
                                    payment_amount = ${amount_total / 100},
                                    updated_at = NOW()
                                    WHERE transaction_id = ${transaction_id}`;
    const jobAcmData = `SELECT job_payment_accumulation FROM jobs WHERE job_id = ${job_id} `;

    const updateAccumulationQuery = `UPDATE jobs SET
                                     job_payment_accumulation  = $1 + ${
                                       amount_total / 100
                                     }
                                     WHERE job_id = ${job_id}`;

    await pool.query(updateTransectionQuery);
    if (payment_status === "paid" && !accumulation_added) {
      const jobData = await pool.query(jobAcmData);
      await pool.query(updateAccumulationQuery, [
        jobData.rows[0].job_payment_accumulation,
      ]);
      await pool.query(
        `UPDATE transactions SET accumulation_added = true WHERE transaction_id = ${transaction_id}`
      );
      return res.status(200).json({
        message: "Update Payment Accumulation Success",
        data: { email: session.email, amount: session.amount_total / 100 },
      });
    }
    return res
      .status(200)
      .json({
        message: "Update transaction success",
        data: { email: session.email, amount: session.amount_total / 100 },
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while update data" });
  }
});
export default adsRouter;
