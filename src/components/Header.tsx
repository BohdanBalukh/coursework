import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string, filterBy: 'title' | 'genre') => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [filterBy, setFilterBy] = useState<'title' | 'genre'>('title');

  const handleSearch = () => {
    onSearch(inputValue.trim(), filterBy);
  };

  return (
   <header className="header">
    <link href="https://fonts.googleapis.com/css2?family=Vibur&display=swap" rel="stylesheet"></link>
    <div className="header-content">
      <div className="logo-header">
      <img src="/favicon.png" alt="Movie Land Logo" />
         <h1>Movie Land</h1>
      </div>
     </div>
  <div className="search-container">
    <h1>Find your movie</h1>
    <div className="search-bar-wrapper">
      <input
        type="text"
        placeholder={filterBy === 'title' ? "Search by title" : "Search by genre"}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
    </div>

    <div className="filters">
      <span>Search by</span>
      <button
        className={filterBy === 'title' ? 'active' : ''}
        onClick={() => setFilterBy('title')}
      >
        Title
      </button>
      <button
        className={filterBy === 'genre' ? 'active' : ''}
        onClick={() => setFilterBy('genre')}
      >
        Genre
      </button>
    </div>
  </div>
</header>


  );
};

export default Header;
