import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail_link: { type: String, required: true },
  // author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
