import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/news.css"
const categories = ["All", "Politics", "Business", "Sports", "Technology", "Health", "Entertainment"];
import image from "../../assets/getimg_ai_img-0lsqCXQHwIksIkoXtbx4N.jpeg"
const AllNews = () => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = () => {
    const url =
      selectedCategory === "All"
        ? "http://localhost:3002/news"
        : `http://localhost:3002/news?category=${selectedCategory}`;

    axios
      .get(url)
      .then((res) => {
        setNews(res.data);
      })
      .catch((error) =>
        console.error("Error fetching news:", error)
      );
  };

  return (
    <div style={{paddingTop:"80px"}}>
        <h2 style={{color:"green",fontSize:"38px",fontWeight:"bold",paddingTop:"20px",textAlign:"center"}}>Latest News</h2>
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              width:"150px",
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCategory === category ? "#4CAF50" : "#ccc",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              textAlign:"center",
              fontSize:"18px",
              fontWeight:"bold",
              borderRadius:"20px",
            }}
            className="category-btn"
          >
            {category}
          </button>
          ))}
        </div>
        <div style={{textAlign:"center",paddingBottom:"20px"}}>
      <Link to = {`/news/new`}><button className="explore-button">Post News</button></Link>
      </div>
        <div className="news-container">
     {news.map((article) => (
      <div key={article._id} className="news-card">
      {article.image && (
        <div className="news-image">
          <img src={image} alt="News" />
        </div>
      )}
      <div className="news-content">
        <h3>{article.headline}</h3>
        <p>{article.content}</p>
        <p><strong>Author:</strong> {article.author}</p>
        <p><strong>Published Date:</strong> {new Date(article.datePublished).toDateString()}</p>
      </div>
      
      </div>
      ))}
    </div>
    </div>
  );
};

export default AllNews;
{/* <div>
      <h2>Latest News</h2>
      <Link to={`/news/new`}>Post News</Link>

      
      <div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCategory === category ? "#4CAF50" : "#ccc",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <ul>
        {news.map((article) => (
          <li key={article._id}>
            <h3>{article.headline}</h3>
            <p>{article.content}</p>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
            <p>
              <strong>Category:</strong> {article.category}
            </p>
            <p>
              <strong>Published Date:</strong> {new Date(article.datePublished).toDateString()}
            </p>
            {article.image && <img src={article.image} alt="News" width="150" />}
          </li>
        ))}
      </ul>
    </div> */}