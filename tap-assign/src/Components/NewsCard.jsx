import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article, isLiteMode }) => {
  return (
    <div className="news-card">
      <h3>{article.title}</h3>
      {!isLiteMode && article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      )}
      <p>{article.description || 'No description available.'}</p>
      <a href={article.url} target="_blank" rel="noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
