import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from './movietype';

const TMDB_API_KEY = '5cc69f210cc91e89859fb3bcbc6cc09c'; 
const TMDB_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`;

export const fetchMovies = createAsyncThunk<Movie[],number>('movies/fetchMovies', async (page: number) => {
  const url = `${TMDB_API_URL}&page=${page}`;
   const [genreMap, res] = await Promise.all([
    fetchGenres(),
    fetch(url)
  ]);
  if (!res.ok) throw new Error('Не вдалося отримати фільми з TMDB');

  const data = await res.json();

  const movies: Movie[] = data.results
    .filter((item: any) => item.overview && item.vote_average > 0)
    .map((item: any) => ({
      id: item.id,
      title: item.title,
      genre: item.genre_ids.map((id: number) => genreMap[id]).filter(Boolean).join(', '),
      year: parseInt(item.release_date?.slice(0, 4)) || 0,
      rating: Math.round(item.vote_average / 2), 
      poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      description: item.overview,
    }));

  return movies;
});

export const fetchGenres = async (): Promise<Record<number, string>> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
  );

  if (!res.ok) throw new Error('Не вдалося отримати жанри');

  const data = await res.json();
  const genreMap: Record<number, string> = {};
  data.genres.forEach((genre: { id: number; name: string }) => {
    genreMap[genre.id] = genre.name;
  });

  return genreMap;
};


const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [] as Movie[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Помилка завантаження';
      });
  },
});

export default moviesSlice.reducer;
