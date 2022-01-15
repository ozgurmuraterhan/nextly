import React, { useEffect, useState } from "react";
import Link from "next/link"
import func from "../../../util/helpers/func"
import { useSelector } from "react-redux";
import Price from "../Price"
import { Button } from "antd"
import { SwapRightOutlined } from "@ant-design/icons"
import { API_URL } from "../../../../config"

const Default = ({ data = null }) => {

    const { settings } = useSelector(({ settings }) => settings);
    const getVariantPrice = (data) => {
        if (data.length > 0) {
            const newData = data.sort((a, b) => { return a.price - b.price })
            return <span> <Price data={newData[0].price} />  -  <Price data={newData[data.length - 1].price} />   </span>
        }
    }

    return (

        <div
            className=" lg:col-span-3 md:col-span-4 rounded-lg col-span-6 m-5 bg-white  group hover:scale-105 transition-all  shadow-sm hover:shadow-xl pb-8"
            key={data._id} >
            <div className="  relative  ">
                <Link href={"/product/" + data.seo}>
                    <div className="w-full">
                        <div className="w-full relative">

                            <img
                                className="w-full bg-cover rounded-t-lg "
                                src="/images/transparent.png"
                                style={{ backgroundImage: `url(${data.allImages[0] ? API_URL + data.allImages[0].image : "/images/nofoto.jpg"})` }}
                            />

                            <span className={`${func.getDiscount(data) ? "visible" : "invisible"} absolute z-10 top-0 mt-2 text-xs float-right py-1 px-2 bg-red-500 text-white`}>
                                {settings.price_type ? "%" + func.getDiscount(data) : func.getDiscount(data) + "%"} discount
                            </span>
                            <ul className="product-links">
                                {/* <li><a href="#" data-tip="Add to Wishlist"><HeartOutlined /></a></li> 
                                              <li><a href="#" data-tip="Quick View"><EyeOutlined /></a></li>
                                            */}
                            </ul>
                        </div>
                        <div className="mt-2 w-full">
                            {/* <ul className="rating">
                                                <li className="fas fa-star"></li>
                                                <li className="fas fa-star"></li>
                                                <li className="fas fa-star"></li>
                                                <li className="far fa-star"></li>
                                                <li className="far fa-star"></li>
                                            </ul> 
                                        */}
                            <h3 className="w-full text-center font-semibold h-11 overflow-hidden px-1 mt-2 text-brand-color "> {data.title}</h3>
                            <div className=" text-center text-lg h-12 z-10 relative ">

                                {data.type ? getVariantPrice(data.variant_products) : <Price data={data.price} />}

                                <span className=" line-through text-xs  w-full float-left ">
                                    {!data.type ?
                                        <>  {data.before_price != 0 ? <Price data={data.before_price} /> : ""}</>
                                        : ""}
                                </span>

                            </div>
                            <Button className="w-full border-0 bg-transparent font-bold rounded-lg p-0  shadow-none absolute overflow-hidden -mt-5  z-0 group-hover:mt-0 group-hover:visible group-hover:text-brand-color invisible"  >Details <SwapRightOutlined /></Button>

                        </div>

                    </div>
                </Link>
            </div>
        </div >


    );
}

export default Default;