import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, History } from "swiper";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image"
import { IMG_URL } from "../../../../config";

SwiperCore.use([Navigation, Pagination, History]);


const Default = () => {
  const { brands } = useSelector(({ brands }) => brands);

  return (
    <div className="container-custom  relative mt-4 h-28">
      <div className="position-absolute container px-xs-0">
        <div className="top-brands-arrow-left">
          <DoubleLeftOutlined />
        </div>
        <div className="top-brands-arrow-right">
          <DoubleRightOutlined />
        </div>


        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={false}

          navigation={{
            prevEl: ".top-brands-arrow-left",
            nextEl: ".top-brands-arrow-right",
          }}
          breakpoints={{
            340: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 7,
            },
            1024: {
              slidesPerView: 8,
            },
            1224: {
              slidesPerView: 10,
            },
          }}
          className="brands-slider"
        >
          {brands.map((val) => (
            <SwiperSlide key={val.title}>
              <div className="item text-center">
                <Link href={`/search?brands=${val._id}`}>
                  <a>
                    <Image
                      loader={({ src }) => src}
                      src={`${IMG_URL + val.image}`}
                      width="68"
                      height="68"
                      priority
                      alt={val.title}
                      className="mx-auto"
                    />
                    <span className="!mt-0 w-full float-left"> {val.title}</span>
                  </a>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Default;
