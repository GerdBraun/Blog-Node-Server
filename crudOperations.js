import pg from "pg";
const { Client } = pg;

// Import utility functions
import {
  returnErrorWithMessage,
} from "./utils.js";

export const createPost = async (req, res) => {
  try {
    const { title, author, content, cover } = req.body;
    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query(
      "INSERT INTO posts (title, author, content, cover) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, author, content, cover]
    );
    await client.end();

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error creating post: ", error);
    returnErrorWithMessage(res);
  }
};

export const getPosts = async (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query("SELECT * FROM posts ORDER BY id DESC;"); // Select from the right table
    await client.end();

    res.json(results.rows);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    returnErrorWithMessage(res);
  }
};

export const getPostById = async (req, res) => {
  try {
    const {id} = req.params;
    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query("SELECT * FROM posts WHERE id=$1;", [
      id,
    ]);
    await client.end();
    if (!results.rowCount)
      return returnErrorWithMessage(res, 404, "Post not found");
    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error fetching post: ", error);
    returnErrorWithMessage(res);
  }
};

export const updatePost = async (req, res) => {
  try {
    if (!req.body) return returnErrorWithMessage(res, 400, "Body is required");
    const {id} = req.params;
    const { title, author, content, cover } = req.body;
    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query(
      "UPDATE posts SET title = $1, author = $2, content = $3, cover = $4 WHERE id = $5 RETURNING *;",
      [title, author, content, cover, id]
    );
    await client.end();

    if (!results.rowCount)
      return returnErrorWithMessage(res, 404, "Post not found");

    res.json(results.rows[0]);
  } catch (error) {
    console.error("Error updating post: ", error);
    returnErrorWithMessage(res);
  }
};

export const deletePost = async (req, res) => {
  try {
    const {id} = req.params;

    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query(
      "DELETE FROM posts WHERE id = $1;",
      [id]
    );
    await client.end();

    return res.status(204).send("Post deleted");
  } catch (error) {
    console.error("Error deleting post: ", error);
    returnErrorWithMessage(res);
  }
};
