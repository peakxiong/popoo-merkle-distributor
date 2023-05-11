import serviceAxios from "./service_axios";
import {load} from "ts-dotenv";
import {AxiosRequestConfig} from "axios"

const env = load({
    POPOO_HKS_SERVICE: String,
});

export const getBalances = (param = {}) => {
    console.log(env.POPOO_HKS_SERVICE)
    return serviceAxios({
        baseURL: env.POPOO_HKS_SERVICE,
        url: "/trade-service/trade/hks/getBalances",
        method: "post",
        data: param
    });
};

export const getMerkelInfo = (param: any) => {
    return serviceAxios({
        baseURL: env.POPOO_HKS_SERVICE,
        url: "/trade-service/trade/hks/getMerkelInfo",
        method: "post",
        data: param,
    });
};

export const reportTransferEvent = (param: any) => {
    return serviceAxios({
        baseURL: env.POPOO_HKS_SERVICE,
        url: "/trade-service/trade/hks/reportTransferEvent",
        method: "post",
        data: param,
    });
};

export const reportMerkleData = (param: any) => {
    return serviceAxios({
        baseURL: env.POPOO_HKS_SERVICE,
        url: "/trade-service/trade/hks/reportMerkleData",
        method: "post",
        data: param,
    });
};