<template>
    <div class="container">
        <div class="admin">
            <div class="admin__action">
                <button class="btn btn-light" @click="toggleMovie()">Добавить  фильм</button>
                <button class="btn btn-light" @click="toggleGenre()">Добавить жанр</button>
                <button class="btn btn-light" @click="toggleGenreDelete()">Удалить жанр</button>
            </div>
            <CreateMovie v-if="createMovieVisibility"></CreateMovie>
            <CreateGenre v-if="creteGenreVieisibility"></CreateGenre>
            <div class="admin__delete__genre" v-if="deleteGenreVieisibility">
                <p class="fs-3">Выберите жанр для удаления</p>
                <p v-for="genre in genres" 
                    :key="genre.id" 
                    @click="genreDelete(genre.id)"
                >
                {{ genre.name }}
                </p>
            </div>
        </div>
       
    </div>
</template>

<script>
import {findAllGenre, deleteOneGenre} from '@/api/movieApi'
import CreateGenre from '@/components/CreateGenre.vue'
import CreateMovie from '@/components/CreateMovie.vue'

export default {
    name: "adminPage",
    components: {
        CreateGenre, CreateMovie
    },
    data() {
        return {
            createMovieVisibility: false,
            creteGenreVieisibility: false,
            deleteGenreVieisibility: false,
            genres: []
        }
        
    },
    methods: {
      toggleMovie() {
        this.createMovieVisibility = !this.createMovieVisibility
      },

      toggleGenre() {
        this.creteGenreVieisibility = !this.creteGenreVieisibility
      },
      toggleGenreDelete() {
        this.deleteGenreVieisibility = !this.deleteGenreVieisibility
      },
      
      async getGenre() {
        const response = await findAllGenre()
        this.genres = response
      },

      async genreDelete(id) {
        const response = await deleteOneGenre(id)
        console.log(response)
      }
    },

    mounted() {
        this.getGenre()
    }
}
</script>

<style scoped lang="scss">
.container {
    color: white;
    .admin {
        display: flex;
        flex-direction: column;
        &__action {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
            .btn {
                margin-left: 15px;
            }
        }
    }
}
</style>