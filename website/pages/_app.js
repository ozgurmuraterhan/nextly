import React from 'react';
import Head from 'next/head'
import App from 'next/app'
import withRedux from 'next-redux-wrapper';

//import 'bootstrap/dist/css/bootstrap.css';

import "../public/loader.css";
import "../public/global.scss";

import initStore from '../redux/store';
import { Provider } from "react-redux";
import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";

const Page = ({ Component, pageProps, store }) => {
  return (
    <React.Fragment>
      <Head>
        <title> Nextly</title>
      </Head>
      <Provider store={store}>
        <LocaleProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </LocaleProvider>
      </Provider>
    </React.Fragment>
  );
};
Page.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}
export default withRedux(initStore)(Page);
