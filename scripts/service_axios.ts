import axios from "axios";
import qs from "qs";


const serverConfig = {
    // baseURL: env.REPORT_PATH,
    useTokenAuthorization: false,
};

// create axios request object
const serviceAxios = axios.create({
    // baseURL: serverConfig.baseURL,
    timeout: 10000,
    withCredentials: false,
});


// create request filter
serviceAxios.interceptors.request.use(
    (config) => {
        if (!config.headers["content-type"]) {
            if (config.method === 'post') {
                config.headers["content-type"] = "application/json";
            } else {
                config.headers["content-type"] = "application/json";
                config.data = qs.stringify(config.data);
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


// create response filter
serviceAxios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        let message = "";
        if (error && error.response) {
            switch (error.response.status) {
                case 302:
                    message = "The resource has been moved temporarily!";
                    break;
                case 400:
                    message = "The request was made with an error!";
                    break;
                case 401:
                    message = "The user does not have permission (token, username, password is incorrect)!";
                    break;
                case 403:
                    message = "The user is authorized, but access is forbidden!";
                    break;
                case 404:
                    message = "The request was made for a record that does not exist!";
                    break;
                case 408:
                    message = "The request timed out!";
                    break;
                case 409:
                    message = "The resource conflict!";
                    break;
                case 500:
                    message = "Server error!";
                    break;
                case 501:
                    message = "The service is not implemented!";
                    break;
                case 502:
                    message = "The gateway is wrong!";
                    break;
                case 503:
                    message = "The service is unavailable!";
                    break;
                case 504:
                    message = "The gateway timed out!";
                    break;
                case 505:
                    message = "The HTTP version is not supported!"
                    break;
                default:
                    message = "Unknown error!";
                    break;
            }
        }
        return Promise.reject(message);
    }
);
export default serviceAxios;