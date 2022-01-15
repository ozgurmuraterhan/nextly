import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard"

const Default = ({ state = [], title = { title: "", description: "" } }) => {



    return (
        <div className=" container-custom py-5 grid grid-cols-12" >

            <div className=" col-span-12 text-center mb-5 mt-3">
                <h2>{title.title}</h2>
                <h6>{title.description}</h6>
            </div>

            {state && state.map(data => (
                <ProductCard data={data} />

            ))}
        </div>


    );
}

export default Default;

