import AddressList from "../../app/components/Basket/AddressList"
import DetailPriceAddress from "../../app/components/Basket/DetailPriceAddress"
import Head from "../../app/core/Head"


const Page = () => {

    return (
        <div className="container-custom h-full grid grid-cols-12 ">
            <Head
                title="Address"
            />
            <div className=" col-span-12 lg:col-span-9 shadow-lg m-4 grid-cols-2 my-8 gap-9 py-5 bg-white">
                <AddressList />
            </div>
            <div className=" col-span-12 lg:col-span-3 shadow-lg m-4 grid-cols-2 my-8 gap-9 bg-white">
                <DetailPriceAddress />
            </div>
        </div>
    )

}

export default Page