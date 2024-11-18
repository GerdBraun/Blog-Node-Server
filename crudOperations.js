import pg from "pg";
const { Client } = pg;

// Import utility functions
import {
  getResourceId,
  processBodyFromRequest,
  returnErrorWithMessage,
} from "./utils.js";

export const createPost = async (req, res) => {
  try {
    const body = await processBodyFromRequest(req); // This utility function gets the body for you
    if (!body) return returnErrorWithMessage(res, 400, "Body is required");
    const parsedBody = JSON.parse(body);
    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query(
      "INSERT INTO posts (title, author, content, cover) VALUES ($1, $2, $3, $4) RETURNING *;",
      [parsedBody.title, parsedBody.author, parsedBody.content, parsedBody.cover]
    );
    await client.end();
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows[0]));
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
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows)); // Return the rows array
  } catch (error) {
    console.error("Error fetching posts: ", error);
    returnErrorWithMessage(res);
  }
};

export const getPostById = async (req, res) => {
  try {
    const id = getResourceId(req.url);
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
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows[0]));
  } catch (error) {
    console.error("Error fetching post: ", error);
    returnErrorWithMessage(res);
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = getResourceId(req.url);
    const body = await processBodyFromRequest(req); // This utility function gets the body for you
    if (!body) return returnErrorWithMessage(res, 400, "Body is required");
    const parsedBody = JSON.parse(body);

    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query(
      "UPDATE posts SET title = $1, author = $2, content = $3, cover = $4 WHERE id = $5 RETURNING *;",
      [parsedBody.title, parsedBody.author, parsedBody.content, parsedBody.cover, id]
    );
    await client.end();

    if (!results.rowCount)
      return returnErrorWithMessage(res, 404, "Post not found");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(results.rows[0]));
  } catch (error) {
    console.error("Error updating post: ", error);
    returnErrorWithMessage(res);
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = getResourceId(req.url);

    const client = new Client({
      connectionString: process.env.PG_URI,
    });
    await client.connect();
    const results = await client.query(
      "DELETE FROM posts WHERE id = $1;",
      [id]
    );
    await client.end();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Post deleted" }));
  } catch (error) {
    console.error("Error deleting post: ", error);
    returnErrorWithMessage(res);
  }
};
