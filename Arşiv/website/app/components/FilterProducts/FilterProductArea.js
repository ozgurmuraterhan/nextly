import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { EyeOutlined, HeartOutlined, SwapRightOutlined } from "@ant-design/icons"
import { Checkbox, Input, Tag, TreeSelect, Tree, Search, Card, Button } from "antd"
import router from "next/router"
import Link from "next/link"
import Price from "../Price"
import ProductCard from "../ProductCard"
import func from "../../../util/helpers/func"
import filterRouteLinkGenerate from "./filterRouterLink";
import axios from "axios"
import { filterProducts_r } from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "../../components/CircularProgress"

import { API_URL } from "../../../../config"


const Page = () => {

    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const { settings } = useSelector(({ settings }) => settings);

    const [products, seTproducts] = useState([])
    const [hasMore, seThasMore] = useState(true)
    const dispatch = useDispatch();


    const getProducts = () => {
        axios.post(`${API_URL}/productspublic`, filterProducts).then((res) => {

            if (res.data.length > 0) {
                // seTproducts([...products, ...res.data])
                if (filterProducts.skip == 0) {
                    seTproducts(res.data)
                } else {
                    seTproducts([...products, ...res.data])
                }
                seThasMore(true)
            } else {
                seThasMore(false)
            }

            if (res.data.length == 0 && filterProducts.skip == 0) {
                seTproducts([])
            }



        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProducts()
    }, [filterProducts])

    const getVariantPrice = (data) => {
        if (data.length > 0) {
            const newData = data.sort((a, b) => { return a.price - b.price })
            return <span> <Price data={newData[0].price} />  -  <Price data={newData[data.length - 1].price} />   </span>
        }
    }

    const fetchMoreData = () => {
        dispatch(filterProducts_r({
            ...filterProducts,
            skip: filterProducts.skip + filterProducts.limit,
            limit: filterProducts.limit
        }))
        filterRouteLinkGenerate({
            ...filterProducts,
            skip: filterProducts.skip + filterProducts.limit,
            limit: filterProducts.limit
        })
    }
    return (
        <>
            <div className="container " >
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<div className="col-span-12  "><CircularProgress /></div>}
                    className="grid grid-cols-12"
                >
                    {products && products.map(data => (
                        <ProductCard
                            data={data}
                            className="lg:col-span-3 md:col-span-4 rounded-lg col-span-6 m-5 bg-white  group hover:scale-105 transition-all  shadow-sm hover:shadow-xl pb-8"
                        />
                    ))}

                </InfiniteScroll>
            </div>

        </>
    )

}

export default Page