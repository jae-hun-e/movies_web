import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    tvShowDetail: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      // const topRated = await tvApi.topRated();
      // const popular = await tvApi.popular();
      // const airingToday = await tvApi.airingToday();
      // console.log(topRated, popular, airingToday);
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      // console.log(topRated, popular, airingToday);
      this.setState({ topRated, popular, airingToday });
    } catch {
      this.setState({
        error: "Can't find TV information",
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { topRated, popular, airingToday, tvShowDetail, error, loading } =
      this.state;
    console.log(this.state);
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        tvShowDetail={tvShowDetail}
        error={error}
        loading={loading}
      />
    );
  }
}
