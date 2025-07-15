import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';

const NewsFeed = ({ isLiteMode, location }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const fetchNews = useCallback(async () => {
    try {
      const query = location || 'India';
      const res = await axios.get(`/api/news?q=${query}&page=${page}`);
      console.log('News API response:', res.data);
      setArticles((prev) => [...prev, ...res.data.articles]);
    } catch (error) {
      console.error("Error fetching news", error);
    }
  }, [page, location]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} isLiteMode={isLiteMode} />
      ))}
      <div ref={loader} style={{ height: '50px' }} />
    </div>
  );
};

export default NewsFeed;
