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
  let [movies, setMovies] = useState({
    nowPlaying: null,
    upComing: null,
    popular: null,
    error: null,
    loading: true,
  });
  // const [loading, setLoading] = useState(true);

  async function feactAPi() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      console.log(`1 : ${nowPlaying}`);
      const {
        data: { results: upComing },
      } = await moviesApi.upComing();
      const {
        data: { results: popular },
      } = await moviesApi.popular();

      setMovies((movies) => ({ ...movies, nowPlaying, upComing, popular }));

      // setMovies({ ...movies, nowPlaying, upComing, popular });
      // console.log(2);
      // console.log(movies);
    } catch {
      setMovies((movies) => ({
        ...movies,
        error: "영화 정보를 찾을 수 없습니다.",
      }));
    } finally {
      setMovies((movies) => ({ ...movies, loading: false }));
      // setLoading(false);
    }
  }
  useEffect(() => {
    feactAPi();
  }, []);

  const { nowPlaying, upcoming, popular, error, loading } = movies;
  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {/* {console.log(3)}
          {console.log(movies)} */}
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
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
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming">
              {upcoming.map((movie) => (
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
          {popular && popular.length > 0 && (
            <Section title="Popular">
              {popular.map((movie) => (
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

          {error && <Message color="#e74c3c" text={error} />}
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
