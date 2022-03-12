import Image from "next/image";
// import Swiper core and required modules
import SwiperCore, { Navigation, Thumbs, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs, Autoplay]);


import Link from "next/link";
import { IMG_URL } from "../../../../config";

const Default = ({ state = [], title = { title: "", description: "" } }) => {
  return (
    <div className=" container-custom py-5 ">
      <div className="w-full text-center float-left   mb-5 mt-3">
        <h2>{title.title}</h2>
        <h6>{title.description}</h6>
      </div>
      <div className=" w-full gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {state.map((val) => (
          <div key={val._id}>
            <Link href={val.link + "/"}>
              <a className="itemzoom mb-3">
                <Image
                  loader={({ src }) => src}
                  src={`${IMG_URL + val.image}`}
                  className="w-full h-full"
                  height="168"
                  width="288"
                  alt={val.title + " "}
                />
                <div className="w-full text-center mt-3">{val.title}</div>
                <div className="w-full text-center my-2 h-5">
                  {" "}
                  {val.description}{" "}
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Default;
