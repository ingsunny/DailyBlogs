import Post from "../models/Post.js";

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
    // Handle any errors during fetching
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve posts", error: error.message });
  }
};

// POST route to create a new post
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
