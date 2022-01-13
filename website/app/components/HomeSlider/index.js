import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons"
// import Swiper core and required modules
import SwiperCore, {
    Navigation, Thumbs, Autoplay
} from 'swiper';

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
import { API_URL, IMG_URL } from "../../../../config";


const Default = ({ state = [] }) => {




    useEffect(() => {
    }, [])


    return (
        <div className="position-relative float-left homeSliderReslative"  >
            <div className="position-absolute w-full  ">
                <Swiper style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                    spaceBetween={0}
                    navigation={true}
                    autoplay={{
                        "delay": 15000,
                        "disableOnInteraction": false
                    }}
                    className="w-full">
                    {state.map(val =>
                        <SwiperSlide key={val._id}>
                            <div className="item">
                                <Link href={val.link}>
                                    <a>
                                        <LazyLoadImage src={`${IMG_URL + val.image}`} style={{ maxHeight: "500px", width: "100%" }} />
                                    </a>
                                </Link>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <div style={{ clear: "both" }} />
        </div>
    );
}

export default Default;

