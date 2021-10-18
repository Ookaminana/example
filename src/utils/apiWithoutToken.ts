import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

if (process.env.REACT_APP_API_URL) {
    config.baseURL = process.env.REACT_APP_API_URL
}

const instance = axios.create(config)

export default instance
