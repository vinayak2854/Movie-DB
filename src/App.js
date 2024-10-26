import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllMovies from './pages/AllMovies';
import PopularMovies from './pages/PopularMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import UpcomingMovies from './pages/UpcomingMovies';
import MovieDetail from './pages/MovieDetail';
import SearchResults from './pages/SearchResults';
import ActorModal from './components/ActorModal';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page on refresh
    window.onbeforeunload = () => {
      navigate('/');
    };
  }, [navigate]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllMovies />} />
        <Route path="/popular" element={<PopularMovies />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/actorModal" element={<ActorModal/>} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
