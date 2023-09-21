import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import "./Banner.css";

// Local imports
import requests from "../api/request";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

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

  return isChecked ? (
    <>
      <Container>
        <HomeContainer>
          <Iframe
            width={640}
            height={300}
            src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&mute=1&loop=1&playlist=${movie?.videos?.results[0]?.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></Iframe>
        </HomeContainer>
      </Container>
      <button
        onClick={() => {
          setIsChecked(false);
        }}
        style={{ cursor: "pointer", width: "2rem", height: "2rem" }}
      >
        X
      </button>
    </>
  ) : (
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
            <button
              className="banner__button play"
              onClick={() => setIsChecked(true)}
            >
              Play
            </button>
          )}
        </div>
        <p className="banner__description">{truncate(movie.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    center: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
