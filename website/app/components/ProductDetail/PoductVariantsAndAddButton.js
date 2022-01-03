import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Divider, Radio, message, Form, Button } from "antd"
import { ShoppingCartOutlined, LoadingOutlined } from "@ant-design/icons"
import { getBasket_r, updateBasket_r } from "../../../redux/actions"
import Price from "../Price"


import router from "next/router"
import axios from "axios";
import func from "../../../util/helpers/func"

import { API_URL } from "../../../config"


const Page = ({ data = {} }) => {
    const { isAuthenticated, user } = useSelector(({ login }) => login);
    const { basket } = useSelector(({ basket }) => basket);
    const [state, seTstate] = useState(data)
    const [loadingButton, seTloadingButton] = useState(true)
    const [disabledVariant, seTdisabledVariant] = useState(true)
    const [priceAdd, seTpriceAdd] = useState({ before_price: 0, price: 0, qty: 1 })

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

    const addBasket = (res) => {

        if (basket.length < 1) {

            const post = {
                created_user: {
                    name: user.name,
                    id: user.id
                },
                customer_id: user.id,
                products: [
                    {
                        product_id: state._id,
                        seo: state.seo,
                        selectedVariants: res,
                        qty: 1,
                    }
                ],
                total_price: priceAdd.price,
                discount_price: priceAdd.before_price,

            }

            if (isAuthenticated) {


                axios.post(`${API_URL}/basket/add`, post).then((res) => {
                    console.log("res", res)
                    getBasket(user.id)
                    seTloadingButton(true)
                    form.resetFields()
                    message.success({ content: 'Product Added!', duration: 3 });

                })
                    .catch(err => {
                        message.error({ content: "Some Error, Please Try Again", duration: 3 });
                        console.log(err)
                    })

            } else {

                seTloadingButton(true)
                form.resetFields()
                message.success({ content: 'Product Added!', duration: 3 });
                dispatch(updateBasket_r([post]))
                console.log([post])

            }

        } else {

            const productsDataArray = basket[0].products
            const productsData = []

            if (state.type) {
                const variantControl = productsDataArray.find(x => (x.product_id._id == state._id || x.product_id == state._id) && JSON.stringify(x.selectedVariants) == JSON.stringify(res))
                const variantControlNot = productsDataArray.filter(x => JSON.stringify(x.selectedVariants) != JSON.stringify(res))
                if (variantControl == undefined) {
                    productsData.push(
                        ...productsDataArray,
                        {
                            product_id: state._id,
                            selectedVariants: res,
                            seo: state.seo,
                            qty: 1,
                        })

                } else {

                    productsData.push(
                        ...variantControlNot,
                        {
                            product_id: state._id,
                            selectedVariants: res,
                            seo: state.seo,
                            qty: variantControl.qty + 1,
                        })

                }

            } else {

                const variantControlId = productsDataArray.find(x => x.product_id._id == state._id || x.product_id == state._id)
                const variantControlIdNot = productsDataArray.filter(x => JSON.stringify(x.selectedVariants) != JSON.stringify(res) && x.product_id != state._id)



                if (variantControlId == undefined) {
                    productsData.push(
                        ...productsDataArray,
                        {
                            product_id: state._id,
                            selectedVariants: undefined,
                            seo: state.seo,
                            qty: 1,
                        })

                } else {

                    productsData.push(
                        ...variantControlIdNot,
                        {
                            product_id: state._id,
                            selectedVariants: undefined,
                            seo: state.seo,
                            qty: variantControlId.qty + 1,
                        })

                }

            }
            const post = {
                created_user: {
                    name: user.name,
                    id: user.id
                },
                customer_id: user.id,
                products: productsData.sort((a, b) => (a.seo + JSON.stringify(a.selectedVariants)).length - (b.seo + JSON.stringify(b.selectedVariants)).length),

            }
            console.log("postpost", post)
            if (isAuthenticated) {

                axios.post(`${API_URL}/basket/${basket[0]._id}`, post).then((res) => {
                    getBasket(user.id)
                    seTloadingButton(true)
                    form.resetFields()
                    message.success({ content: 'Product Added!', duration: 3 });

                })
                    .catch(err => {
                        message.error({ content: "Some Error, Please Try Again", duration: 3 });
                        console.log(err)
                    })
            } else {
                seTloadingButton(true)
                form.resetFields()
                message.success({ content: 'Product Added!', duration: 3 });
                dispatch(updateBasket_r([post]))
                console.log([post])

            }

        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    };




    return (

        <>
            <h2 className="font-semibold">{state.title}</h2>
            <div className="my-4">
                {state.type ?
                    <>
                        {disabledVariant ?
                            <h1 className=" text-brand-color">


                                <span className="text-2xl"> Price :</span>  {priceAdd.price != 0 ? <Price data={priceAdd.price} /> : "Please Select Variant "}

                                {priceAdd.before_price != 0 ?
                                    <span className="line-through ml-3 text-sm text-black" >
                                        <Price data={priceAdd.before_price} />
                                    </span>

                                    : ""}
                            </h1>
                            : <h2 className="text-red-500">This is variant not shipping :(</h2>}

                    </> :
                    <h1 className=" text-brand-color">

                        {disabledVariant ?
                            <>
                                <span className="text-2xl"> Price :</span> <Price data={state.price} />

                                {state.before_price != 0 ?
                                    <span className="line-through ml-3 text-sm text-black" >
                                        <Price data={state.before_price} />
                                    </span>

                                    : ""}
                            </> : ""}
                    </h1>
                }
                <div className="h-5">

                </div>
            </div>
            <div>
                <Form
                    form={form}
                    name="add"
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                    layout="vertical"
                >

                    {state.type ?
                        <>
                            {state.variants.map((x, i) =>
                                <div key={x.name}>
                                    <Form.Item
                                        name={x.name}
                                        label={x.name}
                                        labelAlign="left"
                                        className="mb-0 pb-0 mt-2"
                                        rules={[{ required: true, message: "Lütfen Seçiniz", whitespace: true }]}
                                    >
                                        <Radio.Group
                                            name={x.name}
                                            optionType="button"
                                            buttonStyle="outline"
                                            className="pl-2"
                                            required
                                            onChange={y => {
                                                const data = state
                                                data.selectedVariants = { ...data.selectedVariants, [y.target.name]: y.target.value }
                                                const priceMath = func.filter_array_in_obj(data.variant_products, data.selectedVariants)

                                                if (priceMath.length == 1) {

                                                    if (priceMath[0].qty == "0") {
                                                        seTdisabledVariant(false)
                                                    } else if (priceMath[0].visible) {
                                                        seTdisabledVariant(true)
                                                    } else {
                                                        seTdisabledVariant(false)
                                                    }

                                                }

                                                seTpriceAdd({
                                                    qty: priceAdd.qty,
                                                    price: priceMath[0].price * priceAdd.qty,
                                                    before_price: priceMath[0].before_price * priceAdd.qty
                                                })
                                            }}
                                        >

                                            {x.value.map(z => {

                                                return <Radio.Button value={z}>{z}</Radio.Button>

                                            })}


                                        </Radio.Group>

                                    </Form.Item>
                                </div>

                            )}
                        </>
                        : ""}



                    {/* <label>Adet: <br /></label>
                            <div>
                                <Input type="number" onChange={x => {

                                    seTpriceAdd({
                                        qty: x.target.value,
                                        price: state.price * x.target.value,
                                        before_price: state.before_price * x.target.value
                                    })

                                }}
                                    value={priceAdd.qty}
                                />
                            </div> */}
                    <Divider />

                    <Button type="primary"
                        className="  w-full border-brand-color bg-brand-color text-2xl h-auto"
                        disabled={!disabledVariant}
                        onClick={() => {
                            form.validateFields().then(res => {
                                seTloadingButton(false)
                                if (loadingButton) {
                                    addBasket(res)
                                }
                            }).catch(err => console.log("err", err))
                        }}>

                        Add Cart
                        {loadingButton ?
                            <ShoppingCartOutlined />
                            :
                            <LoadingOutlined className="animate-spin h-5 w-5 mr-3  " />

                        }
                    </Button>

                </Form>
                <Divider />

                <h3>{state.description}</h3>


            </div>
        </>

    )

}



export default Page