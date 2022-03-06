import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLRenderer from "react-html-renderer";
import { getBasket_r } from "../../redux/actions";
import axios from "axios";
import { API_URL } from "../../../config";


import dynamic from 'next/dynamic'

const Head = dynamic(() => import("../../app/core/Head"));
const ProductGallerry = dynamic(() => import("../../app/components/ProductDetail/Gallerry"));
const PoductVariants = dynamic(() => import("../../app/components/ProductDetail/PoductVariants"));

const Page = ({ resData = {}, seo = "" }) => {
  const { user } = useSelector(({ login }) => login);

  const state = resData[0];

  const dispatch = useDispatch();

  const getBasket = (id) => {
    if (user.id) {
      dispatch(getBasket_r(id));
    }
  };

  useEffect(() => {
    getBasket();
  }, []);

  return (
    <div className="container-custom h-full ">
      <Head
        title={state.title}
        description={state.description_short}
        keywords={state.keys}
        image={state.allImages.length > 0 ? state.allImages[0].image : ""}
      />
      <div className=" shadow-2xl bg-white  p-0 lg:p-4 grid grid-cols-12 my-0 lg:my-8  ">
        <div className=" col-span-12 lg:col-span-5  rounded-lg  ">
          <ProductGallerry images={state.allImages} />
        </div>
        <div className=" col-span-12 lg:col-span-7">
          <PoductVariants data={state} seo={seo} />
        </div>
      </div>

      <div className="w-full mt-5 mb-10 p-10 shadow-2xl bg-white h-full min-h-10  ">
        <HTMLRenderer
          html={state.description}
        // components={{
        //   h1: props => <Heading color="red" {...props} />,
        //   h2: Subheading,
        //   a: Link,
        // }}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const response = await axios.get(`${API_URL}/productspublic/${query.seo}`);
  return {
    props: {
      resData: response.data,
      seo: query.seo,
    },
  };
};

export default Page;
