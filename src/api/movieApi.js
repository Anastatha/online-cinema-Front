import {$authHost, $host} from "./index";

export const creteMovie = async(title, description, yers, duration, country, poster, video, actorIds, genreIds) => {
    const {data} = await $host.post('api/movie', {title, description, yers, duration, country, poster, video, actorIds, genreIds})
    return data
}

export const fi = async(file) => {
    const {data} = await $host.post('api/file', {file}, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    return data
}

export const updateMovie = async(id, title, description, yers, duration, country, poster, video, actorIds, genreIds) => {
    const {data} = await $host.patch('api/movie/update/' + id, {title, description, yers, duration, country, poster, video, actorIds, genreIds})
    return data
}

export const findAllMovie = async () => {
    const {data} = await $host.get('api/movie')
    return data
}

export const findOneMovie = async (movieId) => {
    const {data} = await $host.get('api/movie/' + movieId)
    return data
}

export const findAllMovieSearch = async (searchTerm) => {
    const {data} = await $host.get('api/movie/search?searchTerm='+searchTerm)
    return data
}

export const findMovieByGenre = async (genreId) => {
    const {data} = await $host.get('api/movie/byGenre/' + genreId)
    return data
}

export const findByOpened = async () => {
    const {data} = await $host.get('api/movie/opened')
    return data
}

export const updateCountOpened = async (id) => {
    const {data} = await $host.post('api/movie/updateCountOpened/'+id)
    return data
}

export const toggleFavorite = async (userId, movieId) => {
    const {data} = await $host.patch('api/users/favorite/'+userId+'/'+movieId)
    return data
}

//Rating
export const createRating = async (userId, movieId, value) => {
    const {data} = await $host.post('api/rating', {userId,movieId, value})
    return data
}

export const getFavirite = async(userId) => {
    const {data} = await $host.get('api/users/'+userId)
    return data
}

export const deleteOneMovie = async(movieId) => {
    const {data} = await $host.delete('api/movie/' + movieId)
    return data
}

//Genre
export const createGenre = async(name) => {
    const {data} = await $host.post('api/genre', {name})
    return data
}

export const findAllGenre = async () => {
    const {data} = await $host.get('api/genre')
    return data
}

export const deleteOneGenre = async (id) => {
    const {data} = await $host.delete('api/genre/'+id)
    return data
}

export const findAllGenreSearch = async (searchTerm) => {
    const {data} = await $host.get('api/genre/search?'+searchTerm)
    return data
}

//Actor
export const createActor = async(nameActor, descriptionActor, posterActor, dataActor, placeActor) => {
    const {data} = await $host.post('api/actor', {name: nameActor, description: descriptionActor, poster: posterActor, dataBirth: dataActor, placeBirth: placeActor})
    return data
}

export const updateActor = async(id, nameActor, descriptionActor, posterActor) => {
    const {data} = await $host.patch('api/actor/update/' + id, {name: nameActor, description: descriptionActor, poster: posterActor})
    return data  
}

export const findActor = async() => {
    const {data} = await $host.get('api/actor')
    return data
}

export const findOneActor = async(actorId) => {
    const {data} = await $host.get('api/actor/'+actorId)
    return data
}

export const deleteOneActor = async(actorId) => {
    const {data} = await $host.delete('api/actor/'+actorId)
    return data
}

//comments
export const createComment = async(userId, movieId, value) => {
    const {data} = await $host.post('api/comments', {userId,  movieId, value})
    return data
}

export const findCommentsByMovie = async(movieId) => {
    const {data} = await $host.get('api/comments/movie/'+movieId)
    return data
}