<template>
    <form class="create__movie" @submit.prevent="movieUpdate">
        <p class="create__movie_title fs-3">Редактировать фильм</p>
                <div class="mb-3">
                    <label for="titleMovie" class="form-label">Название</label>
                    <input type="text" class="form-control" id="titleMovie" :value="title" @input="title = $event.target.value">
                </div>
                <div class="mb-3">
                    <label for="descriptiomMovie" class="form-label">Описание</label>
                    <textarea type="text" class="form-control" id="descriptiomMovie" rows="3" :value="description" @input="description=$event.target.value"></textarea>
                </div>
                <div class="mb-3">
                    <label for="yersMovie" class="form-label">Год</label>
                    <input type="number" class="form-control" id="yersMovie" :value="yers" @input="yers=$event.target.value">
                </div>
                <div class="mb-3">
                    <label for="durationMovie" class="form-label">Длительность</label>
                    <input type="number" class="form-control" id="durationMovie" :value="duration" @input="duration=$event.target.value">
                </div>
                <div class="mb-3">
                    <label for="countryMovie" class="form-label">Страна</label>
                    <input type="text" class="form-control" id="countryMovie" :value="country" @input="country=$event.target.value">
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Постер</label>
                    <input class="form-control" type="file" id="formFile" ref="file" v-on:change="handleFileUpload()">
                </div>
                <div class="mb-3">
                    <label for="videoMovie" class="form-label">Видео</label>
                    <input type="text" class="form-control" id="videoMovie" :value="video" @input="video=$event.target.value">
                </div>
                <div class="create__movie_actor">
                    <p class="create__movie_title fs-3">Актеры</p>
                    <div data-bs-spy="scroll" class="scrollspy" data-bs-target="#actor">
                        <div id="actor">
                            <p v-for="actor in actors" 
                                :key="actor.id" 
                                @click="addActorId(actor.id)"
                                :class="actorIds.includes(actor.id) ? 'red' : 'white'"
                            >
                            {{ actor.name }}
                            </p>
                        </div>
                    </div>
                    <span v-for="ac in  newActor" :key="ac.id" @click="addActorId(ac.id)">{{ ac.name }}</span>
                    <p class="fs-3">Актера нет списки? Создайте его</p>
                    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Создать
                    </button>
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Добавти нового актера</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        <div class="modal-body">
                            <form class="create__actor" @submit.prevent="actorCreate">
                                <div class="mb-3">
                                    <label for="titleMovie" class="form-label">Имя</label>
                                    <input type="text" class="form-control" id="titleMovie" v-model="nameActor">
                                </div>
                                <div class="mb-3">
                                    <label for="titleMovie" class="form-label">Описание</label>
                                    <input type="text" class="form-control" id="titleMovie" v-model="descriptionActor">
                                </div>
                                <div class="mb-3">
                                    <label for="formFileActor" class="form-label">Постер</label>
                                    <input class="form-control" type="file" id="formFileActor" ref="files" v-on:change="handleFileUploadActor()">
                                </div>
                                <div class="mb-3">
                                    <label for="titleMovie" class="form-label">Дата рождения</label>
                                    <input type="text" class="form-control" id="titleMovie" v-model="dataActor">
                                </div>
                                <div class="mb-3">
                                    <label for="titleMovie" class="form-label">Место рождения</label>
                                    <input type="text" class="form-control" id="titleMovie" v-model="placeActor">
                                </div>
                                <button type="submit" class="btn btn-dark">Создать</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="create__movie_genre">
                    <p class="create__movie_title fs-3">Жанры</p>
                    <div data-bs-spy="scroll" class="scrollspy" data-bs-target="#genre">
                        <div id="genre">
                            <p v-for="genre in genres" 
                                :key="genre.id" 
                                @click="addGenreId(genre.id)"
                                :class="genreIds.includes(genre.id) ? 'redd' : 'white'"
                            >
                            {{ genre.name }}
                            </p>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-dark create__movie_btn mb-5">Изменить</button>
            </form>
</template>

<script>
import {updateMovie, fi, findActor, createActor, findAllGenre} from '@/api/movieApi'

export default {
    name: "UpdateMovie",
    props: {
        movie: {
            type: Object
        }
    },
    data() {
        return {
            title: this.movie.title,
            description: this.movie.description,
            yers: this.movie.yers,
            duration: this.movie.duration,
            country: this.movie.country,
            poster: [],
            video: this.movie.video,
            //ACTORS
            actors: [],//массив актеров
            actorIds: [],//массив id выбранных актеров 
            nameActor: '',//для создания нового актера, если его нет всписки
            descriptionActor: '',//для создания нового актера
            posterActor: [],//для создания нового актера
            dataActor: '',
            placeActor: '',
            newActor: [],//массив новых актеров
            //GENRE
            genres: [],//массив жанров
            genreIds: [],//массив id выбранных жанров
        }
        
    },
    methods: {
      async movieUpdate() {
        const data = await updateMovie(this.movie.id, this.title, this.description, this.yers, this.duration, this.country, this.movie.poster, this.video, this.actorIds, this.genreIds)
        console.log(data)
      },

      async handleFileUpload(){
        let response = await fi(this.$refs.file.files[0])
        this.movie.poster = response[0].url
        console.log(this.movie.poster)
      },

      async getActor() {
        const response = await findActor()
        this.actors = response
      },

      addActorId(id) {
        if(this.actorIds.includes(id)) {
            this.actorIds = this.actorIds.filter((value) => {return value != id})
        } else {
            this.actorIds.push(id)
        }
        console.log(this.actorIds)
      },

      async actorCreate() {
        const response = await createActor(this.nameActor, this.descriptionActor, this.posterActor, this.dataActor, this.placeActor)
        this.newActor.push(response)
        console.log(this.newActor)
        for(let i = 0; i < this.newActor.length; i++) {
            let acId = this.newActor[i].id
            this.addActorId(acId)
        }
      },

      async handleFileUploadActor(){
        let response = await fi(this.$refs.files.files[0])
        this.posterActor = response[0].url
        console.log(this.posterActor)
      },

      async getGenre() {
        const response = await findAllGenre()
        this.genres = response
      },

      addGenreId(id) {
        if(this.genreIds.includes(id)) {
            this.genreIds = this.genreIds.filter((value) => {return value != id})
        } else {
            this.genreIds.push(id)
        }
      },
    },
    mounted() {
        this.getActor(),
        this.getGenre()
    },
}
</script>

<style scoped lang="scss">
.create__movie {
    display: flex;
    flex-direction: column;
    margin-right: 350px;
    margin-left: 350px;
    &_title {
        text-align: center
    }
    &_actor {
        margin-bottom: 25px;
    }
    &_genre {
        margin-bottom: 25px;;
    }
    &_btn {
        margin-left: 150px;
        margin-right: 150px;
    }
    .scrollspy {
        position: relative;
        height: 200px;
        overflow-y: scroll
    }
    .modal-content{
        color: black;
    }
    .red{
        color: rgb(82, 68, 91);
    }
}

</style>