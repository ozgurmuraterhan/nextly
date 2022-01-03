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

import { API_URL, PRICE_VERSION } from "../../config"


const Page = ({ data = {} }) => {
    const { isAuthenticated, user } = useSelector(({ login }) => login);

    const [state, seTstate] = useState(data)

    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const seo = router.query.seo

    const getProduct = () => {
        axios.get(`${API_URL}/productspublic/${seo}`).then((res) => {
            if (res.data.length > 0) {
                seTstate(res.data[0])
            }
        })
            .catch(err => console.log(err))
    }

    const getBasket = (id) => {
        dispatch(getBasket_r(id))
    }

    useEffect(() => {
        getProduct()
        getBasket(user.id)
    }, [])


    return (
        <div className="container-custom h-full ">
            <div className="grid shadow-lg p-4 grid-cols-2 my-8 gap-9">
                <div className=" border pb-3 ">
                    <ProductGallerry images={state.allImages} />
                </div>
                <div>
                    <PoductVariantsAndAddButton data={state} />
                </div>
            </div>

        </div >
    )

}


Page.getInitialProps = async ({ req, query }) => {
    const getData = await axios.get(API_URL + "/productspublic/" + query.seo);
    if (getData.data.length > 0) {
        const geTdataManipulate = getData.data[0]
        return { data: geTdataManipulate }

    } else {
        return { data: {} }

    }
}

export default Page