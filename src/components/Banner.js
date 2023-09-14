import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Banner.css";

// Local imports
import requests from "../api/request";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상형중인 영화 정보를 가져오기(여러 영화)
    const response = await axios.get(requests.fetchNowPlaying);
    console.log(response);

    // 여러 영화 중 영화 하나의 ID를 가져오기
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;

    // 특정 영화의 더 상세한 정보 가져오기 (비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top cetner",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button className="banner__button play">Play</button>
          )}
        </div>
        <p className="banner__description">{truncate(movie.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
