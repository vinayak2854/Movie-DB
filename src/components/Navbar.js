import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const [searchParams] = useSearchParams();

  // // Extract query from URL search params
  // useEffect(() => {
  //   const searchQuery = searchParams.get('query') || "";
  //   setQuery(searchQuery);
  // }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    // if (query.trim()) {
    //   navigate(`/search?query=${query}`);
    // }
    navigate(`/search?query=${query}`);

    setIsSearchOpen(false);
    setQuery("");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const isMovieDetail = location.pathname.startsWith("/movie/");

  return (
    <nav className="bg-gray-700 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {isMovieDetail ? (
            <button
              className="text-white mr-2 lg:hidden"
              onClick={goBack}
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <button
              className="text-white mr-2 lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          <Link to="/" className="text-white text-2xl font-bold">
            MovieDb
          </Link>
        </div>

        <ul
          className={`lg:flex lg:space-x-4 items-center ${
            isOpen ? "block" : "hidden"
          } absolute lg:relative top-16 lg:top-0 left-0 right-0 bg-gray-900 lg:bg-transparent p-4 lg:p-0 z-40`}
        >
          <li>
            <Link
              to="/popular"
              className="block lg:inline-block text-white hover:text-gray-400 mb-2 lg:mb-0"
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/top-rated"
              className="block lg:inline-block text-white hover:text-gray-400 mb-2 lg:mb-0"
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/upcoming"
              className="block lg:inline-block text-white hover:text-gray-400"
            >
              Upcoming
            </Link>
          </li>
        </ul>

        <div className="flex items-center">
          <button
            className="text-white lg:hidden"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <Search size={24} />
          </button>
          <form
            onSubmit={handleSearch}
            className={`${
              isSearchOpen ? "flex" : "hidden"
            } lg:flex items-center absolute lg:relative top-16 lg:top-0 left-0 right-0 bg-gray-900 lg:bg-transparent p-4 lg:p-0 z-30`}
          >
            <input
              type="text"
              placeholder="Movie Name..."
              className="w-full lg:w-64 mr-2 px-4 py-2 rounded text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { ArrowLeft, Menu, X, Search } from 'lucide-react';

// export default function Navbar() {
//   const [query, setQuery] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/search?query=${query}`);
//     setIsSearchOpen(false);
//     setQuery('');
//   };

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

//   useEffect(() => {
//     setIsOpen(false);
//     setIsSearchOpen(false);
//   }, [location]);

//   const isMovieDetail = location.pathname.startsWith('/movie/');

//   return (
//     <nav className="bg-gray-700 p-4 sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           {isMovieDetail ? (
//             <button onClick={() => navigate(-1)} className="text-white lg:hidden">
//               <ArrowLeft size={24} />
//             </button>
//           ) : (
//             <button onClick={toggleMenu} className="text-white lg:hidden">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           )}
//           <Link to="/" className="text-white text-2xl font-bold">
//             MovieDb
//           </Link>
//         </div>

//         <ul className={`lg:flex ${isOpen ? 'block' : 'hidden'} items-center`}>
//           <li><Link to="/popular" className="text-white hover:text-gray-400">Popular</Link></li>
//           <li><Link to="/top-rated" className="text-white hover:text-gray-400">Top Rated</Link></li>
//           <li><Link to="/upcoming" className="text-white hover:text-gray-400">Upcoming</Link></li>
//         </ul>

//         <div className="flex items-center">
//           <button onClick={toggleSearch} className="text-white lg:hidden">
//             <Search size={24} />
//           </button>
//           <form onSubmit={handleSearch} className={`${isSearchOpen ? 'block' : 'hidden'} lg:flex items-center`}>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full lg:w-64 px-4 py-2 rounded text-black"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// }
