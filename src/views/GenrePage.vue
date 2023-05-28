<template>
    <div class="container">
    <div class="row">
        <div class="col-3 card">
            <div class="card-body">
                <p class="card-text text-white fs-5 coursor"
                    v-for="genre in genres"
                    :key="genre.id"
                    @click="selectGenre(genre.id)"
                >{{ genre.name }}
                </p>
            </div>
        </div>
        <div class="col-9" v-if="movieGenre.length">
            <MovieItem
                v-for="movie in movieGenre"
                :key="movie.id"
                :movie="movie"
            ></MovieItem>
        </div>
        <div class="col-9" v-else>
            <MovieItem
                v-for="movie in movies"
                :key="movie.id"
                :movie="movie"
            ></MovieItem>
        </div>
    </div>
    </div>
</template>

<script>
import {findAllGenre, findMovieByGenre} from '@/api/movieApi'
import { mapActions, mapGetters } from 'vuex';
import MovieItem from '@/components/MovieItem.vue';

export default{
    name: 'GenrePage',
    components: {
        MovieItem
    },
    data() {
        return {
            genreId: Number
        }
    },

    methods: {
        ...mapActions({
            setGenre: 'movie/setGenre',
            setMovieGenre: 'movie/setMovieGenre'
        }),
        async fethGenre() {
            try {
                const response = await findAllGenre()
                this.setGenre(response)
            } catch(error) {
                console.log(error)
            }
        },

        async selectGenre(genreId) {
            try {
                const response = await findMovieByGenre(genreId)
                this.setMovieGenre(response)
            } catch(error) {
                console.log(error)
            }
        },
    },

    computed: {
        ...mapGetters({
            genres: 'movie/getGenre',
            movies: 'movie/getMovie',
            movieGenre: 'movie/getMovieGenre'
        }),
    },

    mounted() {
        this.fethGenre()
    }
}
</script>

<style lang="scss" scoped>
.coursor {
    cursor: pointer;
}
.card {
    background-color: $color-gray;
}
</style>