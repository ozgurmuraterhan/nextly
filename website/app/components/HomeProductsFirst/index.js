import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/"

const Default = ({ state = [], title = { title: "", description: "" } }) => {



    return (
        <div className="bg-gray-100 w-full ">
            <div className=" container-custom py-5 grid grid-cols-12" >
                <div className=" col-span-12 text-center mb-5 mt-3">
                    <h2>{title.title}</h2>
                    <h6>{title.description}</h6>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5   col-span-12 float-left">
                    {state && state.map(data => (
                        <div>
                            <ProductCard
                                data={data}
                                className="ounded-lg  m-5 bg-white  group hover:scale-105 transition-all  shadow-sm hover:shadow-xl pb-8"

                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Default;

