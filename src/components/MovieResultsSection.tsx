import MovieGrid from './MovieGrid';
import { Movie } from '../movietype';

interface MovieGridProps {
  movies: Movie[];
  sortBy: 'releaseDate' | 'rating' | 'none';
  setSortBy: React.Dispatch<React.SetStateAction<'releaseDate' | 'rating' | 'none'>>;
  onPageChange: (page: number) => void; 
  currentPage: number;
}


const MovieResultsSection: React.FC<MovieGridProps> = ({ movies, sortBy, setSortBy,onPageChange,
  currentPage }) => {
  const sortedMovies = sortBy === 'none'
    ? movies
    : [...movies].sort((a, b) => {
        if (sortBy === 'releaseDate') {
          return b.year - a.year;
        } else {
          return b.rating - a.rating;
        }
      });

  const pageNumbers = [1, 2, 3, 4, 5];

  return (
    <div className="results-section">
      <div className="results-header-wrapper">
        <div className="results-header">
          <span className="movie-count">{sortedMovies.length} movies found</span>
          <div className="sort">
            <span className="sort-label">Sort by</span>
            <button
              className={sortBy === 'none' ? 'active' : ''}
              onClick={() => setSortBy('none')}
            >
              None
            </button>
            <button
              className={sortBy === 'releaseDate' ? 'active' : ''}
              onClick={() => setSortBy('releaseDate')}
            >
              Release Date
            </button>
            <button
              className={sortBy === 'rating' ? 'active' : ''}
              onClick={() => setSortBy('rating')}
            >
              Rating
            </button>
          </div>
        </div>
      </div>
      <div className="film-list">
        <MovieGrid movies={sortedMovies} />
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`page-button ${currentPage === number ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieResultsSection;

