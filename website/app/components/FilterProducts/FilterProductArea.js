import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { EyeOutlined, HeartOutlined } from "@ant-design/icons"
import { Checkbox, Input, Tag, TreeSelect, Tree, Search, Card } from "antd"
import router from "next/router"
import Link from "next/link"
import Price from "../Price"
import func from "../../../util/helpers/func"
import filterRouteLinkGenerate from "./filterRouterLink";
import axios from "axios"
import { filterProducts_r } from "../../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "../../components/CircularProgress"

import { API_URL } from "../../../config"


const Page = () => {

    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
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
            return <b> <Price data={newData[0].price} />  -  <Price data={newData[data.length - 1].price} />  </b>
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
            <div className="container" >
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<CircularProgress />}
                    className="row"
                >
                    {products.map(val => (
                        <div className=" w-3/12 float-left p-3" key={products._id}>
                            <Link href={"/product/" + val.seo}>
                                <div className="product-grid">
                                    <div className="product-image">
                                        <a href="#" className="image">
                                            <img className="pic-1" src="/images/transparent.png" style={{ backgroundImage: `url(${val.allImages[0] ? API_URL + val.allImages[0].image : "/images/nofoto.jpg"})` }} />
                                        </a>
                                        {/* <span className="product-discount-label">-33%</span> */}
                                        <ul className="product-links">
                                            {/* <li><a href="#" data-tip="Add to Wishlist"><HeartOutlined /></a></li> 
                                        <li><a href="#" data-tip="Quick View"><EyeOutlined /></a></li>
                                        */}
                                        </ul>
                                    </div>
                                    <div className="product-content">
                                        {/* <ul className="rating">
                                        <li className="fas fa-star"></li>
                                        <li className="fas fa-star"></li>
                                        <li className="fas fa-star"></li>
                                        <li className="far fa-star"></li>
                                        <li className="far fa-star"></li>
                                    </ul> */}
                                        <h3 className="title"><a href="#">{val.title}</a></h3>
                                        <div className="price h-10">
                                            <span className="text-sm w-full float-left -mb-1">
                                                {!val.type ?
                                                    <>  {val.before_price != 0 ? <Price data={val.before_price} /> : ""}</>
                                                    : ""}
                                            </span>

                                            {val.type ? getVariantPrice(val.variant_products) : <Price data={val.price} />}
                                        </div>
                                        <a className="add-to-cart" href="#">add to cart</a>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

        </>
    )

}

export default Page