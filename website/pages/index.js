import React, { useState, useEffect } from 'react';

import Brands from "../app/components/Brands"
import HomeSlider from "../app/components/HomeSlider";
import HomeFirstBox from "../app/components/HomeFirstBox";
import HomeSeccoundBoxs from "../app/components/HomeSeccoundBoxs";
import HomeOfferList from "../app/components/HomeOfferList";
import func from "../util/helpers/func"
import axios from "axios"

import { wrapper } from "../redux/store"
import { API_URL } from "../../config"
const homePage = ({ resData = [] }) => {

  const homeSlider = func.getCategoriesTree(resData, "61535837020a748d51968ecc")
  const homeFirstBox = func.getCategoriesTree(resData, "61537c2d6464c09286494c63")
  const homeSeccoundBoxs = func.getCategoriesTree(resData, "6153cf1379053f941d1b747c")
  const homeOfferList = func.getCategoriesTree(resData, "6154640f79053f941d1b76c9")

  const homeSeccoundBoxstitle = {
    title: resData.find(val => val._id === "6153cf1379053f941d1b747c")?.title,
    description: resData.find(val => val._id === "6153cf1379053f941d1b747c")?.description
  }


  const homeOfferListtitle = {
    title: resData.filter(val => val._id === "6154640f79053f941d1b76c9")?.title,
    description: resData.filter(val => val._id === "6154640f79053f941d1b76c9")?.description
  }


  return (
    <div>
      <Brands />
      <HomeSlider state={homeSlider} />
      <HomeFirstBox state={homeFirstBox} />
      <HomeSeccoundBoxs state={homeSeccoundBoxs} title={homeSeccoundBoxstitle} />
      <HomeOfferList state={homeOfferList} title={homeOfferListtitle} />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async ({ req, res }) => {

    const response = await axios.get(`${API_URL}/homesliderpublic`)
    return {
      props: {
        resData: response.data
      }
    }

  });

export default homePage;
