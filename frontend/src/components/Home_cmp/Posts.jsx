import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  loadPostsSuccess,
  loadPostsFailure,
  resetPosts,
} from "../../redux/slices/postSlice";

import { Link } from "react-router-dom";
import axios from "axios";
import Typewriter from "typewriter-effect";

const Posts = () => {
  const dispatch = useDispatch();
  const {
    posts,
    currentPage,
    hasMore,
    loading,
    searching,
    searchedPosts,
    noSuchPost,
  } = useSelector((state) => state.post);

  const loadPosts = async (page = 1) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `http://localhost:4000/api/post/get_posts?page=${page}&limit=5`
      );
      if (response.data.posts.length > 0) {
        dispatch(resetPosts({ hasMore: true }));
        dispatch(
          loadPostsSuccess({
            posts: response.data.posts,
            page,
            totalPages: response.data.totalPages,
            totalPosts: response.data.totalPosts,
          })
        );
      } else if (response.data.posts.length == 0) {
        dispatch(resetPosts({ hasMore: false }));
      }
    } catch (error) {
      dispatch(loadPostsFailure(error.message));
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadPosts(currentPage + 1);
    }
  };

  const handlePostClick = async (postId) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      response = await axios.post("http://localhost:4000/api/post/add_views", {
        postId: postId,
      });
    } catch (error) {}
  };

  // Typewriter string in sync
  const [strings, setStrings] = useState([
    "Welcome...",
    "Top Articles...",
    "Trending...",
    "Latest Posts...",
  ]);

  // Updating the strings based on the condition
  useEffect(() => {
    if (searching) {
      setStrings(["Search results..."]);
    } else if (noSuchPost) {
      setStrings(["No such post available...", "Sorry for inconvenience..."]);
    } else {
      setStrings(["Top Articles...", "Trending...", "Latest Posts..."]);
    }
  }, [searching, noSuchPost]);

  return (
    <div className="flex-1">
      {" "}
      <h1 className="text-[1.7rem] pb-5 font-bold text-[#161825]">
        <Typewriter
          options={{
            strings: strings,
            autoStart: true,
            loop: true,
          }}
        />
      </h1>{" "}
      {/* // Post Container */}
      {noSuchPost ? (
        <div className="flex justify-center  ">
          <div className="bg-white p-8  max-w-md w-full text-center">
            <p className="text-gray-600 mb-6">
              Sorry, there are no posts that match your search criteria.
            </p>
            <p className="text-sm text-gray-500">
              Please try adjusting your search <br />
              or
              <br /> browse our latest posts.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col md:flex-row md:flex-wrap gap-10">
            {/* // Each Post  */}

            {searching
              ? searchedPosts?.map((post, index) => (
                  <Link
                    to={`/post/${post.category}/${post._id}`}
                    onClick={() => handlePostClick(post._id)}
                    className="md:w-72 flex flex-col rounded-sm  hover:shadow-md cursor-pointer transform transition-transform duration-300  sm:hover:scale-105"
                    key={index}
                  >
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <label className="absolute z-20 bg-white text-sm font-medium px-2 py-1 m-3">
                        {post.category}
                      </label>
                      <img
                        className="object-cover h-full w-full"
                        src={post.thumbnail_link}
                        alt=""
                      />
                    </div>
                    <div className="flex-grow p-2">
                      <h3 className="text-xl sm:text-2xl py-2 font-medium">
                        {post.title}
                      </h3>
                      <div className="flex text-xs font-medium text-[#000000c3] justify-between">
                        <h4 className="uppercase">BY: {post.author}</h4>
                        <h4>March 23, 2021</h4>
                      </div>
                      <p className="text-sm py-2 text-balance font-medium text-[#000000c3]">
                        {post.description}
                      </p>
                    </div>
                    <button className="text-xs sm:text-sm text-left hover:bg-gray-200 bg-gray-50 px-2 py-2 border-b font-medium text-[#000] hover:text-[#4338ca] uppercase">
                      Read More
                    </button>
                  </Link>
                ))
              : posts?.map((post, index) => (
                  <Link
                    to={`/post/${post.category}/${post._id}`}
                    onClick={() => handlePostClick(post._id)}
                    className="md:w-72 flex flex-col rounded-sm  hover:shadow-md cursor-pointer transform transition-transform duration-300  sm:hover:scale-105"
                    key={index}
                  >
                    <div className="relative h-36 md:h-48 overflow-hidden">
                      <label className="absolute z-20 bg-white text-sm font-medium px-2 py-1 m-3">
                        {post.category}
                      </label>
                      <img
                        className="object-cover h-full w-full"
                        src={post.thumbnail_link}
                        alt=""
                      />
                    </div>
                    <div className="flex-grow p-2">
                      <h3 className="text-xl sm:text-2xl py-2 font-medium">
                        {post.title}
                      </h3>
                      <div className="flex text-xs font-medium text-[#000000c3] justify-between">
                        <h4 className="uppercase">BY: {post.author}</h4>
                        <h4>March 23, 2021</h4>
                      </div>
                      <p className="text-sm py-2 text-balance font-medium text-[#000000c3]">
                        {post.description}
                      </p>
                    </div>
                    <button className="text-xs sm:text-sm text-left hover:bg-gray-200 bg-gray-50 px-2 py-2 border-b font-medium text-[#000] hover:text-[#4338ca] uppercase">
                      Read More
                    </button>
                  </Link>
                ))}
          </div>
          {!searching
            ? hasMore && (
                <button
                  className="mt-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More ->"}
                </button>
              )
            : ""}
        </>
      )}
    </div>
  );
};

export default Posts;
