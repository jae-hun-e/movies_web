import axios from "axios";

// API_KEY : e3ffb6091393154ff4a81caaf0b29666
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e3ffb6091393154ff4a81caaf0b29666",
    languages: "en-US",
  },
});

api.get("/movie/top_rated");

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upComing: () => api.get("movie/upcomingp"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  tvShowDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
