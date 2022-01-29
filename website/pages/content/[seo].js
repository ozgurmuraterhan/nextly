import { useEffect } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import Head from "../../app/core/Head"


import router from "next/router"


const Page = () => {
    const { topmenu } = useSelector(({ topmenu }) => topmenu);
    const seo = router.query.seo

    const content = topmenu.find(x => x.seo == seo)
    const leftMenu = topmenu.filter(x => x.categories_id == content.categories_id)
    const leftMenuTitle = topmenu.find(x => x._id == content.categories_id)

    useEffect(() => {

    }, [])

    const replaceStyle = (dataHtml) => {
        return dataHtml
            .replaceAll("<p>", "<p style='min-height:25px' >")
            .replaceAll("<pre>", "<pre  style='min-height:30px; background-color:#dbdbdb; padding:15px' >")
    }

    return (
        <div className="container-custom h-full ">


            <Head
                title={content.title}
                description={content.description_short}
                keywords={content.description_short}
            />
            <div className="grid shadow-lg p-4 grid-cols-12 my-8 gap-9">
                <div className=" lg:col-span-3 sm:col-span-12 sm:order-2  ">

                    <div className="text-xl font-semibold col-span-12 text-brand-color  mb-5  " >
                        {leftMenuTitle && leftMenuTitle.title}
                    </div>

                    {leftMenu && leftMenu?.map((x, i) =>
                        <Link href={"/content/" + x.seo} key={i}>
                            <a className="w-full py-3 border-b border-t -mt-0.1 float-left hover:pl-1  transform-all">
                                {x.title}
                            </a>
                        </Link>
                    )}
                </div>

                <div className=" lg:col-span-9 sm:order-2 sm:col-span-12 ">

                    <div className="text-2xl font-semibold col-span-12 text-brand-color  mb-5 h-  " >
                        {content && content.title}
                    </div>
                    {console.log(content.description)}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: replaceStyle(content.description)
                        }}></div>

                </div>
            </div>

        </div >
    )

}


export default Page