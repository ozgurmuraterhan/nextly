import React, { useEffect, useState, useContext } from "react";
import { Button, Checkbox, Form, Input, message, Row, Col, Typography, Select, Divider, Drawer } from "antd";
import Orders from "../../app/components/Profile/Orders"
import ProfileLeftMenu from "../../app/components/Profile/LeftMenu"

import { useIntl } from 'react-intl';
import Link from "next/link"
import Head from "../../app/core/Head"

import { useDispatch, useSelector } from "react-redux";


import Router from 'next/router';

import axios from "axios";

const Default = () => {

  useEffect(() => {

  }, []);



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
