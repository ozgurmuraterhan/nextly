import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import router from "next/router"
import Head from "../../app/core/Head"
import { CloseCircleOutlined, FilterOutlined } from "@ant-design/icons"
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
    const [openFilter, seTopenFilter] = useState(false)

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
    }, [router.router?.asPath])


    return (
        <div className="container-custom grid grid-cols-12 h-full my-2 py-2">
            <Head
                title="Search"
            />

            <div className={`md:col-span-2 col-span-12 p-2 shadow-sm border-top md:relative md:top-auto md:right-auto md:left-auto md:bottom-auto md:visible md:block
            ${openFilter ? " fixed overflow-scroll top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white z-20 " : "invisible hidden"} `}>
                <div className="float-right  md:hidden block"
                    onClick={() => seTopenFilter(false)}
                >
                    <CloseCircleOutlined />
                </div>
                <TextFilter />
                <CategoriesFilter />
                <PriceFilter />
                <BrandsFilter />

                <div className="float-right w-full p-2  md:hidden block text-center bg-black text-white mt-10"
                    onClick={() => seTopenFilter(false)}
                >
                    Filter Done
                </div>
            </div>


            <div className=" md:col-span-10  col-span-12  ">

                <div className="w-6/12 float-left">
                    <button className="items-center w-full  bg-white border rounded-sm p-0.3 text-base block md:hidden"
                        onClick={() => seTopenFilter(true)}
                    >
                        Open Filter <FilterOutlined />
                    </button>
                </div>
                <div className="w-6/12 md:w-2/12 float-right">
                    <SortProducts />
                </div>
                <div className="w-full float-left p-5 pb-0">
                    <FilterSelectedTop />
                </div>
                <div className="w-full mt-3 float-left">
                    <FilterProductArea />
                </div>
            </div>


        </div >
    )

}

export default Page