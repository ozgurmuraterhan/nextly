import React from 'react';

import Brands from "../app/components/Brands"
import HomeSlider from "../app/components/HomeSlider";
import HomeFirstBox from "../app/components/HomeFirstBox";
import HomeSeccoundBoxs from "../app/components/HomeSeccoundBoxs";
import HomeOfferList from "../app/components/HomeOfferList";

const homePage = () => {

  return (
    <div>
      <Brands />
      <HomeSlider />
      <HomeFirstBox />
      <HomeSeccoundBoxs />
      <HomeOfferList />
    </div>
  );
}

export default homePage;
