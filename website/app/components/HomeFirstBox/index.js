import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons"
// import Swiper core and required modules
import SwiperCore, {
    Navigation, Thumbs
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

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

    const getData = async () => {
        axios.get(`${API_URL}/homesliderpublic`).then(res => {

            seTstate(func.getCategoriesTree(res.data, "61537c2d6464c09286494c63"))
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const css = [
        " w-8/12 md:w-6/12",
        " w-4/12 md:w-2/12",
        " w-full md:w-4/12",
        " w-6/12 md:w-2/12",
        " w-6/12 md:w-2/12",
        " w-full md:w-6/12",

        " w-8/12 md:w-6/12",
        " w-4/12 md:w-2/12",
        " w-full md:w-4/12",
        " w-6/12 md:w-2/12",
        " w-6/12 md:w-2/12",
        " w-full md:w-6/12",




    ]
    return (
        <div className=" container-custom my-5 py-5 "   >

            <div className="row homeFirsBoxs">
                {state.map((val, i) =>
                    <>
                        {i > 5 ?
                            <div className={" item " + css[i]}>
                                <Link href={val.link}>
                                    <a className="itemzoom" >
                                        <div className="w-100 position-relative h-100">
                                            <div className="text">
                                                {val.title}
                                            </div>
                                            <LazyLoadImage src={`${API_URL}/${val.image}`} />
                                        </div>

                                    </a>
                                </Link>
                            </div>

                            :


                            ""

                        }

                    </>
                )}




            </div>



            <div className="row homeFirsBoxs" style={{ transform: "scalex(-1)" }}>

                {state.map((val, i) =>
                    <>
                        {i < 6 ?
                            <div className={" item " + css[i]} style={{ transform: "scalex(-1)" }}>
                                <Link href={val.link}>
                                    <a className="itemzoom" >
                                        <div className="w-100 position-relative h-100">
                                            <div className="text">
                                                {val.title}
                                            </div>
                                            <LazyLoadImage src={`${API_URL}/${val.image}`} />
                                        </div>

                                    </a>
                                </Link>
                            </div>

                            :

                            ""

                        }

                    </>
                )}
            </div>


        </div>
    );
}

export default Default;

