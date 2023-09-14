import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "f5dc36b625f59b078d5398587548eaa4",
    language: "ko-KR",
  },
});

export default instance;
