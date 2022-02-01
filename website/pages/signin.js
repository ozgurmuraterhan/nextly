import React, { useEffect, useState, useContext } from "react";
import { Button, Checkbox, Form, Input, message, Row, Col, Typography, Select } from "antd";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../redux/actions";

import { isAuthenticated } from "../redux/actions";
import { useIntl } from 'react-intl';
import IntlMessages from "../util/IntlMessages";
import axios from "axios"
import { API_URL } from "../../config";

import { useDispatch, useSelector } from "react-redux";


import Router from 'next/router';
import { switchLanguage } from "../redux/actions";
import { languageData } from "../../config"
import LoginForm from "../app/components/Header/LoginForm"
import RegisterForm from "../app/components/Header/RegisterForm"

import AuthService from "../util/services/authservice";

const SignInPage = () => {

  const intl = useIntl();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);
  const { locale } = useSelector(({ settings }) => settings);


  useEffect(() => {

    if (isAuthenticated) {
      return Router.push("/")
    }

  }, [isAuthenticated]);


  const onSubmitSignup = (Data) => {

    axios.post(`${API_URL}/users/register`, Data).then(res => {
      if (res.data.error) {
        message.error(res.data.messagge)
      } else {
        form.resetFields();
        message.success(res.data.messagge)
        onSubmitLogin(Data)

      }
    })
      .catch(err => console.log("err", err))
  }

  const handleCancelLogin = () => {

  }

  const onSubmitLogin = (Data) => {

    AuthService.login(Data).then((data) => {

      const { isAuthenticated, user } = data;

      if (isAuthenticated) {
        dispatch(login_r(user));
        dispatch(isAuthenticated_r(true));
        Router.push("/")
        message.success("Login Successfully");
        handleCancelLogin()
      } else {
        message.error("Login not Successfully");
      }
    });
  };

  return (
    <>
      <div className="grid container-custom gap-10 p-20 grid-cols-12">

        <div className="col-span-6">
          <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 " >Login  </div>
          <LoginForm onSubmitLogin={onSubmitLogin} handleCancelLogin={handleCancelLogin} />
        </div>

        <div className="col-span-6">
          <div className="text-lg font-semibold col-span-12 text-brand-color  mb-5 " >Register </div>
          <RegisterForm onSubmitSignup={onSubmitSignup} />

        </div>
      </div>



    </>
  );
}

export default SignInPage;
