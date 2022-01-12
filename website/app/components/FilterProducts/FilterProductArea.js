import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { EyeOutlined, HeartOutlined, SwapRightOutlined } from "@ant-design/icons"
import { Checkbox, Input, Tag, TreeSelect, Tree, Search, Card, Button } from "antd"
import router from "next/router"
import Link from "next/link"
import Price from "../Price"
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
                    seThasMore(true)
                } else {
                    seTproducts([...products, ...res.data])
                }

            } else {
                seThasMore(false)
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
                    loader={<CircularProgress />}
                    className="grid grid-cols-12"
                >
                    {products.map(val => (
                        <div className=" lg:col-span-3 md:col-span-4 rounded-lg col-span-6 m-5 group hover:scale-105 transition-all  shadow-sm hover:shadow-2xl pb-14" key={val._id}>
                            <div className="  relative  ">
                                <Link href={"/product/" + val.seo}>
                                    <div className="w-full">
                                        <div className="w-full relative">

                                            <img
                                                className="w-full bg-cover rounded-t-lg "
                                                src="/images/transparent.png"
                                                style={{ backgroundImage: `url(${val.allImages[0] ? API_URL + val.allImages[0].image : "/images/nofoto.jpg"})` }}
                                            />

                                            <span className={`${func.getDiscount(val) ? "visible" : "invisible"} absolute z-10 top-0 mt-2 text-xs float-right py-1 px-2 bg-red-500 text-white`}>
                                                {settings.price_type ? "%" + func.getDiscount(val) : func.getDiscount(val) + "%"} discount
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
                                            <h3 className="w-full text-center font-semibold h-11 overflow-hidden px-1 mt-2 text-brand-color "> {val.title}</h3>
                                            <div className=" text-center text-lg h-12 z-10 relative ">

                                                {val.type ? getVariantPrice(val.variant_products) : <Price data={val.price} />}

                                                <span className=" line-through text-xs  w-full float-left ">
                                                    {!val.type ?
                                                        <>  {val.before_price != 0 ? <Price data={val.before_price} /> : ""}</>
                                                        : ""}
                                                </span>

                                            </div>
                                            <Button className="w-full border-0 bg-transparent font-bold rounded-lg p-0  shadow-none absolute overflow-hidden -mt-5  z-0 group-hover:mt-0 group-hover:visible invisible"  >Details <SwapRightOutlined /></Button>

                                        </div>

                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

        </>
    )

}

export default Page