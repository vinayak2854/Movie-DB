import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

const AllMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch popular movies
    fetchMovies('popular', page).then((response) => {
      setPopularMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    });

    // Fetch top-rated movies
    fetchMovies('top_rated', page).then((response) => {
      setTopRatedMovies(response.data.results);
    });

    // Fetch upcoming movies
    fetchMovies('upcoming', page).then((response) => {
      setUpcomingMovies(response.data.results);
    });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Movies</h2>

      {/* Popular Movies Section */}
      <h3 className="text-xl font-semibold mb-2">Popular Movies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {popularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Top Rated Movies Section */}
      <h3 className="text-xl font-semibold mb-2">Top Rated Movies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {topRatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Upcoming Movies Section */}
      <h3 className="text-xl font-semibold mb-2">Upcoming Movies</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {upcomingMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default AllMovies;
