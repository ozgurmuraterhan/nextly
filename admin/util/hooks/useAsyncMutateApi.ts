import { useState } from "react";

interface fetchApiState {
    resp: any;
    loading: boolean;
    error: any;
}

type Props = {
    apiPath: string;
    method?: string;
};
type fetchApiProps = {
    variables?: any;
    callbackFn?: (params: string) => void;
    urlParams?: any;
};

const useAsyncMutateApi = ({ apiPath, method }: Props) => {
    const [data, setData] = useState<fetchApiState>({
        resp: null,
        loading: false,
        error: null,
    });

    const fetchApi = async ({ variables, urlParams }: fetchApiProps) => {
        setData({ ...data, loading: true });
        let params = urlParams ? "/" + urlParams : "";
        let actualApiPath = apiPath + params;
        const requestOptions = {
            method: method ? method : "POST",
            headers: { "Content-Type": "application/json" },
            body: variables && JSON.stringify(variables),
        };
        const response = await fetch(actualApiPath, requestOptions);
        if (!response.ok) {
            const errMessage = `An error has occurred: ${response.status}`;
            setData({
                loading: false,
                error: errMessage,
                resp: null,
            });
            return { success: false, message: errMessage };
        }
        response.ok; // => false | true
        response.status; // => 404 | 200 ..
        const resp = await response.json();
        setData({
            loading: false,
            error: null,
            resp: resp,
        });
        return resp;
    };
    return [fetchApi, data.resp, data.loading];
};
export default useAsyncMutateApi;
