import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { LeftOutlined, RightOutlined } from "@ant-design/icons"

// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from 'swiper';

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
import { API_URL } from "../../../config";


const Default = () => {

    const [state, seTstate] = useState([])
    const [title, seTtitle] = useState({})

    const getData = async () => {
        axios.get(`${API_URL}/homesliderpublic`).then(res => {

            seTstate(func.getCategoriesTree(res.data, "6154640f79053f941d1b76c9"))

            const title = res.data.filter(val => val._id === "6154640f79053f941d1b76c9")
            seTtitle({ title: title[0].title, description: title[0].description })
        })
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className=" container-custom py-5 " >
            <div className="w-full text-center float-left   mb-5 mt-3">
                <h2>{title.title}</h2>
                <h6>{title.description}</h6>
            </div>
            <div className=" w-full gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {state.map(val =>
                    <div>

                        <Link href={val.link} >
                            <a className="itemzoom mb-3">

                                <LazyLoadImage src={`${API_URL}/${val.image}`} className="w-full" />
                                <div className="w-full text-center mt-3">{val.title}</div>
                                <div className="w-full text-center my-2 h-5"> {val.description} </div>

                            </a>
                        </Link>
                    </div>
                )}
            </div>


        </div>


    );
}

export default Default;
