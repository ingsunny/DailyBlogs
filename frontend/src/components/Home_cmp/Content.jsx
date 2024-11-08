import React, { useEffect, useState } from "react";
import createDOMPurify from "dompurify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Content = ({ postId }) => {
  const DOMPurify = createDOMPurify(window);

  const { posts } = useSelector((state) => state.post);

  const currentIndex = posts.findIndex((p) => p._id === postId);

  const currentPost = posts.find((p) => p._id === postId);

  const postContent = posts[currentIndex];

  const sanitizedContent = DOMPurify.sanitize(postContent?.content);

  // prev / next function
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // prev/next button
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 2000);
  }, []);

  return (
    <div className="flex-1 flex-col ">
      {/* -----------Home-n-Views----------- */}
      <div className=" absolute mt-3 hidden md:flex md:flex-col md:justify-center md:items-center md:gap-5 md:-ml-10 lg:-ml-4 xl:-ml-10">
        <Link
          to="/"
          class="text-sm text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </Link>
        <button class="text-sm text-gray-700  focus:outline-none flex items-center flex-row gap-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{currentPost.views}</span>
        </button>
      </div>

      <div className="lg:px-10 pb-5 flex-1">
        {/* ----------Content--------- */}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>

        {/* ---------Previous----Next---------- */}
        {isVisible && (
          <div class="flex justify-between py-10">
            <Link
              to={
                previousPost
                  ? `/post/${previousPost.category}/${previousPost._id}`
                  : "#"
              }
              className={`flex items-center gap-2 justify-center px-3 h-8 ms-3 text-sm font-medium border rounded-lg
    ${
      previousPost
        ? "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-300 bg-gray-100 cursor-not-allowed"
    }`}
            >
              <span className="text-xl rotate-180 mt-2" aria-hidden="true">
                &rarr;
              </span>
              <span>Previous</span>
            </Link>

            <Link
              to={nextPost ? `/post/${nextPost.category}/${nextPost._id}` : "#"}
              className={`flex items-center gap-2 justify-center px-3 h-8 ms-3 text-sm font-medium border rounded-lg
    ${
      nextPost
        ? "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-300 bg-gray-100 cursor-not-allowed"
    }`}
            >
              <span>Next</span>
              <span className="text-xl -mt-0.5" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
