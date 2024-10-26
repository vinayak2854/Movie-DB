import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchMovieDetails, fetchMovieCredits, IMAGE_URL } from "../api"
import ActorModal from "../components/ActorModal"

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedActor, setSelectedActor] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const [movieData, creditsData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
        ])
        setMovie(movieData.data)
        setCast(creditsData.data.cast.slice(0, 6))
      } catch (err) {
        setError("Failed to fetch movie data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div className="text-center text-xl mt-8">Loading...</div>
  if (error) return <div className="text-center text-xl mt-8 text-red-500">{error}</div>
  if (!movie) return <div className="text-center text-xl mt-8">Movie not found.</div>

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})`,
            filter: "blur(5px)",
            transform: "scale(1.0)",
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-64 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg mb-2">
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p className="text-lg mb-2">
                <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-lg mb-2">
                <strong>Rating:</strong> {movie.vote_average} / 10
              </p>
              <p className="text-lg mb-2">
                <strong>Runtime:</strong> {movie.runtime} mins
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-lg mb-8">{movie.overview}</p>

        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cast.map((member) => (
            <div
              key={member.id}
              className="text-center cursor-pointer"
              onClick={() => setSelectedActor(member.id)}
            >
              <img
                src={member.profile_path ? `${IMAGE_URL}${member.profile_path}` : "/placeholder.svg"}
                alt={member.name}
                className="w-full h-auto rounded-lg mb-2 object-cover aspect-[2/3]"
              />
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-400">{member.character}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedActor && <ActorModal actorId={selectedActor} onClose={() => setSelectedActor(null)} />}
    </div>
  )
}


