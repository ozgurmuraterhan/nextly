
import Link from "next/link";


const Default = ({ topmenu, socialmedia }) => {


    return (<div className="float-left w-full">
        <ul className="topmenu float-left">
            {topmenu && topmenu.map(val => (
                <li key={val.title} className={`${val.isActive ? "visible" : "invisible"}`}>
                    {!val.children ?
                        <Link href={val.link ? val.link : "/content/" + val.seo}>
                            <a>{val.title}</a>
                        </Link>
                        :
                        <>
                            <Link href="#">
                                <a>{val.title}</a>
                            </Link>
                            <ul key={val.title}>
                                {val?.children.map(val2 => (
                                    <li key={val2.title}>
                                        {!val2.children ?
                                            <Link href={val2.link ? val2.link : "/content/" + val2.seo}>
                                                <a>{val2.title}</a>
                                            </Link>
                                            :
                                            <>
                                                <Link href="#">
                                                    <a>{val2.title}</a>
                                                </Link>
                                                <ul key={val2.title}>
                                                    {val2?.children.map(val3 => (
                                                        <li key={val3.title}>
                                                            <Link href={val3.link ? val3.link : "/content/" + val3.seo}>
                                                                <a>{val3.title}</a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        }
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                </li>
            ))}
        </ul>

        <ul className="topmenu float-right hidden md:block">
            {socialmedia && socialmedia.map(val => (
                <li key={val.title}>

                    {!val.children ?
                        <Link href={val.link ? val.link : "/content/" + val.seo}>
                            <a>{val.title}</a>
                        </Link>
                        :
                        <>
                            <Link href="#">
                                <a>{val.title}</a>
                            </Link>
                            <ul key={val.title}>
                                {val?.children.map(val2 => (
                                    <li key={val2.title}>
                                        {!val2.children ?
                                            <Link href={val2.link ? val2.link : "/content/" + val2.seo}>
                                                <a>{val2.title}</a>
                                            </Link>
                                            :
                                            <>
                                                <Link href="#">
                                                    <a>{val2.title}</a>
                                                </Link>
                                                <ul key={val2.title}>
                                                    {val2?.children.map(val3 => (
                                                        <li key={val3.title}>
                                                            <Link href={val3.link ? val3.link : "/content/" + val3.seo}>
                                                                <a>{val3.title}</a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        }

                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                </li>
            ))}
        </ul>
    </div >

    )
}

export default Default