import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Autoplay]);
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Link from "next/link";
import { IMG_URL } from "../../../../config";

const Default = ({ state = [] }) => {
  useEffect(() => { }, []);

  return (
    <div className="position-relative float-left homeSliderReslative">
      <div className="position-absolute w-full  ">



        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          }}

          spaceBetween={0}
          navigation={true}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {state.map((val) => (
            <SwiperSlide key={val._id}>
              <div className="item">
                <Link href={val.link}>
                  <a>
                    <LazyLoadImage
                      src={`${IMG_URL + val.image}`}
                      height="500"
                      width="1680"
                      style={{ maxHeight: "500px", width: "100%" }}
                      alt={val.title + " "}
                    />
                  </a>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ clear: "both" }} />
    </div>
  );
};

export default Default;
