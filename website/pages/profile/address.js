import React, { useEffect, useState, useContext } from "react";
import Address from "../../app/components/Profile/Address"
import ProfileLeftMenu from "../../app/components/Profile/LeftMenu"
import Head from "../../app/core/Head"
import { useSelector } from "react-redux"
import Router from "next/router"
const Default = () => {

  const { isAuthenticated } = useSelector((state) => state.login);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/")
    }
  }, []);

  return (
    <>
      <Head
        title="Address"
      />
      <div className="container-custom ">
        <div className="grid shadow-lg p-4 grid-cols-12 my-8 sm:gap-9 bg-white">
          <div className=" col-span-12 order-2 lg:order-1 lg:col-span-3 ">
            <ProfileLeftMenu />
          </div>
          <div className=" col-span-12 order-1 lg:order-2 lg:col-span-9 ">
            <div className="text-2xl font-semibold col-span-12 text-brand-color  mb-5" >Addresses  </div>
            <Address />
          </div>
        </div>
      </div>


    </>
  );
}

export default Default;
