import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import { conn } from "./config/db.js";
import {
  responseData,
  responseError,
  responseSuccess,
} from "./helper/responses.js";

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/todos", async (req, res) => {
  const sql = "SELECT * FROM todos";
  try {
    const [results] = await conn.query(sql);

    res.json({
      status: "success",
      data: results,
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/todos", async (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    responseError(res, 400, {
      message: "missing todo key.",
    });
    return;
  }

  const sql = "INSERT INTO todos (todo) VALUES (?)";
  try {
    const result = await conn.query(sql, [todo]);
    responseSuccess(res, 201, "todo created.");
  } catch (err) {
    console.error(err);
  }
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM todos WHERE id=?";
  try {
    const [results] = await conn.query(sql, [id]);

    if (results.length < 1) {
      responseError(res, 404, {
        message: "todo not found.",
      });
      return;
    }

    responseData(res, 200, results[0]);
  } catch (err) {
    console.log(err);
    // responseError(res, 404, err);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM todos WHERE id=? LIMIT 1";
  try {
    const [results] = await conn.query(sql, [id]);

    if (results.affectedRows < 1) {
      responseError(res, 404, {
        message: "todo not found.",
      });
      return;
    }

    responseSuccess(res, 200, "todo deleted.");
  } catch (err) {
    console.error(err);
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(`http://localhost:${process.env.APP_PORT}`);
});
