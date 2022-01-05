import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";
import { Swiper, SwiperSlide } from "swiper/react";

import { LeftOutlined, RightOutlined } from "@ant-design/icons"

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Autoplay]);

import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/thumbs"


import { Input, Layout, message, Drawer, Modal, Form, Button, Menu } from 'antd';
import CircularProgress from "../../components/CircularProgress";
import {
    UserOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    LogoutOutlined,

} from '@ant-design/icons';

import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../../../redux/actions";

import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios"
import func from "../../../util/helpers/func"
import { API_URL } from "../../../../config";


const Default = () => {

    const [state, seTstate] = useState([])
    const [title, seTtitle] = useState("")

    const getData = async () => {
        axios.get(`${API_URL}/homesliderpublic`).then(res => {

            seTstate(func.getCategoriesTree(res.data, "6153cf1379053f941d1b747c"))

            const title = res.data.filter(val => val._id === "6153cf1379053f941d1b747c")
            seTtitle({ title: title[0].title, description: title[0].description })
        })
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="bg-gray-100" >
            <div className=" container-custom py-5 " >
                <div className="row">
                    <div className=" relative  homeSliderReslative mb-3 p-0 h-80"    >

                        <div className=" absolute w-full  ">

                            <div className=" text-center mb-5 mt-3">
                                <h2>{title.title}</h2>
                                <h6>{title.description}</h6>
                            </div>


                            <div className="home-seccound-box-arrow-left"><LeftOutlined /></div>
                            <div className="home-seccound-box-arrow-right"><RightOutlined /></div>

                            <Swiper slidesPerView={1} spaceBetween={10}
                                pagination={false}
                                navigation={true}
                                navigation={{
                                    prevEl: '.home-seccound-box-arrow-left',
                                    nextEl: '.home-seccound-box-arrow-right'
                                }}
                                autoplay={{
                                    "delay": 3500,
                                    "disableOnInteraction": false
                                }}
                                breakpoints={{
                                    "340": {
                                        "slidesPerView": 2,
                                        "spaceBetween": 15
                                    },
                                    "640": {
                                        "slidesPerView": 3,
                                        "spaceBetween": 15
                                    },
                                    "768": {
                                        "slidesPerView": 5,
                                        "spaceBetween": 15
                                    },
                                    "1024": {
                                        "slidesPerView": 6,
                                        "spaceBetween": 15
                                    }
                                }}
                            >
                                {state.map(val =>
                                    <SwiperSlide>

                                        <Link href={val.link} >
                                            <a className="itemzoom">

                                                <LazyLoadImage src={`${API_URL}/${val.image}`} className="w-full" />
                                                <div className="w-full text-center mt-3">{val.title}</div>
                                                <div className="w-full text-center my-2">{val.description}</div>

                                            </a>
                                        </Link>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Default;

