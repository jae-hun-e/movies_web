import React, { useState, useEffect } from "react";
import { moviesApi } from "api";

import propTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loading from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 15px;
  margin-left: 10px;
`;

const Home = () => {
  const [movies, setMovies] = useState({
    nowPlaying: null,
    upComing: null,
    popular: null,
    error: null,
  });
  const [loading, setLoading] = useState(true);

  async function feactAPi() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      // console.log(`1 : ${nowPlaying}`);
      const {
        data: { results: upcoming },
      } = await moviesApi.upComing();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setMovies({ nowPlaying, upcoming, popular });
    } catch {
      setMovies({ ...movies, error: "영화 정보를 찾을 수 없습니다." });
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    feactAPi();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {/* {console.log(movies)}
          {console.log(`3 : ${movies.nowPlaying}`)} */}
          {movies.nowPlaying && movies.nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {movies.nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {movies.upcoming && movies.upcoming.length > 0 && (
            <Section title="Upcoming">
              {movies.upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {movies.popular && movies.popular.length > 0 && (
            <Section title="Popular">
              {movies.popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}

          {movies.error && <Message color="#e74c3c" text={movies.error} />}
        </Container>
      )}
    </>
  );
};

Home.propTypes = {
  nowPlaying: propTypes.array,
  upComing: propTypes.array,
  popular: propTypes.array,
  error: propTypes.string,
  loading: propTypes.bool,
};

export default Home;
