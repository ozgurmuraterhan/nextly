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

    const { isAuthenticated, user } = useSelector(({ login }) => login);


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


    return (
        <div className="container-custom grid grid-cols-12 h-full my-2 py-2">

            <div className=" sm:col-span-3 col-span-12   p-2  shadow-sm border-top ">
                <TextFilter />
                <CategoriesFilter />
                <PriceFilter />
                <BrandsFilter />
            </div>
            <div className=" sm:col-span-9  col-span-12 grid-cols-12 grid ">
                <div className="col-span-9">
                    <FilterSelectedTop />
                </div>
                <div className="col-span-3">
                    <SortProducts />
                </div>
                <div className="col-span-12 mt-3">
                    <FilterProductArea />
                </div>
            </div>


        </div >
    )

}

export default Page