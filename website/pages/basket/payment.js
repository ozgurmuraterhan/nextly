import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Divider, Radio, Input, Form, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import router from "next/router"
import axios from "axios";
import BasketList from "../../app/components/Basket/BasketList"
import BasketDetailPricePay from "../../app/components/Basket/BasketDetailPricePay"
import func from "../../util/helpers/func"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeComponent from "../../app/components/Stripe";
import { API_URL } from "../../../config"


const Page = ({ data = {} }) => {
    const { basket } = useSelector(({ basket }) => basket);
    const [selectPayment, seTselectPayment] = useState(1)
    const [public_key, seTpublic_key] = useState("")
    const [contract, seTcontract] = useState("")

    const getPaymentMethodStripe = () => {
        axios.get(`${API_URL}/paymentmethodspublic/6132787ae4c2740b7aff7320`).then(res => {
            seTpublic_key(res.data[0].public_key)
            seTcontract(res.data[0].contract)
        })
    }
    useEffect(() => {
        getPaymentMethodStripe()
    }, [basket[0], public_key])



    return (
        <div className="container-custom h-full grid grid-cols-12 ">
            <div className="col-span-9 shadow-lg m-4 grid-cols-2 my-8 gap-9">
                <div className="col-span-4">

                </div>
                <div className="col-span-8">
                    <StripeComponent basket={basket} public_key={public_key} contract={contract} />
                </div>

            </div>
            <div className="col-span-3 shadow-lg m-4 grid-cols-2 my-8 gap-9">
                <BasketDetailPricePay />
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