import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover; // 사진크기를 사이즈에 맞게
  border-radius: 4px; // 가장자리 둥굴게
  background-position: center center; // 사진 가운데 정렬
  /* transition: opacity 0.2s ease-in-out; // 애니메이션 효과 */
  transition: opacity 0.1s linear; // 애니메이션 효과
`;

const Rating = styled.span`
  position: absolute;
  bottom: 5px;
  right: 10px;
  opacity: 0;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  &:hover {
    ${Image} {
      opacity: 0.3; // 투명도
    }
    ${Rating} {
      opacity: 0.9;
    }
  }
  position: relative;
`;

const Title = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png").default
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            👍
          </span>
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: propTypes.number,
  imageUrl: propTypes.string,
  title: propTypes.string,
  ratting: propTypes.number,
  year: propTypes.string,
  isMovie: propTypes.bool,
};

export default Poster;
