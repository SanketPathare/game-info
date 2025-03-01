"use client";
import { useState, useEffect, Suspense } from "react";
import { fetchGames } from "../app/api/games";
import GameCard from "../components/GameCard";
import CategoryCard from "../components/CategoryCard";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { categories } from "@/Data/categories";

function Hero() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCategories, setVisibleCategories] = useState(8);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const data = await fetchGames(1, 20, search, category);
        setGames(data.results || []);
      } catch (error) {
        console.error("Error loading games:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [search, category]);

  const handleShowMoreCategories = () => {
    setVisibleCategories(categories.length);
  };

  const handleShowLessCategories = () => {
    setVisibleCategories(8);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar initialSearch={search} />

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          {categories.length > 8 && (
            <button
              onClick={
                visibleCategories === 8
                  ? handleShowMoreCategories
                  : handleShowLessCategories
              }
              className="text-neutral-400 hover:text-neutral-200 text-sm font-medium flex items-center "
            >
              {visibleCategories === 8 ? (
                <>
                  Show All <ChevronDown />
                </>
              ) : (
                <>
                  Show Less <ChevronUp />
                </>
              )}
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.slice(0, visibleCategories).map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Games</h2>
          {category && (
            <div className="flex items-center">
              <span className="mr-2">Filtered by:</span>
              <span className="bg-neutral-800  px-3 py-1 rounded-full text-sm font-medium">
                {categories.find((cat) => cat.slug === category)?.name ||
                  category}
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg p-4 h-72 animate-pulse"
              >
                <div className="bg-neutral-800 h-40 rounded-md mb-4"></div>
                <div className="bg-neutral-800 h-6 rounded w-3/4 mb-2"></div>
                <div className="bg-neutral-800 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              // @ts-ignore
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-neutral-900 rounded-lg">
            <p className="text-lg">
              No games found. Try a different search or category.
            </p>
            {(search || category) && (
              <a
                href="/"
                className="mt-4 inline-block bg-neutral-800 text-white px-4 py-2 rounded-md hover:bg-neutral-700 transition"
              >
                Clear filters
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Hero;
