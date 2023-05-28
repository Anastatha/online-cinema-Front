<template>
  <div class="card">
    <div class="card-body">
        <div class="card-image img">
            <img class="img" :src="moviePoster + movie.poster" alt="img">
        </div>
        <div class="card-title text-white" 
            @click = "nextLink(movie.id)">
            <p class="fs-3" style="cursor: pointer;">{{ movie.title }} ({{ movie.yers }})</p>
        </div>
    </div>
  </div>
</template>
<!-- @click.prevent="$router.push(`/movie/${movie.id}`)"> -->
<script>
import {toggleFavorite} from '@/api/movieApi'
import { mapGetters } from 'vuex';

export default {
    name: "MovieItemLeft",
    props: {
        movie: {
            type: Object
        }
    },
    data() {
      return {
        moviePoster: 'http://localhost:7000'
      }
    },
    methods: {
      async addFavorite() {
        const response = await toggleFavorite(this.getUser.id, this.movie.id)
        console.log(response)
      },
      nextLink(id) {
        this.$router.push(`/movie/${id}`)
      }
    },
    computed: {
        ...mapGetters({
            // getMovie: 'movie/getMovieOne',
            movieOpened: 'movie/getMovieOpened',
            getUser: 'user/getUser',
        }),
    },
}
</script>

<style scoped lang="scss">
.card {
    margin-bottom: 15px;
    background-color: $color-gray;
    display: flex;
    flex-direction: row;
    p {
      font-size:18px;
    }
    &-image {
      height: 124px;
    }
    .img {
      height: 124px;
    }
    &-body {
      flex: auto;
    }
}
</style>