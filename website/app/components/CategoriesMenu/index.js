import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";

import { Input, Layout, message, Drawer, Modal, Form, Button, Menu } from 'antd';
import {
    UserOutlined,
    ShoppingCartOutlined,
    LoginOutlined,
    LogoutOutlined,

} from '@ant-design/icons';

import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../../../redux/actions";

import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios"
import func from "../../../util/helpers/func"
import { API_URL } from "../../../config";




const Default = () => {

    const dispatch = useDispatch();
    const { collapsed, settings, errorFetch } = useSelector(({ settings }) => settings);
    const { categories } = useSelector(({ categories }) => categories);
    const categoriesData = func.getCategoriesTreeOptions(categories, true)

    useEffect(() => {

    }, [])



    return (
        <Menu mode="horizontal" className=" block" >
            {categoriesData.map((val, i) => (
                <React.Fragment key={val.title + val._id}>
                    {val.children ?
                        <Menu.SubMenu className="border-0 " key={val.title + val._id} title={val.title}>
                            {
                                val?.children.map(val2 => (
                                    <React.Fragment key={val2.title + val2._id}>
                                        {val2.children ?
                                            <Menu.SubMenu className=" " key={val2.title} title={val2.title}>
                                                {
                                                    val2?.children.map(val3 => (
                                                        <Menu.Item key={val3.title + val3._id} className="h-25">
                                                            <Link href={"/search?categories=" + val3._id}>
                                                                <a className="  ">{val3.title}</a>
                                                            </Link>
                                                        </Menu.Item>
                                                    ))
                                                }
                                            </Menu.SubMenu>
                                            :
                                            <Menu.Item key={val2.title + val2._id}>
                                                <Link href={"/search?categories=" + val2._id}>
                                                    <a className=" ">{val2.title}</a>
                                                </Link>
                                            </Menu.Item>
                                        }
                                    </React.Fragment >
                                ))
                            }
                        </Menu.SubMenu>
                        :
                        <Menu.Item key={val.title + val._id}>
                            <Link href={"/search?categories=" + val._id}>
                                <a className=" text-muted">{val.title}</a>
                            </Link>
                        </Menu.Item>
                    }
                </React.Fragment >
            ))}
        </Menu>

    );
}



export default Default;

