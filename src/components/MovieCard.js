import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../api';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card p-2 bg-gray-800 rounded-lg shadow-lg">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-lg bg-black">
          <img
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg text-white font-bold mt-2">{movie.title}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;

