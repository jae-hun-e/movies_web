import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px); // calc는 띄어쓰기 무조건임 ㅆㅂ,,,
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  width: 50%;
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 10px;
  width: 50%;
  height: 50%;
  position: relative;
  justify-content: space-around;
`;

const Preview = styled.iframe`
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Homepage = styled.div`
  width: 30%;
  height: 100px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomfilx</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message />
  ) : (
    <Container>
      {/* {console.log(loading)}
    {console.log(
      `https://image.tmdb.org/t/p/original${result.backdrop_path}`
    )} */}
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        {/* {console.log(
        `https://image.tmdb.org/t/p/w300${result.belongs_to_collection.poster_path}`
      )} */}
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/w300${result.poster_path}`
              : require("../../assets/noPosterSmall.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date
                : result.last_air_date !== 0
                ? `${result.first_air_date} ~ ${result.last_air_date}`
                : `미방`}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime || result.runtime === 0
                ? `${result.runtime}분 `
                : result.episode_run_time.length !== 0
                ? `${result.number_of_seasons} 시즌 / ${result.number_of_episodes} 에피소드 / ${result.episode_run_time[0]} 분`
                : `${result.number_of_seasons} 시즌 / ${result.number_of_episodes} 에피소드`}
            </Item>
            <Divider>•</Divider>S
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <InfoContainer>
            <Preview
              src={
                result.videos.results.length !== 0
                  ? `https://www.youtube.com/embed/${result.videos.results[0].key}`
                  : require("../../assets/noPosterSmall.png").default
              }
              frameborder="0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            {console.log(
              `https://image.tmdb.org/t/p/original${result.production_companies[0].logo_path}`
            )}
            <Homepage
              bgimage={`https://image.tmdb.org/t/p/original${result.production_companies[0].logo_path}`}
            />
          </InfoContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: propTypes.object,
  error: propTypes.string,
  loading: propTypes.bool.isRequired,
};

export default DetailPresenter;
