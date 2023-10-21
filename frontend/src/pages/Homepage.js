import React, { useEffect, useState } from "react";
import BlogModal from "../components/modal/BlogModal";
import PostCard from "../components/cards/PostCard";
import "./homepage.scss";
import { HomepageAPI } from "../API/allAPI";

export default function Homepage() {
  const userid = parseInt(localStorage.getItem("userid"), 10);
  const [datas, setDatas] = useState();

  useEffect(() => {
    onLoading();
  }, []);

  const onLoading = async () => {
    try {
      const response = await HomepageAPI();
      setDatas(response);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error creating post:", error);
    }
  };
  return (
    <div>
      <BlogModal userid={userid} onLoading={onLoading}/>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {datas &&
          datas.map((data) => {
            return <PostCard data={data} userid={userid} onLoading={onLoading}/>;
          })}
      </div>
    </div>
  );
}
