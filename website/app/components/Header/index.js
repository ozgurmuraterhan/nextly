
import { useState, useEffect } from "react";

import AuthService from "../../../util/services/authservice";
import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../../../redux/actions";
import { Input, Drawer, Modal, Form, Button, message, Select, Divider } from "antd"
import { useIntl } from 'react-intl';

import router from "next/router"
import Link from "next/link";
import Router from "next/router";
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import IntlMessages from "../../../util/IntlMessages";

import {
    UserOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined

} from '@ant-design/icons';
import { API_URL } from "../../../../config";
import axios from "axios";

const Default = () => {

    const intl = useIntl();
    const [form] = Form.useForm();

    const { collapsed, settings, errorFetch } = useSelector(({ settings }) => settings);
    const { basket } = useSelector((state) => state.basket);

    const { isAuthenticated, user } = useSelector(({ login }) => login);

    const [openModalLogin, seTopenModalLogin] = useState(false)
    const [confirmLoadingLogin, seTconfirmLoadingLogin] = useState(false);


    const [openModalSignup, seTopenModalSignup] = useState(false)
    const [confirmLoadingSignup, seTconfirmLoadingSignup] = useState(false);

    const dispatch = useDispatch();

    const showModalLogin = () => {
        seTopenModalLogin(true);
    };

    const handleOkLogin = () => {
        seTconfirmLoadingLogin(true)
    };

    const handleCancelLogin = () => {
        seTopenModalLogin(false);
    };


    const showModalSignup = () => {
        seTopenModalSignup(true);
    };

    const handleOkSignup = () => {
        seTconfirmLoadingSignup(true)
    };

    const handleCancelSignup = () => {
        seTopenModalSignup(false);
    };

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

    const onSubmitLogin = (Data) => {

        AuthService.login(Data).then((data) => {

            const { isAuthenticated, user } = data;

            if (isAuthenticated) {
                dispatch(login_r(user));
                dispatch(isAuthenticated_r(true));
                message.success("Login Successfully");
                handleCancelLogin()
                seTopenModalSignup(false);
            } else {
                message.error("Login not Successfully");
            }
        });
    };


    useEffect(() => {

    }, [isAuthenticated])



    return (
        <div className="w-full flex justify-between mb-6  ">
            <div className=" w-3/12 mr-3 md:w-2/12 md:mr-0  mt-4 md:mt-2 lg:mt-3" >
                <a href="/" >
                    <img src={`${API_URL + settings.image}`} className=" w-full sm:w-10/12 mt-3 sm:mt-0" />
                </a>
            </div>
            <div className=" flex-auto  w-3/12 mr-3 md:w-auto md:mr-0    mt-6  px-0 sm:px-12">
                <Input.Search
                    size="middle"
                    placeholder="Search..."
                    enterButton
                    onSearch={(val) => {
                        console.log(val)
                    }} />
            </div>
            <div className=" mt-5   text-base text-right px-0  ">

                {isAuthenticated ?
                    <>
                        <Link href="/profile">
                            <a className="p-2 float-left">
                                <UserOutlined />
                                <span className="hidden md:inline "> Profile</span>
                            </a>
                        </Link>
                        <a className="p-2 float-left" onClick={async () => {
                            await AuthService.logout()
                            await dispatch(logout_r());
                            router.push("/")

                        }}>
                            <LogoutOutlined />
                            <span className="hidden md:inline  "> Logout </span>
                        </a>
                    </>
                    :
                    <>
                        <a className="p-2 float-left" onClick={showModalLogin}>
                            <LoginOutlined />   <span className="hidden md:inline ">Login</span>
                        </a>
                        <a className="p-2 float-left" onClick={showModalSignup}>
                            <UserAddOutlined />   <span className="hidden md:inline ">Sign Up</span>

                        </a>
                    </>
                }
                <Link href="/basket">
                    <a className="p-2 float-left"  >
                        {basket.length > 0 ?
                            <div className="relative float-left w-0 h-full pt-0.5 pl-0.5 -mr-0.5">
                                {basket[0].products.length > 0 ?
                                    <>
                                        <div className="  rounded-full  bg-black  absolute w-1 animate-ping h-1 -ml-1 mt-2" />
                                        <div className=" rounded-full  bg-black absolute w-1 h-1 -ml-1 mt-2  opacity-50" />
                                    </>
                                    : ""}
                            </div>
                            : ""}

                        <ShoppingCartOutlined />

                        <span className="hidden md:inline "> Basket</span>

                    </a>
                </Link>
            </div >

            <Modal
                title="Login"
                visible={openModalLogin}
                onOk={handleOkLogin}
                confirmLoading={confirmLoadingLogin}
                onCancel={handleCancelLogin}
                footer={null}

            >
                <LoginForm onSubmitLogin={onSubmitLogin} handleCancelLogin={handleCancelLogin} />
            </Modal>

            <Modal
                title="Signup"
                visible={openModalSignup}
                onOk={handleOkSignup}
                confirmLoading={confirmLoadingSignup}
                onCancel={handleCancelSignup}
                footer={null}

            >
                <RegisterForm onSubmitSignup={onSubmitSignup} />
            </Modal>
        </div >
    )
}

export default Default;
