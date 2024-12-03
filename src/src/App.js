import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("stocks");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://YOUR_API_GATEWAY_ENDPOINT/prod?query=${query}`
        );
        setArticles(JSON.parse(response.data.body));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [query]);

  return (
    <div>
      <h1>Stock News Aggregator</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stocks or topics"
      />
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
