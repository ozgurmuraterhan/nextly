import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import router from "next/router"

import FilterSelectedTop from "../../app/components/FilterProducts/FilterSelectedTop"
import BrandsFilter from "../../app/components/FilterProducts/BrandsFilter"
import CategoriesFilter from "../../app/components/FilterProducts/CategoriesFilter"
import PriceFilter from "../../app/components/FilterProducts/PriceFilter"
import FilterProductArea from "../../app/components/FilterProducts/FilterProductArea"
import TextFilter from "../../app/components/FilterProducts/TextFilter"
import SortProducts from "../../app/components/FilterProducts/SortProducts"
import { filterProducts_r } from "../../redux/actions";

const Page = () => {
    const { filterProducts } = useSelector(({ filterProducts }) => filterProducts);
    const [state, seTstate] = useState({ brands: [], count: 1 })

    const dispatch = useDispatch()

    const callUrltoRedux = async () => {
        const urlToRedux = {}
        for (const [key, value] of Object.entries(router.query)) {
            const arr = '["' + value.replaceAll(',', '","') + '"]'
            urlToRedux[key] = JSON.parse(arr)
        }

        await dispatch(filterProducts_r({ ...filterProducts, ...urlToRedux, skip: 0 }))
    }

    useEffect(() => {

        callUrltoRedux()

    }, [router.router.asPath])

    // const brandsCheckboxOption = func.getCategoriesTreeLabels(brands)
    // console.log("brandsCheckboxOption", brandsCheckboxOption)


    return (
        <div className="container-custom h-full my-2 py-2">

            <div className="sm:w-2/12 w-full  float-left  p-2  shadow-sm border-top ">
                <TextFilter />
                <CategoriesFilter />
                <PriceFilter />
                <BrandsFilter />
            </div>
            <div className=" sm:w-10/12 w-full  float-left ">
                <div className="flex justify-between">
                    <div className="w-9/12">
                        <FilterSelectedTop />
                    </div>
                    <div className="w-3/12">
                        <SortProducts />
                    </div>
                </div>
                <div className="w-full mt-3">
                    <FilterProductArea />
                </div>
                sd
            </div>

        </div>
    )

}

export default Page