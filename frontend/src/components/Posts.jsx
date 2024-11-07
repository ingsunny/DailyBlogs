import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  loadPostsSuccess,
  loadPostsFailure,
} from "../redux/slices/postSlice";

import { Link } from "react-router-dom";
import axios from "axios";
import Typewriter from "typewriter-effect";

const Posts = () => {
  // const [posts, setPosts] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();
  const { posts, currentPage, hasMore, loading } = useSelector(
    (state) => state.post
  );

  const loadPosts = async (page) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/get_posts?page=${page}&limit=5`
      );
      // setPosts((prevPosts) => {
      //   const newPosts = response.data.posts.filter(
      //     (post) => !prevPosts.some((p) => p._id === post._id)
      //   );
      //   return [...prevPosts, ...newPosts];
      // });
      dispatch(
        loadPostsSuccess({
          posts: response.data.posts,
          page,
          totalPages: response.data.totalPages,
          totalPosts: response.data.totalPosts,
        })
      );
      // setTotalPages(response.data.totalPages);
    } catch (error) {
      dispatch(loadPostsFailure(error.message));
      // console.error("Error fetching posts:", error);
    }
  };

  console.log(posts);

  useEffect(() => {
    loadPosts(currentPage);
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadPosts(currentPage + 1);
    }
  };

  // const loadMore = () => {
  //   if (page < totalPages) setPage((prevPage) => prevPage + 1);
  // };

  // const [allPosts, setAllPosts] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/post/get_posts`)
  //     .then((response) => {
  //       const post = response.data;
  //       console.log(post);
  //       setAllPosts(post);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex-1">
      <h1 className="text-[1.7rem] pb-5 font-bold text-[#161825]">
        {/* Trending... Welcome... New Posts.. */}
        <Typewriter
          options={{
            strings: [
              "Welcome...",
              "Top Articles...",
              "Trending...",
              "Latest Posts...",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      {/* // Post Container */}
      <div className="flex-1 flex flex-col md:flex-row md:flex-wrap gap-10">
        {/* // Each Post  */}
        {posts?.map((post, index) => (
          <Link
            to={`/post/${post.category}/${post._id}`}
            onClick={scrollToTop}
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
      {hasMore && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default Posts;
