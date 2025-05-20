import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './moviesSlice';
import { RootState, AppDispatch } from './store';
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import MovieResultsSection from './components/MovieResultsSection';
import Footer from './components/Footer';
import './styles/App.css';

const SearchResults: React.FC<{
  sortBy: 'releaseDate' | 'rating' | 'none';
  setSortBy: React.Dispatch<React.SetStateAction<'releaseDate' | 'rating' | 'none'>>;
   currentPage: number;
  onPageChange: (page: number) => void;
}> = ({  sortBy, setSortBy, currentPage, onPageChange }) => {
  const { query } = useParams();
  const location = useLocation();
  const decodedQuery = query ? decodeURIComponent(query) : '';
  const params = new URLSearchParams(location.search);
  const filter = (params.get('filter') as 'title' | 'genre') ?? 'title';

  const { movies } = useSelector((state: RootState) => state.movies);

  const filteredMovies = movies.filter(movie => {
    if (!decodedQuery.trim()) return true;
    if (filter === 'title') {
      return movie.title.toLowerCase().includes(decodedQuery.toLowerCase());
    } else {
      return movie.genre.toLowerCase().includes(decodedQuery.toLowerCase());
    }
  });

  return (
    <MovieResultsSection
      movies={filteredMovies}
      sortBy={sortBy}
      setSortBy={setSortBy}
       currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
};

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'title' | 'genre'>('title');
  const [sortBy, setSortBy] = useState<'releaseDate' | 'rating' | 'none'>('none');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  const filteredMovies = movies.filter(movie => {
    if (!searchQuery.trim()) return true;
    if (searchFilter === 'title') {
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const handleSearch = (query: string, filterBy: 'title' | 'genre') => {
    setSearchQuery(query);
    setSearchFilter(filterBy);
    navigate(`/search/${encodeURIComponent(query)}?filter=${filterBy}`);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchMovies(page));
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />

      {error && <div className="error">Помилка: {error}</div>}

      {!loading && !error && (
        <Routes>
          <Route
            path="/"
            element={
              <MovieResultsSection
                movies={filteredMovies}
                sortBy={sortBy}
                setSortBy={setSortBy}
                currentPage={currentPage}
                onPageChange={handlePageChange}         
              />
            }
          />
          <Route
            path="/search/:query"
            element={
              <SearchResults
                sortBy={sortBy}
                setSortBy={setSortBy}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            }
          />
          <Route path="/search" element={<Navigate to="/" />} />
          <Route path="/film/:id" element={<MovieDetails />} />
          <Route path="*" element={<div style={{ padding: "2rem" }}><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      )}
      <Footer />
    </div>
  );
};

export default App;
