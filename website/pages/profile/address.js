import React, { useEffect, useState, useContext } from "react";
import { Button, Checkbox, Form, Input, message, Row, Col, Typography, Select, Divider, Drawer } from "antd";
import Address from "../../app/components/Profile/Address"
import ProfileLeftMenu from "../../app/components/Profile/LeftMenu"

import { useIntl } from 'react-intl';
import Link from "next/link"

import { useDispatch, useSelector } from "react-redux";


import Router from 'next/router';

import axios from "axios";

const Default = () => {

  useEffect(() => {

  }, []);



  return (
    <>
      <div className="container-custom h-full grid grid-cols-12 gap-10 my-10 ">
        <div className="col-span-3">
          <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 " >Your Profile  </div>

          <div className="w-full">
            <ProfileLeftMenu />
          </div>
        </div>
        <div className="col-span-9">
          <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 " >Addresses  </div>
          <Address />
        </div>
      </div>


    </>
  );
}

export default Default;
