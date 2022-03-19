import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, History } from "swiper";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Link from "next/link";
import { IMG_URL } from "../../../../config";

SwiperCore.use([Navigation, Pagination, History]);


const Default = () => {
   const { brands } = useSelector(({ brands }) => brands);

   return (
      <div className="container-custom  relative mt-4 h-28">
         <div className="position-absolute container px-xs-0">

            <div className="top-brands-arrow-left left-0 h-full w-4 z-10 cursor-pointer top-5 absolute  " >
               <DoubleLeftOutlined />
            </div>

            <div className="top-brands-arrow-right  absolute right-0 h-full w-4 z-10 cursor-pointer top-5 ">
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
               className=" flex overflow-x-auto"
            >

               {brands.map((val) => (
                  <SwiperSlide key={val.title}>


                     <div className=" flex-row-reverse items-center text-center">
                        <Link href={`/search?brands=${val._id}`}>
                           <a>

                              <img
                                 src={`${IMG_URL + val.image}`}
                                 width="70"
                                 height="70"
                                 priority
                                 alt={val.title}
                                 style={{ width: "70px" }}

                                 className="mx-auto border-brand-color border box-border rounded-full  block border-solid  "
                              />
                              <span className="  w-full float-left text-xs mt-2"> {val.title}</span>
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
