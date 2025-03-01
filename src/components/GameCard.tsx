"use client";
import Link from "next/link";
import { Star, Users, Calendar, Award } from "lucide-react";

function GameCard({ game }: any) {
  // Format the release date
  const formatDate = (dateString: any) => {
    if (!dateString) return "Release date unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate rating stars (assuming rating is out of 5)
  const rating = game.rating || 0;
  const ratingStars = Math.round(rating);

  return (
    <Link href={`/game/${game.slug}`} className="block">
      <div className="rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-neutral-900/70 hover:bg-neutral-800/90 h-full flex flex-col">
        {/* Image section with overlay for platform icons */}
        <div className="relative">
          <img
            src={game.background_image || "/images/placeholder.jpg"}
            alt={game.name}
            className="w-full h-[300px] object-cover"
          />

          {/* Metacritic score badge */}
          {game.metacritic && (
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold
              ${
                game.metacritic >= 80
                  ? "bg-green-600"
                  : game.metacritic >= 60
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            >
              {game.metacritic}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-md font-semibold mb-1 line-clamp-1">
            {game.name}
          </h2>

          {/* Release date with icon */}
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(game.released)}</span>
          </div>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < ratingStars
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-600"
                  }
                />
              ))}
              <span className="text-xs ml-1 text-gray-400">
                ({game.ratings_count || 0})
              </span>
            </div>
          )}

          {/* Game tags/genres */}
          <div className="mt-auto flex flex-wrap gap-2">
            {game.genres?.slice(0, 3).map((genre: any) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-neutral-800/90 text-xs rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Additional info footer */}
          <div className="mt-3 pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2 text-xs text-gray-400">
            {game.esrb_rating && (
              <div className="flex items-center" title="ESRB Rating">
                <Award size={14} className="mr-1" />
                <span>{game.esrb_rating.name}</span>
              </div>
            )}
            {game.added && (
              <div
                className="flex items-center justify-end"
                title="Players Added to Collection"
              >
                <Users size={14} className="mr-1" />
                <span>{formatNumber(game.added)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Helper function to format large numbers
const formatNumber = (num: any) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num;
};

export default GameCard;
