import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import HTMLRenderer from 'react-html-renderer'

import { ShoppingCartOutlined } from "@ant-design/icons"
import { getBasket_r } from "../../redux/actions"
import { wrapper } from "../../redux/store"

import router from "next/router"
import axios from "axios";
import ProductGallerry from "../../app/components/ProductDetail/Gallerry"
import PoductVariantsAndAddButton from "../../app/components/ProductDetail/PoductVariantsAndAddButton"
import func from "../../util/helpers/func"

import { API_URL, PRICE_VERSION } from "../../../config"


const Page = ({ data = {} }) => {
    const { topmenu } = useSelector(({ topmenu }) => topmenu);
    const seo = router.query.seo

    const content = topmenu.find(x => x.seo == seo)
    const leftMenu = topmenu.filter(x => x.categories_id == content.categories_id)
    const leftMenuTitle = topmenu.find(x => x._id == content.categories_id)

    useEffect(() => {

    }, [])


    return (
        <div className="container-custom h-full ">
            <div className="grid shadow-lg p-4 grid-cols-12 my-8 gap-9">
                <div className=" lg:col-span-3 sm:col-span-12 sm:order-2  ">
                    <div className="text-xl font-semibold col-span-12 text-brand-color  mb-5  " >{leftMenuTitle && leftMenuTitle.title} </div>

                    {leftMenu && leftMenu.map(x =>
                        <Link href={"/content/" + x.seo}><a className="w-full py-3 border-b border-t -mt-0.1 float-left hover:pl-1  transform-all">{x.title}</a></Link>

                    )}
                </div>
                <div className=" lg:col-span-9 sm:order-2 sm:col-span-12 ">

                    <div className="text-2xl font-semibold col-span-12 text-brand-color  mb-5  " >      {content && content.title} </div>
                    <HTMLRenderer
                        html={content && content.description}
                    // components={{
                    //   h1: props => <Heading color="red" {...props} />,
                    //   h2: Subheading,
                    //   a: Link,
                    // }}
                    />

                </div>
            </div>

        </div >
    )

}


export default Page