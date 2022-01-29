import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { SearchOutlined } from "@ant-design/icons"
import { Form, Input, Button, InputNumber } from "antd"
import filterRouteLinkGenerate from "./filterRouterLink";
import { filterProducts_r } from "../../../redux/actions";


const Page = () => {
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const [state, seTstate] = useState(filterProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        seTstate(filterProducts)
    }, [filterProducts])

    const onChange = () => {
        dispatch(filterProducts_r({ ...filterProducts, minPrice: state.minPrice, maxPrice: state.maxPrice, skip: 0 }))
        filterRouteLinkGenerate({ ...filterProducts, minPrice: state.minPrice, maxPrice: state.maxPrice, skip: 0 })
    }


    return (
        <>
            <div className="float-left   my-3">
                <h6 className="mt-4 ">Price </h6>
                <Form onFinish={onChange} >
                    <Input.Group compact>
                        <InputNumber
                            style={{ width: "42%" }}
                            placeholder="Minimum"
                            label="minPrice"
                            min={0}
                            value={state.minPrice}

                            onChange={(val) => seTstate({
                                ...state,
                                minPrice: val
                            })}
                            className=" px-0 ms-1"

                        />

                        <InputNumber
                            style={{ width: "42%" }}
                            label="maxPrice"
                            min={0}
                            placeholder="Maximum"
                            value={state.maxPrice}

                            onChange={(val) => seTstate({
                                ...state,
                                maxPrice: val
                            })}
                            className=" px-0"
                        />

                        <Button
                            style={{ width: "16%" }}
                            onClick={() => onChange()}
                            type="primary" htmlType="submit" className="m-0 p-1" >
                            <SearchOutlined />
                        </Button>
                    </Input.Group>
                </Form>
            </div>

        </>
    )

}

export default Page