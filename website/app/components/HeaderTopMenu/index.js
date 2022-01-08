import { useState, useEffect } from "react";
import AuthService from "../../../util/services/authservice";
import { useDispatch, useSelector } from "react-redux";
import { login_r, isAuthenticated_r, settings_r, logout_r } from "../../../redux/actions";
import { API_URL } from "../../../../config";
import axios from "axios"
import func from "../../../util/helpers/func"
import Link from "next/link";


const Default = ({ topmenu, socialmedia }) => {


    return (<div className="float-left w-full">
        <ul className="topmenu float-left">
            {topmenu.map(val => (
                <li key={val.title}>
                    {!val.children ?
                        <Link href={val.link ? val.link : val.seo}>
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
                                            <Link href={val2.link ? val2.link : val2.seo}>
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
                                                            <Link href={val3.link ? val3.link : val3.seo}>
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
            {socialmedia.map(val => (
                <li key={val.title}>

                    {!val.children ?
                        <Link href={val.link ? val.link : val.seo}>
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
                                            <Link href={val2.link ? val2.link : val2.seo}>
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
                                                            <Link href={val3.link ? val3.link : val3.seo}>
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
    </div>

    )
}

export default Default