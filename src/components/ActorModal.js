import React, { useState, useEffect } from 'react';
import { IMAGE_URL } from '../api';

export default function ActorModal({ actorId, onClose }) {
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        if (!response.ok) throw new Error('Failed to fetch actor details');
        const data = await response.json();
        setActor(data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!actor) return <div className="text-center">Actor not found.</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{actor.name}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <img
            src={actor.profile_path ? `${IMAGE_URL}${actor.profile_path}` : '/placeholder.svg'}
            alt={actor.name}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="flex-1 text-white">
            <p><strong>Birthday:</strong> {actor.birthday || 'Unknown'}</p>
            <p><strong>Place of Birth:</strong> {actor.place_of_birth || 'Unknown'}</p>
            <p><strong>Known For:</strong> {actor.known_for_department}</p>
            <p className="mt-4">{actor.biography || 'No biography available.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
