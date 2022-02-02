import React, { useState, useEffect } from "react";
import { Menu } from 'antd';
import { useSelector } from "react-redux";
import Link from "next/link";
import func from "../../../util/helpers/func"

const Page = () => {
    const { categories } = useSelector(({ categories }) => categories);
    const [categoriesData, seTcategoriesData] = useState([])

    useEffect(() => {
        const menuData = func.getCategoriesTreeOptions(categories, true)
        seTcategoriesData(menuData)
    }, []);

    return (
        <>
            {categoriesData?.length > 0 ?
                <Menu mode="horizontal" className=" block" >
                    {categoriesData?.map((val, i) => (
                        <React.Fragment key={val.title + val._id}>
                            {val.children ?
                                <Menu.SubMenu className="border-0 uppercase !font-semibold " key={val.title + val._id} title={val.title}>
                                    {
                                        val?.children.map(val2 => (
                                            <React.Fragment key={val2.title + val2._id}>
                                                {val2.children ?
                                                    <Menu.SubMenu className=" font-bold" key={val2.title} title={val2.title}>
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
                : ""}</>
    );
}



export default Page;

