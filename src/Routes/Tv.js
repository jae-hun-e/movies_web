import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loading from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { tvApi } from "api";

const Container = styled.div`
  padding: 15px;
  margin-left: 10px;
`;

const Tv = () => {
  const [tv, setTv] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    error: null,
  });

  const [loading, setLoading] = useState(true);

  async function feactAPi() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();

      // console.log(`1 : ${topRated}`);
      setTv({ ...Tv, topRated, popular, airingToday });
      // console.log(2);
      // console.log(tv);
    } catch {
      setTv({ ...tv, error: "tv정보를 찾을 수 없습니다." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    feactAPi();
  }, []);

  const { topRated, popular, airingToday, error } = tv;
  return (
    <>
      <Helmet>
        <title>TV show | Nomflix</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {/* {console.log(3)}
          {console.log(tv)} */}
          {topRated && topRated.length > 0 && (
            <Section title="TopRated Show">
              {topRated.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {popular && popular.length > 0 && (
            <Section title="Popular Show">
              {popular.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}{" "}
          {airingToday && airingToday.length > 0 && (
            <Section title="airingToday Show">
              {airingToday.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message text={error} />}
        </Container>
      )}
    </>
  );
};

Tv.propTypes = {
  topRated: propTypes.array,
  popular: propTypes.array,
  airingToday: propTypes.array,
  error: propTypes.string,
  loading: propTypes.bool.isRequired,
};

export default Tv;
