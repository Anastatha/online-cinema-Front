import axios from 'axios'

const $host = axios.create({
    baseURL: 'http://localhost:7000/'
});//для обычных запросов, которые не требуют авторизации

const $authHost = axios.create({
    baseURL: 'http://localhost:7000/'
});//запросы для авторизированных

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}