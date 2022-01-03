
import { useState, useEffect } from "react";

import AuthService from "../../../util/services/authservice";
import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../../../redux/actions";
import { Input, Drawer, Modal, Form, Button, message } from "antd"

import Link from "next/link";
import Router from "next/router";

import IntlMessages from "../../../util/IntlMessages";

import {
    UserOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    LogoutOutlined,

} from '@ant-design/icons';
import { API_URL } from "../../../config";

const Default = () => {
    const { collapsed, settings, errorFetch } = useSelector(({ settings }) => settings);
    const { basket } = useSelector((state) => state.basket);

    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const [openDrewer, seTopenDrewer] = useState(false)
    const [openModal, seTopenModal] = useState(false)
    const [confirmLoading, seTconfirmLoading] = useState(false);

    const dispatch = useDispatch();

    const showModal = () => {
        seTopenModal(true);
    };

    const handleOk = () => {
        seTconfirmLoading(true)
    };

    const handleCancel = () => {
        seTopenModal(false);
    };


    const onSubmit = (Data) => {


        AuthService.login(Data).then((data) => {

            const { isAuthenticated, user } = data;

            if (isAuthenticated) {
                dispatch(login_r(user));
                dispatch(isAuthenticated_r(true));
                message.success("Login Successfully");
                handleCancel()
            } else {
                message.error("Login not Successfully");
            }
        });
    };


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
                            await dispatch(logout_r());
                            await AuthService.logout()
                        }}>
                            <LogoutOutlined />
                            <span className="hidden md:inline  "> Logout </span>
                        </a>
                    </>
                    :

                    <a className="p-2 float-left" onClick={showModal}>
                        <LoginOutlined />   <span className="hidden md:inline ">Login</span>
                    </a>
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
                visible={openModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    onFinish={onSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        rules={[{ required: true, message: <IntlMessages id="app.userAuth.The input is not valid E-mail!" /> }]}
                        name="username"
                        label={<IntlMessages id="app.userAuth.E-mail" />}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: <IntlMessages id="app.userAuth.Please input your Password!" /> }]}
                        name="password"
                        label={<IntlMessages id="app.userAuth.Password" />}
                    >
                        <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="mb-0 w-full" size="large" htmlType="submit">
                            <IntlMessages id="app.userAuth.signIn" />
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="link" className="float-left w-full mb-4" onClick={() => console.log("forgot password")}>
                    Forgot Password
                </Button>
                <div className="mt-5"></div>
            </Modal>
        </div >
    )
}

export default Default;
