import Post from "../models/Post.js";
import PostView from "../models/PostView.js";

export const createPost = async (req, res) => {
  const { category, title, thumbnail_link, author, description, content } =
    req.body;

  try {
    // Ensure that the author is valid; you might want to fetch the user or validate it here
    const newPost = new Post({
      category,
      title,
      thumbnail_link,
      author, // This should be the ObjectId from the authenticated user
      description,
      content,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 10; // default to 10 posts per page

  try {
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      totalPages,
      currentPage: page,
      totalPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve posts", error: error.message });
  }
};

export const searchPost = async (req, res) => {
  try {
    const keyword = req.query.keyword.toLowerCase();

    const results = await Post.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Error searching posts:", error);
    res
      .status(500)
      .json({ message: "Failed to search posts", error: error.message });
  }
};

export const addViews = async (req, res) => {
  const { postId } = req.body;
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (ip === "::1") {
    ip = "127.0.0.1";
  }

  try {
    const existingView = await PostView.findOne({
      postId,
      ipAddress: ip,
    });

    if (existingView) {
      // console.log("existingView");
      return;
    }

    const newPostView = new PostView({
      postId,
      ipAddress: ip,
    });

    await newPostView.save(); // Save the new post viewers record

    // increment by 1
    await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });

    return res.status(200);
  } catch (error) {
    console.error(error);
    return;
    // res
    //   .status(500)
    //   .json({ message: "Something went wrong. Please try again." });
  }
};
