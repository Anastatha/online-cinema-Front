<template>
  <div class="card">
    <div class="card-image img">
      <img class="img" :src="moviePoster + movie.poster" alt="img">
    </div>
    <div class="card-body">
    <div class="card-title text-white">
      <p class="fs-3" style="cursor: pointer;"
          @click="$router.push(`/movie/${movie.id}`)"
      >{{ movie.title }} ({{ movie.yers }})</p>
      <div class="favorit" >
        <button v-if="getAuth === true" class="btn btn-light mt-3" @click="addFavorite"><p class="mb-0">В закладки</p></button>
      </div>
    </div>
      <ul class="movie__contant_lines">
          <li>
              <div class="label">Год выпуска: </div>
              <div class="desc">{{ movie.yers }}</div>
          </li>
           <li>
              <div class="label">Страна: </div>
              <div class="desc">{{ movie.country }}</div>
          </li>
            <li>
              <div class="label">Жанр: </div>
              <div class="desc" v-for="movie in movie.genre"
                  :key="movie.id"
              >{{ movie.name }}</div>
          </li>
      </ul>
      <div class="movie__contant_opened">
          <span><font-awesome-icon icon="fa fa-eye"/> {{movie.coundOpened }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {findOneMovie, toggleFavorite, createRating} from '@/api/movieApi'
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "MovieItem",
    props: {
        movie: {
            type: Object
        }
    },
    data() {
      return {
        moviePoster: 'http://localhost:7000',
      }
    },
    methods: {
      async addFavorite() {
        const response = await toggleFavorite(this.getUser.id, this.movie.id)
        console.log(response)
      },
    },
    computed: {
        ...mapGetters({
            // getMovie: 'movie/getMovieOne',
            movieOpened: 'movie/getMovieOpened',
            getUser: 'user/getUser',
            getAuth: 'user/getAuth',
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
  .card-image {
    margin-bottom: 15px;
    margin-top: 15px;
    margin-left: 15px;
  }
  .img {
    widows: 218px;
    height: 308px;
  }
  .card-body {
    flex: auto;
  }
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .movie__contant_lines {
      border-bottom: 1px dashed #e3e3e3;
      margin-right: 20px;
  }
  .movie__contant_lines > li {
      display: table;
      padding-bottom: 10px;
  }
  .movie__contant_lines > ul {
      list-style: none;
  }
  .label {
      max-width: 110px;
      float: left;
      color: white;
      text-align: start;
  }
  .desc {
      padding-left: 120px;
      width: 100%;
      font-weight: 700;
      color: white;
  }
  .movie__contant_opened {
      height: 40px;
      line-height: 40px;
      color: white;
      float: left;
  }
}

</style>