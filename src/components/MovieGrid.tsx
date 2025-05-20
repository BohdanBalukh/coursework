import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../movietype';


interface MovieGridProps {
  movies: Movie[];
}
const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
