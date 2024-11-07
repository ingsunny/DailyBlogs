import React, { useEffect, useState } from "react";
import createDOMPurify from "dompurify";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Content = ({ postId }) => {
  const DOMPurify = createDOMPurify(window);

  const { posts } = useSelector((state) => state.post);

  const currentIndex = posts.findIndex((p) => p._id === postId);

  const postContent = posts[currentIndex];

  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // const previousPostInfo = previousPost
  //   ? { _id: previousPost._id, category: previousPost.category }
  //   : null;

  // const nextPostInfo = nextPost
  //   ? { _id: nextPost._id, category: nextPost.category }
  //   : null;

  const sanitizedContent = DOMPurify.sanitize(postContent?.content);

  // prev/next
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 2000);
  }, []);

  return (
    <div className="lg:px-10 py-5 flex-1">
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
  );
};

export default Content;
