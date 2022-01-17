import React from 'react';
import App from 'next/app'
import { wrapper } from "../redux/store";

//import 'bootstrap/dist/css/bootstrap.css';

import "../public/loader.css";
import "../public/global.scss";

import initStore from '../redux/store';
import { Provider } from "react-redux";
import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";
import { API_URL } from '../../config';
import {
  login_r,
  isAuthenticated_r,
  settings_r,
  logout_r,
  getBrands_r,
  getCategories_r,
  getBasket_r,
  getTopmenu_r
} from "../redux/actions";

class HomeApp extends App {

  static getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
    await store.dispatch(getBrands_r())
    await store.dispatch(settings_r())
    await store.dispatch(getCategories_r())
    await store.dispatch(getTopmenu_r())
  });


  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <LocaleProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </LocaleProvider>
      </React.Fragment>
    );
  }
}

export default wrapper.withRedux(HomeApp)