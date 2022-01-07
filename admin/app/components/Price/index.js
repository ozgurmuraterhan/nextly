
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link"
import { Table, Popconfirm, message, InputNumber } from "antd"

import { useDispatch, useSelector } from "react-redux";
import func from "../../../util/helpers/func"
import { useIntl } from 'react-intl';
import { API_URL } from "../../../../config"

const Default = ({ data }) => {

    const [settings, seTsettings] = useState({ price_icon: "", price_type: true })
    const settingsGet = () => {
        axios.get(`${API_URL}/settingspublic`).then(res => {
            seTsettings(res.data)
        })
    }

    useEffect(() => {

        settingsGet()

    }, [])
    return (
        <>
            {settings.price_type ?
                <>
                    {settings.price_icon} {(data).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </>
                :
                <>
                    {(data).toLocaleString(undefined, { minimumFractionDigits: 2 })} {settings.price_icon}
                </>
            }

        </>
    )
}

export default Default;
