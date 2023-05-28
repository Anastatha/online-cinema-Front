<template>
    <div class="container">
        <div class="row">
            <div class="col-3 card">
                <h5 class="card-title text-white mt-3">Топ фильмов</h5>
                <MovieItemLeft
                    v-for="movie in movieOpened"
                    :key="movie.id"
                    :movie="movie"
                />
            </div>

            <div class="col-9">
            <div class="card" style="margin-bottom: 5px;">
                <h5 class="card-title text-white  pad">Все фильмы</h5>
            </div>
            <MovieList
                :movies="movies"
            ></MovieList>
            </div>
        </div>
    </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import MovieItem from '@/components/MovieItem.vue';
import MovieItemLeft from '@/components/MovieItemLeft.vue';
import { mapActions, mapGetters } from 'vuex';
import {findAllMovie, findByOpened} from '@/api/movieApi'

export default {
    name: "MainPage",
    components: {
        MovieList, MovieItem, MovieItemLeft
    },
    methods: {
        ...mapActions({
            setMovie: 'movie/setMovie',
            setMovieOpened: 'movie/setMovieOpened',
            setUser: 'user/setUser',
            setAuth: 'user/setAuth'
        }),
        async fethMovie() {
            try {
                const response = await findAllMovie()
                this.setMovie(response)
            } catch(error) {
                console.log(error)
            }
        },

        async findOpened() {
            try {
                const response = await findByOpened()
                this.setMovieOpened(response)
            } catch(error) {
                console.log(error)
            }
        },

    },

    computed: {
        ...mapGetters({
            movies: 'movie/getMovie',
            movieOpened: 'movie/getMovieOpened',
            search_Value:'movie/SEARCH_VALUE',
        }),
        // sorted() {
        //     this.sortedProducts = this.movies.filter((item)=> {
        //         return item.title.includes(this.search_Value)
        //     })
        // }
    },

    mounted() {//для получения данных сразу при загрузки страницы
        this.fethMovie()
        this.findOpened()
    }
}
</script>

<style lang="scss">
.container {
    background-color: $color-black;
    margin-top: 20px;
    .pad {
        padding-top: 10px;
        display: flex;
        margin-left: 26px;
    }
    .card {
        background-color: $color-gray;
        border: none;
    }
}

</style>