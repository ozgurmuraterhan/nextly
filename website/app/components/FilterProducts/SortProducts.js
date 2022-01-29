import { useSelector, useDispatch } from "react-redux"
import { Select } from "antd"
import { SortAscendingOutlined, SortDescendingOutlined } from "@ant-design/icons"
import { filterProducts_r } from "../../../redux/actions"
import filterRouteLinkGenerate from "./filterRouterLink";

const Page = () => {
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const dispatch = useDispatch()

    const sortItem = (data) => {
        const newData = JSON.parse(data)
        dispatch(filterProducts_r({ ...filterProducts, sort: newData, skip: 0 }))
        filterRouteLinkGenerate({ ...filterProducts, sort: newData, skip: 0 })
    }

    return (

        <div className="w-full">
            <Select
                style={{ width: '100%' }}
                placeholder="Select Sort"
                onChange={(newValue) => {
                    sortItem(newValue);
                }}
            >
                <Select.Option
                    key={1}
                    value={JSON.stringify({ "variant_products.price": -1, price: -1 })}>
                    <SortDescendingOutlined />  Increased Price
                </Select.Option>
                <Select.Option
                    key={2}
                    value={JSON.stringify({ "variant_products.price": 1, price: 1 })}>
                    <SortAscendingOutlined /> Decreasing Price
                </Select.Option>
            </Select>
        </div>
    )

}

export default Page