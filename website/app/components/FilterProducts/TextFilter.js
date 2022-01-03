import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { SortAscendingOutlined, SortDescendingOutlined, SearchOutlined } from "@ant-design/icons"
import { Checkbox, Input, Tag, TreeSelect, Tree, Button, InputNumber } from "antd"
import router from "next/router"
import func from "../../../util/helpers/func"
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

        dispatch(filterProducts_r({ ...filterProducts, text: state.text, skip: 0 }))
        filterRouteLinkGenerate({ ...filterProducts, text: state.text, skip: 0 })
    }


    return (
        <>
            <div className="row py-2  mb-4">
                <h6>Search </h6>

                <Input.Group compact>
                    <Input
                        style={{ width: "84%" }}
                        placeholder="Enter text..."
                        min={0}
                        value={state.text}

                        onChange={(e) => seTstate({
                            ...state,
                            text: e.target.value
                        })}

                    />
                    <Button
                        style={{ width: "16%" }}
                        onClick={() => onChange()}
                        type="primary" className="m-0 p-1" >
                        <SearchOutlined />
                    </Button>
                </Input.Group>
            </div>

        </>
    )

}

export default Page