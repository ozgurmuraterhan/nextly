import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Divider, Radio, Input, Form, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { getBasket_r } from "../../redux/actions"
import { wrapper } from "../../redux/store"

import router from "next/router"
import axios from "axios";
import ProductGallerry from "../../app/components/ProductDetail/Gallerry"
import PoductVariantsAndAddButton from "../../app/components/ProductDetail/PoductVariantsAndAddButton"
import func from "../../util/helpers/func"

import { API_URL, PRICE_VERSION } from "../../../config"


const Page = ({ resData = {} }) => {
    const { isAuthenticated, user } = useSelector(({ login }) => login);


    const [state, seTstate] = useState(resData[0])

    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const seo = router.query.seo


    const getBasket = (id) => {
        if (user.id) {
            dispatch(getBasket_r(id))
        }
    }

    useEffect(() => {
        getBasket()
    }, [])


    return (
        <div className="container-custom h-full ">
            <div className=" shadow-lg p-0 lg::p-4 grid grid-cols-12 my-0 lg:my-8 gap-2 lg:gap-9">
                <div className=" col-span-12 lg:col-span-6 border pb-3 ">
                    <ProductGallerry images={state.allImages} />
                </div>
                <div className=" col-span-12 lg:col-span-6">
                    <PoductVariantsAndAddButton data={state} />
                </div>
            </div>
        </div >
    )
}


export const getServerSideProps = async ({ req, query }) => {

    const response = await axios.get(`${API_URL}/productspublic/${query.seo}`)
    return {
        props: {
            resData: response.data
        }
    }
}

export default Page