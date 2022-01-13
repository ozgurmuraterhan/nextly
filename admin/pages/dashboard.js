import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import { Divider, Avatar, Timeline } from "antd"
import CircularProgress from "../app/components/CircularProgress";
import Clock from "../app/components/Clock";
import axios from "axios"
import { API_URL, IMG_URL } from '../../config';

import { useSelector } from "react-redux";

const Orders = dynamic(() => import('./orders/list'), {
  loading: () => <CircularProgress />,
});

const Counts = dynamic(() => import('../app/components/Dashboard/counts'), {
  loading: () => <CircularProgress />,
});


import { DollarCircleOutlined, UsergroupAddOutlined, CodeSandboxOutlined, OrderedListOutlined, UserOutlined } from "@ant-design/icons"



const CrmDashboard = () => {

  const { user } = useSelector(({ login }) => login);
  useEffect(() => {
  }, []);


  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="dashboardProfile">
        <Avatar size={180} src={IMG_URL + user.image} icon={<UserOutlined />} className="border   mt-5 mb-3" />
        <h4 >{user.name}</h4>
        <Clock />
      </div>
      <div className="grid mb-5  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Counts />
      </div>
      <div className="grid  ">
        <Divider />


        <Orders />
      </div>
    </React.Fragment>
  )
};

export default CrmDashboard;
