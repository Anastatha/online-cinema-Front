import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/auth/registration', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/users/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}//проверка токена на валидность

export const addRole = async(id) => {
    const {data} = await $host.put('api/users/role', {userId: id, value: "PRIVILEGE"})
    return data
}

export const updateUser = async(id, name, email, password) => {
    const {data} = await $host.patch('api/users/profile/'+id, {name, email, password})
}
