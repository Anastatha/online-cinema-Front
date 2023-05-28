<template>
    <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
    ></MovieItem>
</template>

<script>
import MovieItem from './MovieItem.vue';

export default {
    name: "MovieList",
    components: {
        MovieItem
    },
    props: {
        movies: {
            type: Object
        }
    }    
}
</script>

<style>

</style>