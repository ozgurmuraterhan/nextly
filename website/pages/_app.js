import React from 'react';
import { wrapper } from "../redux/store";

//import 'bootstrap/dist/css/bootstrap.css';

import "../public/loader.css";
import "../public/global.scss";

import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";
import {
  settings_r,
  getBrands_r,
  getCategories_r,
  getTopmenu_r
} from "../redux/actions";

const HomeApp = props => {
  const { Component, pageProps } = props;
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


HomeApp.getInitialProps = wrapper.getInitialPageProps(store => async ({ Component, ctx }) => {

  await store.dispatch(getBrands_r())
  await store.dispatch(settings_r())
  await store.dispatch(getCategories_r())
  await store.dispatch(getTopmenu_r())

});

export default wrapper.withRedux(HomeApp);

