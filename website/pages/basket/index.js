import BasketList from "../../app/components/Basket/BasketList"
import DetailPrice from "../../app/components/Basket/DetailPrice"
import Head from "../../app/core/Head"

const Page = () => {
    return (
        <div className="container-custom h-full grid grid-cols-12 ">

            <Head
                title="Basket"
            />
            <div className=" col-span-12 lg:col-span-9 shadow-lg m-4 grid-cols-2 my-8 gap-9  bg-white">
                <BasketList />
            </div>
            <div className=" col-span-12 lg:col-span-3 shadow-lg m-4 grid-cols-2 bg-white my-8 gap-9">
                <DetailPrice />
            </div>
        </div>
    )

}

export default Page