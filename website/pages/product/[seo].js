import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HTMLRenderer from "react-html-renderer";
import { getBasket_r } from "../../redux/actions";
import Head from "../../app/core/Head";
import axios from "axios";
import ProductGallerry from "../../app/components/ProductDetail/Gallerry";
import PoductVariants from "../../app/components/ProductDetail/PoductVariants";

import { API_URL } from "../../../config";

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
        <div className=" col-span-12 lg:col-span-6 border rounded-lg pb-3 ">
          <ProductGallerry images={state.allImages} />
        </div>
        <div className=" col-span-12 lg:col-span-6">
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
