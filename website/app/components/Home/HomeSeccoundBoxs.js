import { Swiper, SwiperSlide } from "swiper/react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ProductCardHome from "../ProductCard/home";
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Autoplay]);
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";




const Default = ({ state = [], title = { title: "", description: "" } }) => {

	return (
		<div className="bg-gray-100 " >
			<div className=" mx-auto w-11/12 py-5 " >
				<div className="row">
					<div className=" relative  homeSliderReslative mb-3 pb-0  "    >

						<div className="  w-full   ">

							<div className=" text-center mb-5 mt-3">
								<h1>{title.title}</h1>
								<h6>{title.description}</h6>
							</div>


							<div className="home-seccound-box-arrow-left absolute top-30 -left-10 text-5xl z-50 "><LeftOutlined /></div>
							<div className="home-seccound-box-arrow-right absolute top-30  right-0 text-5xl z-50 "><RightOutlined /></div>

							<Swiper
								slidesPerView={1}
								spaceBetween={10}
								pagination={false}
								navigation={{
									prevEl: ".home-seccound-box-arrow-left",
									nextEl: ".home-seccound-box-arrow-right"
								}}
								autoplay={{
									"delay": 3500,
									"disableOnInteraction": false
								}}
								breakpoints={{
									"340": {
										"slidesPerView": 1,
										"spaceBetween": 0
									},
									"640": {
										"slidesPerView": 2,
										"spaceBetween": 0
									},
									"768": {
										"slidesPerView": 3,
										"spaceBetween": 0
									},
									"1024": {
										"slidesPerView": 4,
										"spaceBetween": 0
									}
								}}
							>
								{state && state.map(data =>
									<SwiperSlide key={data._id} className="mb-15">
										<ProductCardHome
											data={data}
											className=" float-left col-span-4  rounded-lg  m-5 mb-9 hover:bg-white  bg-gray-50  group hover:scale-105 transition-all  shadow-sm hover:shadow-xl  "
										/>
									</SwiperSlide>
								)}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>


	);
};

export default Default;

