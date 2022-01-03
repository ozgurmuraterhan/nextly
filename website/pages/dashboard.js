import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import { Divider, Avatar, Timeline } from "antd"
import axios from "axios"
import { API_URL } from '../config';

import { useSelector } from "react-redux";

// const Orders = dynamic(() => import('./orders/list'), {
//   loading: () => <div>s</div>
// });


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
      <div>
        asdas
      </div>

    </React.Fragment>
  )
};

export default CrmDashboard;
