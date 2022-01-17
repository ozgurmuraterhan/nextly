import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import router from 'next/router';


const Default = () => {

  useEffect(() => {
    router.push("/profile")
  }, []);


  return (
    <>
    </>
  )
};

export default Default;
