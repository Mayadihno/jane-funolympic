import React from "react";
import Banner from "../../components/Banner/Banner";
import Talk from "../../components/Random/Talk";
import News from "../../components/News/News";
import Highlight from "../../components/Highlist/Highlight";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <Talk />
      <News />
      <Highlight />
    </React.Fragment>
  );
};

export default Home;
