import React, { useEffect } from "react";
import Orders from "../../app/components/Profile/Orders"
import ProfileLeftMenu from "../../app/components/Profile/LeftMenu"
import Head from "../../app/core/Head"

const Default = () => {

  return (
    <>

      <Head
        title="Orders"
      />
      <div className="container-custom h-full grid grid-cols-12 gap-10 my-10 ">
        <div className=" col-span-12 order-2 lg:order-1 lg:col-span-3 ">
          <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 " >Your Profile  </div>
          <ProfileLeftMenu />
        </div>
        <div className=" col-span-12 order-1 lg:order-2 lg:col-span-9 ">

          <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 " >Orders  </div>
          <Orders />
        </div>
      </div>


    </>
  );
}

export default Default;
