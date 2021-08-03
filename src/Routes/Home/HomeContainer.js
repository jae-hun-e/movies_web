import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upComing: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      // throw Message;
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      console.log(nowPlaying);
      const {
        data: { results: upcoming },
      } = await moviesApi.upComing();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({ nowPlaying, upcoming, popular });
    } catch {
      //error가 났을 때
      this.setState({
        error: "Can't find movies information.",
      });
    } finally {
      this.setState({
        loading: false,
      }); //뭐가 발생하든 마지막에는 loading :false
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
