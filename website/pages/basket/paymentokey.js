import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import router from "next/router"
import Link from "next/link"
import axios from "axios";
import Price from "../../app/components/Price"


import { API_URL } from "../../../config"


const Page = () => {
    const { basket } = useSelector((state) => state.basket);
    const { isAuthenticated, user } = useSelector(({ login }) => login);

    const [state, seTstate] = useState("")
    const dispatch = useDispatch()

    const payment_intent = router.query.payment_intent
    const ordernumber = router.query.ordernumber

    const updateBasketandOrder = async () => {
        axios.get(`${API_URL}/payment/stripeconfirm/${payment_intent}/${ordernumber}`).then(res => {
            seTstate(...res.data)
            console.log("res.data1", res.data)
        })
    }
    useEffect(() => {

        updateBasketandOrder()

    }, [basket[0], isAuthenticated])

    const getVariant = (data) => {
        const variants = []

        for (const property in data) {
            variants.push(<div className="text-xs ">  {property}: {data[property]}  </div>)
        }
        return variants.length > 0 ? <> {variants}</> : <> </>
    }

    return (
        <div className="container-custom h-full grid grid-cols-12 ">
            <div className="col-span-12 shadow-lg p-10">
                <div className="grid grid-cols-12">
                    {state ?
                        <>
                            <div className="text-4xl col-span-12 text-brand-color font-semibold text-center mb-10">Payment Succeeded</div>
                            <div className="text-2xl col-span-12   font-semibold text-center mb-10">Order Number:{state.ordernumber} </div>
                            <div className="col-span-6" >
                                <div className="font-bold">Receiver</div>
                                <div>{state.receiver_name}</div>
                                <div>{state.receiver_email}</div>
                                <div>{state.receiver_phone}</div>

                                <div className="font-bold mt-5">Shipping Address</div>
                                <div>{state.shipping_address}</div>
                                <div className="font-bold mt-5">Billing Address</div>
                                <div>{state.billing_address}</div>

                            </div>
                            <div className="col-span-6 ">
                                <div className="font-bold">Products</div>
                                <table className="w-full ">
                                    <tr className="bg-gray-50">
                                        <td className="font-semibold">Title</td>
                                        <td className="font-semibold">Variant</td>
                                        <td className="font-semibold">Qty</td>
                                        <td className="font-semibold">  Price</td>
                                    </tr>
                                    {state.products && state.products.map(x =>
                                        <tr className="h-16 border-b">
                                            <td><Link href={"/" + x.seo}>{x.title}</Link></td>
                                            <td>{getVariant(x.selectedVariants)}</td>
                                            <td>{x.qty}</td>
                                            <td><Price data={x.price * x.qty} /></td>

                                        </tr>
                                    )}
                                    <tr>
                                        <td> </td>
                                        <td> </td>
                                        <td className="font-semibold"><br />
                                            Cargo Price:<br />
                                            Total Price:</td>
                                        <td className="font-bold">
                                            <br />
                                            <Price data={state.cargo_price} />
                                            <br />
                                            <Price data={Number(state.total_price) + Number(state.cargo_price)} />
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </>
                        : ""}
                </div>

            </div>

        </div>
    )

}


export default Page