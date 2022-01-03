import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Divider, Radio, Input, Form, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import router from "next/router"
import axios from "axios";
import BasketList from "../../app/components/Basket/BasketList"
import BasketDetailPrice from "../../app/components/Basket/BasketDetailPrice"
import func from "../../util/helpers/func"

import { API_URL, PRICE_VERSION } from "../../config"


const Page = ({ data = {} }) => {
    const { basket } = useSelector(({ basket }) => basket);
    const [state, seTstate] = useState(data)
    const [disabledVariant, seTdisabledVariant] = useState(true)
    const [priceAdd, seTpriceAdd] = useState({ before_price: 0, price: 0, qty: 1 })

    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const seo = router.query.seo



    useEffect(() => {
    }, [])


    return (
        <div className="container-custom h-full grid grid-cols-12 ">
            <div className="col-span-9 shadow-lg m-4 grid-cols-2 my-8 gap-9">
                <BasketList />
            </div>
            <div className="col-span-3 shadow-lg m-4 grid-cols-2 my-8 gap-9">
                <BasketDetailPrice />
            </div>
        </div>
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