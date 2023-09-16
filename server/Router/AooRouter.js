import { Router } from "express";
import { pool } from "../utils/db.js";
const AooRouter = Router();

AooRouter.get("/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    const result = await pool.query(
      "select * from professionals inner join users on professionals.user_id = users.user_id where users.user_id=$1",
      [user_id]
    );
    // console.log(result);
    return res.json({
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

export default AooRouter;
