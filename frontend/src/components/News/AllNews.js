import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Politics", "Business", "Sports", "Technology", "Health", "Entertainment", "General"];

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
    <div>
      <h2>Latest News</h2>
      <Link to={`/news/new`}>Post News</Link>

      {/* Category Filter Buttons */}
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
    </div>
  );
};

export default AllNews;
