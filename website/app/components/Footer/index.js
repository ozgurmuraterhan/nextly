
import { useState, useEffect } from "react";

import AuthService from "../../../util/services/authservice";
import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../../../redux/actions";
import { Input, Drawer, Modal, Form, Button, message, Divider } from "antd"
import axios from "axios"
import func from "../../../util/helpers/func"
import Link from "next/link";

import IntlMessages from "../../../util/IntlMessages";

import {
    UserOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    LogoutOutlined,

} from '@ant-design/icons';
import { API_URL } from "../../../../config";

const Default = ({ footerMenu }) => {


    const { settings } = useSelector(({ settings }) => settings);


    return (
        <div className="bg-black py-10">
            <div className=" container-custom">
                <ul className=" grid grid-cols-2 md:grid-cols-4   ">
                    {footerMenu && footerMenu.map(val => (
                        <li key={val.title} className="mt-2">
                            {!val.children ?
                                <Link href={val.link ? val.link : val.seo}>
                                    <a className="text-white text-2xl">{val.title}</a>
                                </Link>
                                :
                                <>
                                    <Link href="#" className="text-white">
                                        <a className="text-white text-2xl">{val.title}</a>
                                    </Link>
                                    <ul key={val.title}>
                                        {val?.children.map(val2 => (
                                            <li key={val2.title} className=" my-2">
                                                {!val2.children ?
                                                    <Link href={val2.link ? val2.link : val2.seo}>
                                                        <a className="text-white">{val2.title}</a>
                                                    </Link>
                                                    :
                                                    <>
                                                        <Link href="#">
                                                            <a className="text-white ">{val2.title}</a>
                                                        </Link>
                                                        <ul key={val2.title}>
                                                            {val2?.children.map(val3 => (
                                                                <li key={val3.title} >
                                                                    <Link href={val3.link ? val3.link : val3.seo}>
                                                                        <a className="text-white ">{val3.title}</a>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                }

                                            </li>
                                        ))}
                                    </ul>
                                </>
                            }
                        </li>
                    ))}
                </ul>
                <Divider />
                <div className="  grid grid-cols-1 ">
                    <div className=" text-white  grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6">
                        {
                            settings.address ?
                                settings.address.map(val =>
                                    <div key={val.name}>
                                        <h5 className="text-xl text-white mt-2">{val.name}</h5>
                                        <div className="mb-2">{val.value}</div>
                                    </div>
                                )
                                : ""}

                        {
                            settings.phone ?
                                settings.phone.map(val =>
                                    <div key={val.name}>
                                        <h5 className="text-xl text-white mt-2">{val.name}</h5>
                                        <div className="mb-2  text-white">{val.value}</div>
                                    </div>
                                )
                                : ""}
                        {
                            settings.email ?
                                settings.email.map(val =>
                                    <div key={val.name}>
                                        <h5 className="text-xl text-white mt-2">{val.name}</h5>
                                        <div className="mb-2  text-white">{val.value}</div>
                                    </div>
                                )
                                : ""}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Default;
