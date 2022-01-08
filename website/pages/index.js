import React, { useState, useEffect } from 'react';

import Brands from "../app/components/Brands"
import HomeSlider from "../app/components/HomeSlider";
import HomeFirstBox from "../app/components/HomeFirstBox";
import HomeSeccoundBoxs from "../app/components/HomeSeccoundBoxs";
import HomeOfferList from "../app/components/HomeOfferList";
import func from "../util/helpers/func"
import axios from "axios"
import { API_URL } from "../../config"
const homePage = () => {

  const [homeSlider, seThomeSlider] = useState([])
  const [homeFirstBox, seThomeFirstBox] = useState([])
  const [homeSeccoundBoxs, seThomeSeccoundBoxs] = useState([])
  const [homeSeccoundBoxstitle, seThomeSeccoundBoxstitle] = useState({ title: "", description: "" })
  const [homeOfferListtitle, seThomeOfferListtitle] = useState({ title: "", description: "" })
  const [homeOfferList, seThomeOfferLists] = useState([])

  const getData = async () => {
    axios.get(`${API_URL}/homesliderpublic`).then(res => {

      seThomeSlider(func.getCategoriesTree(res.data, "61535837020a748d51968ecc"))
      seThomeFirstBox(func.getCategoriesTree(res.data, "61537c2d6464c09286494c63"))

      const homeSeccoundBoxstitleConst = res.data.filter(val => val._id === "6153cf1379053f941d1b747c")
      seThomeSeccoundBoxstitle({ title: homeSeccoundBoxstitleConst[0].title, description: homeSeccoundBoxstitleConst[0].description })
      seThomeSeccoundBoxs(func.getCategoriesTree(res.data, "6153cf1379053f941d1b747c"))

      const homeOfferListtitleConst = res.data.filter(val => val._id === "6154640f79053f941d1b76c9")
      seThomeOfferListtitle({ title: homeOfferListtitleConst[0].title, description: homeOfferListtitleConst[0].description })
      seThomeOfferLists(func.getCategoriesTree(res.data, "6154640f79053f941d1b76c9"))

    })
  }
  useEffect(() => {
    getData()
  }, [])
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

export default homePage;
