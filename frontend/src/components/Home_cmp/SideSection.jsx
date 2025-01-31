import axios from "axios";
import React, { useState } from "react";
import {
  loadNoSuchPost,
  loadSearchPostComplete,
  loadSearchPostSuccess,
  selectCategory,
} from "../../redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SideSection = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedCategory } = useSelector((state) => state.post);
  const { posts } = useSelector((state) => state.post);

  const mostPopularPost = posts?.reduce(
    (max, post) => (post.views > (max?.views || 0) ? post : max),
    null
  );

  const mostRecentPost = posts?.reduce(
    (latest, post) =>
      new Date(post.createdAt) > new Date(latest?.createdAt || 0)
        ? post
        : latest,
    null
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const categories = [
    "All",
    "Food",
    "Lifestyle",
    "Health",
    "Fitness",
    "Fashion",
    "Parenting",
    "Travel",
    "Technology",
    "Finance",
  ];

  const handleCategorySelect = (category) => {
    dispatch(selectCategory(category));
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setKeyword(value);
    navigate("/");

    if (value.trim() === "") {
      // setSearchResults([]);
      dispatch(loadSearchPostComplete());
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/post/search?keyword=${value}`
      );

      dispatch(
        loadSearchPostSuccess({
          searchedPosts: response.data,
        })
      );

      console.log("search res", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      // setLoading(false); // Set loading state to false after the search is done
    }
  };

  return (
    <div className="w-72 hidden lg:block ">
      {/* search box  */}
      <div className="pb-2">
        <div className=" border-b w-72 flex justify-between pr-4">
          <input
            type="text"
            value={keyword}
            onChange={handleSearch}
            className="w-full text-sm text-semibold border-none outline-none py-2.5 "
            placeholder="Type your search query here.."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#696969"
            class="w-[1.2rem] cursor-pointer transition-transform hover:scale-110"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      {/* Popular Post  */}
      <h1 className="font-medium text-md pb-4">POPULAR POSTS</h1>
      {/* <div className="flex justify-between items-end w-full border-red-400 border-2"> */}
      <Link
        to={`/post/${mostPopularPost?.category}/${mostPopularPost?._id}`}
        className="relative flex flex-col"
      >
        <img
          className="w-full h-52 object-cover"
          src={mostPopularPost?.thumbnail_link}
          alt=""
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-[#00000006] to-[#000000c3] p-2">
          <h4 className="text-white text-sm">
            {formatDate(mostPopularPost?.createdAt)}
          </h4>
          <h3 className="pb-2 text-white text-wrap text-lg">
            {mostPopularPost?.title}
          </h3>
        </div>
      </Link>
      {/* Recent Post  */}
      <div className="">
        <h1 className="font-medium text-md pt-7">RECENT POSTS</h1>

        <div className="flex gap-2 items-start py-3">
          <img
            className="w-[4.1rem] h-12 object-cover"
            src={mostRecentPost?.thumbnail_link}
            alt=""
          />
          <div className="leading-[12px]">
            <h5 className="text-sm leading-[17px] font-medium">
              {mostRecentPost?.title}
            </h5>
            <span className="text-xs font-medium">
              {formatDate(mostRecentPost?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      {/* all categoris list  */}
      <div className="">
        <h1 className="font-medium text-md pt-7">CATEGORIES</h1>

        <ul className="text-sm">
          {categories.map((category) => (
            <li
              key={category}
              className={`flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50 ${
                selectedCategory === category ? "bg-gray-200" : ""
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideSection;
