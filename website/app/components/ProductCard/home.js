import React, { useEffect, useState } from "react";
import Link from "next/link"
import func from "../../../util/helpers/func"
import { useSelector } from "react-redux";
import Price from "../Price"
import { Button } from "antd"
import { SwapRightOutlined } from "@ant-design/icons"
import { API_URL } from "../../../../config"
import Image from "next/image";

const Default = ({ data = null, className }) => {

    const { settings } = useSelector(({ settings }) => settings);
    const getVariantPrice = (data) => {
        if (data.length > 0) {
            const newData = data.sort((a, b) => { return a.price - b.price })
            return <span> <Price data={newData[0].price} />  -  <Price data={newData[data.length - 1].price} />   </span>
        }
    }

    return (

        <div
            className={className}
            key={data._id} >
            <div className=" relative float-left h-full ">
                <Link href={"/product/" + data.seo}>
                    <div className="w-full float-left">
                        <div className="w-5/12 float-left relative ">

                            <Image
                                layout='fill'

                                className="w-full bg-cover bg-center  rounded-l-lg "
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
                        <div className=" text-center  float-left w-7/12">
                            {/* <ul className="rating">
                                                <li className="fas fa-star"></li>
                                                <li className="fas fa-star"></li>
                                                <li className="fas fa-star"></li>
                                                <li className="far fa-star"></li>
                                                <li className="far fa-star"></li>
                                            </ul> 
                                        */}
                            <div className=" text-center text-md  relative  ">
                                <h3 className="w-full text-center float-left h-11 font-semibold  overflow-hidden px-1 mt-2 mb-3  "> {data.title}</h3>

                                {data.type ? getVariantPrice(data.variant_products) : <Price data={data.price} />}

                                <span className=" line-through  text-xs  w-full float-left ">
                                    {!data.type ?
                                        <>  {data.before_price != 0 ? <Price data={data.before_price} /> : ""}</>
                                        : ""}
                                </span>

                            </div>
                            <Button className="!bg-brand-color  rounded-r rounded-t-none !rounded-b-none !rounded-l   absolute bottom-0 right-0 b  group-hover:text-white group-hover:shadow-lg text-white">
                                Details
                            </Button>
                        </div>

                    </div>
                </Link>
            </div>
        </div >


    );
}

export default Default;