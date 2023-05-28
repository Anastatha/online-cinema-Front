import {$authHost, $host} from "./index";

export const othetOne = async () => {
    const {data} = await $host.get('api/movie/othetOne')
    return data
}

export const othetTwo = async (genreId) => {
    const {data} = await $host.get('api/movie/othetTwo/' + genreId)
    return data
}

export const othetTree = async () => {
    const {data} = await $host.get('api/users/othetTree')
    return data
}