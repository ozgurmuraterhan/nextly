import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactImageZoom from 'react-image-zoom';

// import Swiper core and required modules
import SwiperCore, {
    Navigation, Thumbs, Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Autoplay]);

import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/thumbs"


import { API_URL } from "../../../config";


const Default = ({ images = [] }) => {

    const [state, seTstate] = useState(images)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
    }, [])


    return (
        <>
            <Swiper style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                autoplay={{
                    "delay": 15000,
                    "disableOnInteraction": false
                }}
                className="w-full mb-4">
                {state.map(val =>
                    <SwiperSlide key={val.image}>
                        <div className="item">
                            <div
                                className="  bg-contain bg-no-repeat bg-center w-full"
                                style={{ height: "600px", backgroundImage: "url(" + API_URL + "/" + val.image + ")" }}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={10}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper"
            >
                {state.map(val =>
                    <SwiperSlide>
                        <div className="item">
                            <div
                                className="bg-cover bg-center w-full border"
                                style={{ height: "50px", backgroundImage: "url(" + API_URL + "/" + val.image + ")" }}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}

export default Default;

