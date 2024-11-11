import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import createDOMPurify from "dompurify";
import axios from "axios";

const CreatePost = () => {
  const DOMPurify = createDOMPurify(window);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const sanitizedContent = DOMPurify.sanitize(content);

  const [postData, setPostData] = useState({
    category: "",
    title: "",
    thumbnail_link: "",
    author: "Sunny", // Set authorId from props
    description: "",
    content: ``,
  });

  console.log(postData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleContentChange = (newContent) => {
    setPostData({
      ...postData,
      content: newContent, // Update the content field with the new content from JoditEditor
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Axios to send POST request
      const response = await axios.post(
        "http://localhost:4000/api/post/create",
        postData
      );

      // Assuming the response contains the created post data
      console.log("Post created:", response.data);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(
        "Failed to create post: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="max-w-screen-lg m-auto pb-52">
      <div className="flex flex-col gap-4 mt-8">
        <div>
          <label className="text-md font-semibold">Select Category:</label>
          <select
            name="category" // Add the name attribute to match your state key
            value={postData.category} // Bind it to postData.category
            onChange={handleChange} // Ensure handleChange is managing the state
            className="border w-full outline-none p-1"
          >
            <option value="" disabled>
              Select--
            </option>{" "}
            {/* Add disabled to the placeholder */}
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Fashion">Fashion</option>
            <option value="Parenting">Parenting</option>
            <option value="Travel">Travel</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label className="text-md font-semibold">Blog Title:</label>
          <input
            name="title"
            className="border w-full outline-none p-1"
            type="text"
            placeholder="..."
            value={postData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label className="text-md font-semibold">Thumbnail Link:</label>
          <input
            name="thumbnail_link"
            className="border w-full outline-none p-1"
            type="text"
            placeholder="..."
            value={postData.thumbnail_link}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label className="text-md font-semibold">
            Meta Data Description:
          </label>
          <textarea
            name="description"
            className="border w-full outline-none p-1"
            type="text"
            placeholder="..."
            value={postData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <JoditEditor
          name="content"
          ref={editor}
          value={content}
          onChange={handleContentChange}
        />

        {/* <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div> */}
      </div>
      <button
        onClick={handleSubmit}
        className="text-xl font-medium bg-[#238636] hover:bg-[#2a7b3b] text-white px-5 py-1 my-5 float-right"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
