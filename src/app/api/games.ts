const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const fetchGames = async (
  page = 1,
  pageSize = 20,
  search = "",
  category = ""
) => {
  try {
    let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`;

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (category) {
      url += `&genres=${encodeURIComponent(category)}`; // RAWG uses 'genres' for categories
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return { results: [], count: 0 }; // Return empty results to avoid crashing
  }
};

// slug page details
export const fetchGameDetails = async (slug: any) => {
  try {
    const url = `${BASE_URL}/games/${encodeURIComponent(slug)}?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

// slug page video
export const fetchGameVideos = async (slug: any) => {
  try {
    const url = `${BASE_URL}/games/${encodeURIComponent(
      slug
    )}/movies?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching game videos:", error);
    return [];
  }
};

// slug page screenshots
export const fetchGameScreenshots = async (slug: any) => {
  try {
    const url = `${BASE_URL}/games/${encodeURIComponent(
      slug
    )}/screenshots?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game screenshots:", error);
    return { results: [] };
  }
};

// slug page similar games
export const fetchSimilarGames = async (gameId: any) => {
  try {
    const url = `${BASE_URL}/games/${gameId}/game-series?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching similar games:", error);
    return { results: [] };
  }
};
