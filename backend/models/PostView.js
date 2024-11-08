import mongoose from "mongoose";

const postViewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const PostView = mongoose.model("PostView", postViewSchema);

export default PostView;
