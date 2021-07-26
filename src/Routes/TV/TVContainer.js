import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    tvShowDetail: null,
    error: null,
    loading: true,
  };

  render() {
    const { topRated, popular, airingToday, tvShowDetail, error, loading } =
      this.state;
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
