import React, { useEffect, useState } from "react";
import { Layout, message } from 'antd';
import CircularProgress from "../../components/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, getBasket_r } from "../../../redux/actions";

import { useRouter } from "next/router";
import AuthService from "../../../util/services/authservice";
import axios from "axios"
import func from "../../../util/helpers/func"
import CategoriesMenu from "../../components/CategoriesMenu"
import HeaderTopMenu from "../../components/HeaderTopMenu"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

axios.defaults.withCredentials = true

const { Content } = Layout;


const AppLayout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { settings, errorFetch } = useSelector(({ settings }) => settings);
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const { topmenu } = useSelector(({ topmenu }) => topmenu);
    const [isLoaded, seTisLoaded] = useState(false)

    const loginControl = () => {
        if (!isAuthenticated) {
            AuthService.isAuthenticated().then(auth => {
                if (auth.isAuthenticated) {
                    dispatch(getBasket_r(auth.user.id))
                    dispatch(login_r(auth.user));
                    dispatch(isAuthenticated_r(true));
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


    return (
        <>
            <CircularProgress className={!isLoaded ? "visible" : "hidden"} />
            <Layout >
                <div className="border-b bg-white">
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

