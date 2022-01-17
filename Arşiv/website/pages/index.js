import React, { useState, useEffect } from 'react';

import Brands from "../app/components/Brands"
import HomeSlider from "../app/components/HomeSlider";
import HomeFirstBox from "../app/components/HomeFirstBox";
import HomeSeccoundBoxs from "../app/components/HomeSeccoundBoxs";
import HomeOfferList from "../app/components/HomeOfferList";
import HomeProductsFirst from "../app/components/HomeProductsFirst";
import func from "../util/helpers/func"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import Head from "../app/core/Head"
import { wrapper } from "../redux/store"
import { API_URL } from "../../config"
const homePage = ({ resData = [], resProductFirst = [], resProductSeccond = [] }) => {

  const { settings } = useSelector(({ settings }) => settings);


  const homeSlider = func.getCategoriesTree(resData, "61535837020a748d51968ecc")
  const homeFirstBox = func.getCategoriesTree(resData, "61537c2d6464c09286494c63")
  const homeOfferList = func.getCategoriesTree(resData, "6154640f79053f941d1b76c9")

  const homeOfferListtitle = {
    title: resData.filter(val => val._id === "6154640f79053f941d1b76c9")?.title,
    description: resData.filter(val => val._id === "6154640f79053f941d1b76c9")?.description
  }


  return (
    <div>
      <Head />
      <Brands />
      <HomeSlider state={homeSlider} />
      <HomeProductsFirst state={resProductFirst} title={{ title: "Best Sellers", description: "Our Most Popular Products" }} />
      <HomeFirstBox state={homeFirstBox} />
      <HomeSeccoundBoxs state={resProductSeccond} title={{ title: "New Products", description: "We Added New Products For You" }} />
      <HomeOfferList state={homeOfferList} title={homeOfferListtitle} />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async ({ req, res }) => {

    const response = await axios.get(`${API_URL}/homesliderpublic`)


    const filterObjectFirst = {
      sort: { saleqty: -1 },
      limit: 10,
      skip: 0
    }

    const responseProductFirs = await axios.post(`${API_URL}/productspublic/home`, filterObjectFirst)


    const filterObjectSeccond = {
      sort: { createdAt: -1 },
      limit: 15,
      skip: 0
    }

    const responseProductSeccond = await axios.post(`${API_URL}/productspublic/home`, filterObjectSeccond)

    return {
      props: {
        resData: response.data,
        resProductFirst: responseProductFirs.data,
        resProductSeccond: responseProductSeccond.data
      }
    }

  });

export default homePage;
