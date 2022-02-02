import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import Head from "../../app/core/Head"

const Page = ({ seo }) => {
    const { topmenu } = useSelector((state) => state.topmenu);

    const content = topmenu.find(x => x.seo == seo)
    const leftMenu = topmenu.filter(x => x.categories_id == content.categories_id)
    const leftMenuTitle = topmenu.find(x => x._id == content.categories_id)

    const [contentDescription, seTcontentDescription] = useState(replaceStyle(content.description))

    function createMarkup() {
        return { __html: contentDescription };
    }

    const replaceStyle = (dataHtml) => {
        return dataHtml
            .replaceAll("<p>", "<p style='min-height:25px' >")
            .replaceAll("<pre>", "<pre  style='min-height:30px; background-color:#dbdbdb; padding:15px' >")
            .replaceAll("<img ", "<img class='w-full sm:w-auto' ")
            .replaceAll('<div class="media-wrap image-wrap ', '<div class="media-wrap image-wrap  w-full sm:w-auto" ')
    }

    return (
        <div className="container-custom h-full ">


            <Head
                title={content.title}
                description={content.description_short}
                keywords={content.description_short}
            />
            <div className="grid shadow-lg p-4 grid-cols-12 my-8 sm:gap-9 bg-white">
                <div className=" lg:col-span-3  col-span-12 sm:order-2 order-2 ">
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
                <div className=" lg:col-span-9 sm:order-2 order-1  col-span-12 ">
                    <div className="text-2xl font-semibold col-span-12 text-brand-color  mb-5   " >
                        {content && content.title}
                    </div>
                    <div dangerouslySetInnerHTML={createMarkup()} />
                </div>
            </div>

        </div >
    )

}


export const getServerSideProps = async ({ req, query }) => {

    return {
        props: {
            seo: query.seo
        }
    }
}


export default Page