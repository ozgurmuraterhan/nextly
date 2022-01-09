import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';

import { Input, Layout, message, Drawer, Modal, Form, Button, Menu } from 'antd';
import CircularProgress from "../../components/CircularProgress";

import { wrapper } from "../../../redux/store"

import { useDispatch, useSelector } from "react-redux";
import {
    login_r,
    isAuthenticated_r,
    settings_r,
    logout_r,
    getBrands_r,
    getCategories_r,
    getBasket_r,
    getTopmenu_r
} from "../../../redux/actions";

import { useRouter } from "next/router";
import Link from "next/link";
import AuthService from "../../../util/services/authservice";
import axios from "axios"
import func from "../../../util/helpers/func"
import { API_URL } from "../../../../config";
import CategoriesMenu from "../../components/CategoriesMenu"
import HeaderTopMenu from "../../components/HeaderTopMenu"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

axios.defaults.withCredentials = true

const { Content } = Layout;


const AppLayout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { collapsed, settings, errorFetch } = useSelector(({ settings }) => settings);

    const { isAuthenticated, user } = useSelector(({ login }) => login);

    const { topmenu } = useSelector(({ topmenu }) => topmenu);

    const [isLoaded, seTisLoaded] = useState(false)

    const loginControl = async () => {
        if (!isAuthenticated) {
            AuthService.isAuthenticated().then(async auth => {
                if (auth.isAuthenticated) {
                    await dispatch(getBasket_r(auth.user.id))
                    await dispatch(login_r(auth.user));
                    await dispatch(isAuthenticated_r(true));
                }
            })
        }
    }

    const fetchError = () => {
        if (errorFetch) {
            message.error(errorFetch)
            seTisLoaded(false)
        } else {
            seTisLoaded(true)
        }
    }


    useEffect(() => {
        loginControl()
        fetchError()
    }, [isAuthenticated])


    return !isLoaded ? <CircularProgress /> : (
        <>
            <Layout>
                <div className="border-b-2">
                    <div className=" container-custom   ">
                        <HeaderTopMenu socialmedia={func.getCategoriesTree(topmenu, "614b8cc75c153bab76bdf681")} topmenu={func.getCategoriesTree(topmenu)} />
                        <Header />
                        <CategoriesMenu />
                    </div>
                </div>
                <Content>
                    {children}
                </Content>

                <Footer footerMenu={func.getCategoriesTree(topmenu, "6154a5a279053f941d1b786c")} />
            </Layout>
        </>
    );
}

export default AppLayout;

