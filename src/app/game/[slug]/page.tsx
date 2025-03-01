// @ts-nocheck
"use client";
import { useState, useEffect, use } from "react";
import {
  fetchGameDetails,
  fetchGameVideos,
  fetchGameScreenshots,
  fetchSimilarGames,
} from "../../api/games";
import VideoPlayer from "../../../components/VideoPlayer";
import Link from "next/link";
import {
  Star,
  Calendar,
  Award,
  Users,
  Globe,
  Tag,
  Cpu,
  Clock,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";

import GameCard from "../../../components/GameCard";
import getStoreIcon from "@/Data/StoreIcon";

export default function Page(props) {
  // // Unwrap the params object using React.use()
  const params = use(props.params);
  const { slug } = params;

  const [game, setGame] = useState(null);
  const [videos, setVideos] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [similarGames, setSimilarGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState(0);

  useEffect(() => {
    const loadGameDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const gameData = await fetchGameDetails(slug);
        if (!gameData) {
          throw new Error("Game not found");
        }

        setGame(gameData);

        // Fetch additional data in parallel
        const [videoData, screenshotData, similarData] = await Promise.all([
          fetchGameVideos(slug),
          fetchGameScreenshots(slug),
          fetchSimilarGames(gameData.id),
        ]);

        setVideos(videoData);
        setScreenshots(screenshotData?.results || []);
        setSimilarGames(similarData?.results || []);
      } catch (err) {
        console.error("Error in game details:", err);
        setError(err.message || "Failed to load game details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadGameDetails();
      // Reset state when slug changes
      setActiveTab("about");
      setActiveScreenshot(0);
      setExpandedDescription(false);
      setActivePlatformTab(0);
    }
  }, [slug]);

  const formatReleaseDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPlaytime = (minutes) => {
    if (!minutes) return "Unknown";
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  };

  const formatRequirements = (reqText) => {
    // Common requirement labels to look for
    const knownLabels = [
      { pattern: /os|operating system/i, label: "OS" },
      { pattern: /processor|cpu/i, label: "Processor" },
      { pattern: /memory|ram/i, label: "Memory" },
      { pattern: /graphics|gpu|video/i, label: "Graphics" },
      { pattern: /directx/i, label: "DirectX" },
      { pattern: /storage|space|hdd|ssd/i, label: "Storage" },
      { pattern: /sound|audio/i, label: "Sound Card" },
      { pattern: /network|internet/i, label: "Network" },
    ];

    // If empty or not a string, return empty array
    if (!reqText || typeof reqText !== "string") return [];

    // Try to split by new lines or semi-colons
    let lines = reqText.split(/[\n;]+/);

    // If that didn't work well, try to find known patterns
    if (lines.length <= 1) {
      const formattedReqs = [];

      // Try to extract each known requirement
      knownLabels.forEach(({ pattern, label }) => {
        const match = reqText.match(
          new RegExp(
            `${pattern.source}[:\\s-]+(.*?)(?=(?:${knownLabels
              .map((l) => l.pattern.source)
              .join("|")})[:\\s-]+|$)`,
            "i"
          )
        );
        if (match && match[1]) {
          formattedReqs.push({
            label,
            value: match[1].trim(),
          });
        }
      });

      return formattedReqs.length
        ? formattedReqs
        : [{ label: "Requirements", value: reqText }];
    }

    // Process each line to extract label and value
    return lines
      .map((line) => {
        line = line.trim();
        if (!line) return null;

        // Try to split by colon or similar separator
        const parts = line.split(/:\s+|:\s+|\s+-\s+/);

        if (parts.length >= 2) {
          return {
            label: parts[0].trim(),
            value: parts.slice(1).join(": ").trim(),
          };
        }

        // If we can't split it, try to match against known labels
        for (const { pattern, label } of knownLabels) {
          if (pattern.test(line)) {
            return {
              label,
              value: line
                .replace(pattern, "")
                .replace(/^[:\s-]+/, "")
                .trim(),
            };
          }
        }

        // If all else fails, just return the line as a value
        return { label: "", value: line };
      })
      .filter(Boolean); // Remove any null entries
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 h-screen">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="w-16 h-16 border-t-4 border-neutral-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-xl">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-500/20 border border-red-500/30 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error || "Game not found"}</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center text-neutral-800 hover:text-neutral-700 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to games list
        </Link>
      </div>
    );
  }

  // Generate background style with gradient overlay
  const backgroundStyle = game.background_image
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(17, 17, 17, 1)), url(${game.background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <div className="min-h-screen">
      {/* Hero section with background image */}
      <div className="w-full pt-24 pb-6" style={backgroundStyle}>
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-neutral-400 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" /> Back to games list
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Game poster/cover */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={game.background_image || "/images/placeholder.jpg"}
                  alt={game.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
            </div>
            {/* Game info */}
            <div className="flex-grow">
              {/* Title and rating section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold">{game.name}</h1>

                {game.metacritic && (
                  <div className="flex items-center">
                    <span className="text-neutral-400 mr-2">Metacritic:</span>
                    <span
                      className={`px-3 py-1 rounded-md text-lg font-bold ${
                        game.metacritic >= 75
                          ? "bg-green-600/80"
                          : game.metacritic >= 50
                          ? "bg-yellow-600/80"
                          : "bg-red-600/80"
                      }`}
                    >
                      {game.metacritic}
                    </span>
                  </div>
                )}
              </div>

              {/* Release info and basic details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                {game.released && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-neutral-400" />
                    <span className="text-neutral-400 mr-1">Released:</span>
                    <span>{formatReleaseDate(game.released)}</span>
                  </div>
                )}

                {game.playtime && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-neutral-400" />
                    <span className="text-neutral-400 mr-1">
                      Average playtime:
                    </span>
                    <span>{formatPlaytime(game.playtime)}</span>
                  </div>
                )}

                {game.developers?.length > 0 && (
                  <div className="flex items-center">
                    <Cpu size={16} className="mr-2 text-neutral-400" />
                    <span className="text-neutral-400 mr-1">Developer:</span>
                    <span>
                      {game.developers.map((dev) => dev.name).join(", ")}
                    </span>
                  </div>
                )}

                {game.publishers?.length > 0 && (
                  <div className="flex items-center">
                    <Globe size={16} className="mr-2 text-neutral-400" />
                    <span className="text-neutral-400 mr-1">Publisher:</span>
                    <span>
                      {game.publishers.map((pub) => pub.name).join(", ")}
                    </span>
                  </div>
                )}

                {game.rating && (
                  <div className="flex items-center">
                    <Star size={16} className="mr-2 text-neutral-400" />
                    <span className="text-neutral-400 mr-1">User rating:</span>
                    <span>{game.rating.toFixed(1)}/5</span>
                    <span className="text-neutral-500 ml-1">
                      ({game.ratings_count} votes)
                    </span>
                  </div>
                )}

                {game.added && (
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-neutral-400" />
                    <span className="text-neutral-400 mr-1">Players:</span>
                    <span>
                      {game.added.toLocaleString()} players have this game
                    </span>
                  </div>
                )}
              </div>

              {/* Genres and tags */}
              {game.genres?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-neutral-400 flex items-center mr-1">
                    <Tag size={16} className="mr-2" /> Genres:
                  </span>
                  {game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-neutral-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Platforms */}
              {game.platforms?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-neutral-400 flex items-center mr-1">
                    <Award size={16} className="mr-2" /> Available on:
                  </span>
                  {game.platforms.map((p) => (
                    <span
                      key={p.platform.id}
                      className="px-3 py-1 bg-neutral-800 rounded-full text-sm"
                    >
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              )}

              {/* ESRB Rating */}
              {game.esrb_rating && (
                <div className="mt-4 inline-block px-3 py-1 bg-neutral-800 rounded-md">
                  <span className="text-neutral-400 mr-1">ESRB Rating:</span>
                  <span className="font-medium">{game.esrb_rating.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="bg-neutral-900 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "about"
                  ? "text-neutral-200 border-b-2 border-neutral-500"
                  : "text-neutral-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            {screenshots.length > 0 && (
              <button
                className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === "screenshots"
                    ? "text-neutral-100 border-b-2 border-neutral-500"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("screenshots")}
              >
                Screenshots
              </button>
            )}
            {videos.length > 0 && (
              <button
                className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === "videos"
                    ? "text-neutral-100 border-b-2 border-neutral-500"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("videos")}
              >
                Videos
              </button>
            )}
            {similarGames.length > 0 && (
              <button
                className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === "similar"
                    ? "text-neutral-100 border-b-2 border-neutral-500"
                    : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("similar")}
              >
                Similar Games
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container mx-auto p-4 mt-6">
        {/* About tab */}
        {activeTab === "about" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">About {game.name}</h2>
            <div
              className={`text-base text-neutral-300 ${
                !expandedDescription && "line-clamp-6"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    game.description ||
                    game.description_raw ||
                    "No description available.",
                }}
              />
            </div>
            {game.description && game.description.length > 300 && (
              <button
                className="text-neutral-500 hover:text-neutral-400 mt-2 font-medium"
                onClick={() => setExpandedDescription(!expandedDescription)}
              >
                {expandedDescription ? "Show less" : "Read more"}
              </button>
            )}

            {/* Additional game details in cards layout */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              {/* System requirements - IMPROVED VERSION */}
              {game.platforms?.some(
                (p) => p.requirements?.minimum || p.requirements?.recommended
              ) && (
                <div className="bg-neutral-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">
                    System Requirements
                  </h3>

                  {/* Platform tabs */}
                  <div className="mb-4 border-b border-neutral-700">
                    <div className="flex overflow-x-auto">
                      {game.platforms
                        .filter(
                          (p) =>
                            p.requirements?.minimum ||
                            p.requirements?.recommended
                        )
                        .map((p, index) => (
                          <button
                            key={p.platform.id}
                            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                              activePlatformTab === index
                                ? "text-neutral-200 border-b-2 border-neutral-500"
                                : "text-neutral-400 hover:text-white"
                            }`}
                            onClick={() => setActivePlatformTab(index)}
                          >
                            {p.platform.name}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Platform content */}
                  {game.platforms
                    .filter(
                      (p) =>
                        p.requirements?.minimum || p.requirements?.recommended
                    )
                    .map((p, index) => (
                      <div
                        key={p.platform.id}
                        className={`${
                          activePlatformTab === index ? "block" : "hidden"
                        }`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Minimum requirements */}
                          {p.requirements?.minimum && (
                            <div className="bg-neutral-700/80 rounded-lg p-3">
                              <h4 className="text-sm font-semibold text-neutral-300 mb-2 flex items-center">
                                <span className="mr-2 px-2 py-0.5 bg-neutral-600 rounded text-xs">
                                  Minimum
                                </span>
                              </h4>
                              <div className="text-sm space-y-2">
                                {formatRequirements(p.requirements.minimum).map(
                                  (req, i) => (
                                    <div key={i} className="flex">
                                      <span className="text-neutral-400 min-w-20 mr-2">
                                        {req.label}:
                                      </span>
                                      <span>{req.value}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                          {/* Recommended requirements */}
                          {p.requirements?.recommended && (
                            <div className="bg-neutral-700/80 rounded-lg p-3">
                              <h4 className="text-sm font-semibold text-neutral-300 mb-2 flex items-center">
                                <span className="mr-2 px-2 py-0.5 bg-neutral-600 rounded text-xs">
                                  Recommended
                                </span>
                              </h4>
                              <div className="text-sm space-y-2">
                                {formatRequirements(
                                  p.requirements.recommended
                                ).map((req, i) => (
                                  <div key={i} className="flex">
                                    <span className="text-neutral-400 min-w-20 mr-2">
                                      {req.label}:
                                    </span>
                                    <span>{req.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Website and stores */}
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Links & Stores</h3>
                {game.website && (
                  <div className="mb-3 flex items-center">
                    <div className="text-sm font-medium text-neutral-400 mr-1">
                      Official Website:
                    </div>
                    <Link
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-300 hover:text-neutral-200 hover:underline flex items-center"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      {game.website}
                    </Link>
                  </div>
                )}

                {game.stores?.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-neutral-400 mb-2">
                      Available at:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {game.stores.map((store) => (
                        <Link
                          key={store.id}
                          href={`https://${store.store.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-md  transition-colors flex items-center"
                        >
                          {getStoreIcon(store.store.name)}
                          {/* <span className="ml-2 text-sm capitalize">
                            {store.store.name}
                          </span> */}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ratings breakdown */}
              {game.ratings?.length > 0 && (
                <div className="bg-neutral-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Player Ratings</h3>
                  <div className="space-y-3">
                    {game.ratings.map((rating) => {
                      const percentage = (rating.percent || 0).toFixed(0);
                      return (
                        <div key={rating.id} className="flex flex-col">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium capitalize">
                              {rating.title}
                            </span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-neutral-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                rating.title === "exceptional"
                                  ? "bg-green-500"
                                  : rating.title === "recommended"
                                  ? "bg-blue-500"
                                  : rating.title === "meh"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="text-sm text-neutral-400 mt-2">
                      Based on {game.ratings_count || 0} player ratings
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Screenshots tab */}
        {activeTab === "screenshots" && screenshots.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
            <div className="mb-4">
              <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                <img
                  src={screenshots[activeScreenshot]?.image || ""}
                  alt={`${game.name} screenshot ${activeScreenshot + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center mt-2 text-sm text-neutral-400">
                {activeScreenshot + 1} of {screenshots.length}
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.id}
                  className={`relative aspect-video rounded-md overflow-hidden border-2 transition-all ${
                    activeScreenshot === index
                      ? "border-neutral-500 scale-105 z-10"
                      : "border-transparent hover:border-neutral-500"
                  }`}
                  onClick={() => setActiveScreenshot(index)}
                >
                  <img
                    src={screenshot.image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Videos tab */}
        {activeTab === "videos" && videos.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-neutral-800 rounded-lg overflow-hidden"
                >
                  <VideoPlayer
                    videoUrl={
                      video.data?.max ||
                      video.data?.["480"] ||
                      video.data?.["720"]
                    }
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-medium">{video.name}</h3>
                    {video.preview && (
                      <div className="text-sm text-neutral-400 mt-1">
                        Added: {new Date(video.created).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Games tab */}
        {activeTab === "similar" && similarGames.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Similar Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarGames.map((similarGame) => (
                <GameCard key={similarGame.id} game={similarGame} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
