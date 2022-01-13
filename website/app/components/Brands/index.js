import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, History } from 'swiper';
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons"


SwiperCore.use([Navigation, Pagination, History]);

import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"



import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { API_URL, IMG_URL } from "../../../../config";




const Default = () => {

    const dispatch = useDispatch();
    const { brands } = useSelector(({ brands }) => brands);

    return (
        <div className="container-custom  relative  mt-3 h-28">
            <div className="position-absolute container px-xs-0">
                <div className="top-brands-arrow-left"><DoubleLeftOutlined /></div>
                <div className="top-brands-arrow-right"><DoubleRightOutlined /></div>
                <Swiper slidesPerView={1} spaceBetween={10}
                    pagination={false}
                    navigation={true}
                    navigation={{
                        prevEl: '.top-brands-arrow-left',
                        nextEl: '.top-brands-arrow-right'
                    }}
                    breakpoints={{
                        "340": {
                            "slidesPerView": 4,
                        },
                        "640": {
                            "slidesPerView": 4,
                        },
                        "768": {
                            "slidesPerView": 7,
                        },
                        "1024": {
                            "slidesPerView": 10,
                        },
                        "1224": {
                            "slidesPerView": 10,
                        }
                    }}
                    className="brands-slider">
                    {brands.map(val =>
                        <SwiperSlide key={val.title}>
                            <div className="item">
                                <Link href={`/search?brands=${val._id}`}>
                                    <a>
                                        <img src={`${IMG_URL + val.image}`} />
                                        <span> {val.title}</span>
                                    </a>
                                </Link>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>

    );
}



export default Default;

