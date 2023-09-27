import { Router, query } from 'express';
import { pool } from '../utils/db.js';
import { protect } from '../middlewares/protect.js';
import dotenv from 'dotenv';
import stripe from 'stripe';
dotenv.config();
const YOUR_DOMAIN = 'http://localhost:5173';

// Initialize Stripe with your secret key
const stripeSecretKey = process.env.SECRET_KEY_STRIPE;
const stripeClient = stripe(stripeSecretKey);

const adsRouter = Router();
const updateTimestamp = new Date();
adsRouter.use(protect);
adsRouter.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const queryParams = [user_id];
  const query =
    'SELECT jobs.job_id, jobs.job_title, jobs.job_category, jobs.salary_min, jobs.salary_max, jobs.job_type, jobs.job_position, jobs.job_mandatory, jobs.job_optional, jobs.created_at, jobs.job_location, recruiters.company_name, recruiters.logo FROM jobs INNER JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id WHERE recruiters.user_id = $1';

  try {
    const jobs = await pool.query(query, queryParams);
    console.log(jobs);
    return res.json({
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

adsRouter.post('/create-checkout-session/:job_id/:budget', async (req, res) => {
  const { job_id, budget } = req.params;
  try {
    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1Nu6nKJsRypturIHBgIPSzF6',
          quantity: Number(budget),
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/ads/success?job_id=${job_id}`,
      cancel_url: `${YOUR_DOMAIN}/ads/cancel?job_id=${job_id}`,
    });
    await pool.query(
      'INSERT INTO transactions (job_id, session_id, created_at, payment_amount) values ($1, $2, $3, $4)',
      [job_id, session.id, new Date(), budget]
    );
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

adsRouter.get('/success/jobs/:job_id', async (req, res) => {
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
    if (payment_status === 'paid' && !accumulation_added) {
      const jobData = await pool.query(jobAcmData);
      await pool.query(updateAccumulationQuery, [
        jobData.rows[0].job_payment_accumulation,
      ]);
      await pool.query(
        `UPDATE transactions SET accumulation_added = true WHERE transaction_id = ${transaction_id}`
      );
      return res.status(200).json({
        message: 'Update Payment Accumulation Success',
        data: {
          email: session.customer_details.email,
          amount: session.amount_total / 100,
        },
      });
    }
    return res.status(200).json({
      message: 'Update transaction success',
      data: {
        email: session.customer_details.email,
        amount: session.amount_total / 100,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'An error occurred while update data' });
  }
});
export default adsRouter;
