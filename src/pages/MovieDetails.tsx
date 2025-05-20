/*import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetails.css';
import { sampleMovies } from '../sampleMovies';
import StarRating from '../components/StarRating';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const decodedTitle = decodeURIComponent(id || '');
  const movie = sampleMovies.find(m => m.title === decodedTitle);

  if (!movie) {
    return <div style={{ padding: "2rem" }}><h2>Фільм не знайдено</h2></div>;
  }

  return (
    <div className="movie-details">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <StarRating rating={Math.round(movie.rating)} />
        <p><strong>Жанр:</strong> {movie.genre}</p>
        <p><strong>Рік:</strong> {movie.year}</p>
        <p><strong>Опис:</strong> {movie.description}</p>

      </div>
    </div>
  );
};

export default MovieDetails;*/

import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetails.css';
import StarRating from '../components/StarRating';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const numericId = id ? parseInt(id, 10) : NaN;

  const movie = useSelector((state: RootState) =>
    state.movies.movies.find(m => m.id === numericId)
  );

  if (!movie) {
    return <div style={{ padding: "2rem" }}><h2>Movie not found</h2></div>;
  }

  return (
    <div className="movie-details">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <StarRating rating={Math.round(movie.rating)} />
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Overview:</strong> {movie.description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;








