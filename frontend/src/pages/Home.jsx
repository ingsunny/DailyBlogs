import React from "react";
import SidePanel from "../components/SidePanel";
import Posts from "../components/Posts";
import Content from "../components/Content";
import { useParams } from "react-router-dom";

const Home = ({ showContent }) => {
  const { postID } = useParams();

  return (
    <>
      {/* Main */}
      <div className="max-w-screen-md lg:max-w-screen-lg m-auto px-3 sm:px-7 md:px-14 lg:px-5 xl:px-0">
        <div className="flex flex-col lg:flex-row gap-5 py-12">
          {/* Section 1 - Content Display Screen */}
          {showContent !== true ? <Posts /> : <Content postId={postID} />}

          {/* Section 2 - Sidebar Quick Links*/}
          <SidePanel />
        </div>
      </div>
    </>
  );
};

export default Home;
