import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../movietype';
import StarRating from './StarRating';


const MovieCard: React.FC<Movie> = ({id,title, genre, year, rating, poster}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/film/${id}`);
  };
  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={poster} alt={title} />
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <h3 className="movie-genre">{genre}</h3>
        <span className="year">{year}</span>
        <StarRating rating={Math.round(rating)} />
      </div>
    </div>
  );
};

export default MovieCard;
