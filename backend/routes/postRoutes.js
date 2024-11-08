import express from "express";
import {
  createPost,
  getAllPosts,
  searchPost,
  addViews,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/get_posts", getAllPosts);
router.get("/search", searchPost);
router.post("/add_views", addViews);

export default router;
