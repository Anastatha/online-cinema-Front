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
            <div class="card">
                <h5 class="card-title text-white  pad">Отчеты</h5>
                <div class="othet">
                    <p class="othet__text text-white fs-4">
                        Посмотрите отчет о количестве просморов фильмов
                        <button class="btn btn-light" @click="findOthetOne">Получить</button>
                    </p>
                    <div class="card text-white" v-if="showOthetOne">
                        <button class="btn btn-light" @click="generatePDF(getOthetOne)">Скачать отчет в excel файле</button>
                        <table class="table text-white">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Количество открытий</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in getOthetOne" :key="item.id">
                                <th scope="row">{{index}}</th>
                                <td>{{ item.title }}</td>
                                <td>{{ item.coundOpened }}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
                <div class="othet">
                    <p class="othet__text text-white fs-4">
                        Посмотрите отчет о рейтинги фильмов по жанрам
                        <p class="card-text text-white fs-5 coursor"
                            v-for="genre in allGenre"
                            :key="genre.id"
                            @click="findOthetTwo(genre.id)"
                        >{{ genre.name }}
                        </p>
                    </p>
                    <div class="card text-white" v-if="showOthetTwo">
                        <button class="btn btn-light" @click="generatePDF2(getOthetTwo)">Скачать отчет в excel файле</button>
                        <table class="table text-white">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Рейтинг</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in getOthetTwo" :key="item.id">
                                <th scope="row">{{index}}</th>
                                <td>{{ item.title }}</td>
                                <td>{{ item.ratings }}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                </div>
                <div class="othet">
                    <p class="othet__text text-white fs-4">
                        Посмотрите отчет о количестве людей пользующихся сайтом с подпиской
                        <button class="btn btn-light" @click="findOthetTree">Получить</button>
                    </p>
                    <div class="card text-white" v-if="showOthetTree">
                        <button class="btn btn-light" @click="generatePDF3(getOthetTree)">Скачать отчет в excel файле</button>
                        <table class="table text-white">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Имя пользователя</th>
                                <th scope="col">Email пользователя</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in getOthetTree[0]" :key="item.id">
                                <th scope="row">{{index}}</th>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                </tr>
                            </tbody>
                            </table>
                            <span class="count__User fs-3">Общее количство: {{ getOthetTree[1] }}</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import MovieItem from '@/components/MovieItem.vue';
import MovieItemLeft from '@/components/MovieItemLeft.vue';
import { mapActions, mapGetters } from 'vuex';
import {findByOpened, findAllGenre} from '@/api/movieApi'
import { othetOne, othetTwo, othetTree } from '@/api/othetApi';

import xlsx from "json-as-xlsx"

export default {
    name: "othet",
    components: {
        MovieList, MovieItem, MovieItemLeft
    },
    data() {
        return {
            getOthetOne: {},
            getOthetTwo: {},
            getOthetTree: {},
            showOthetOne: false,
            showOthetTwo: false,
            showOthetTree: false,
            allGenre: {}
        }
    },
    methods: {
        ...mapActions({
            setMovie: 'movie/setMovie',
            setMovieOpened: 'movie/setMovieOpened'
        }),
        async findOpened() {
            try {
                const response = await findByOpened()
                this.setMovieOpened(response)
            } catch(error) {
                console.log(error)
            }
        },
        async findOthetOne() {
            const response = await othetOne()
            this.getOthetOne = response
            console.log(this.getOthetOne)
            console.log(response)
            this.showOthetOne = !this.showOthetOne
        },
        generatePDF(othet){
            let data = [
                {
                    sheet: "Othet",
                    columns: [
                        {label: "Название", value: "title"},
                        {label: "Количество открытий", value: "coundOpened"}
                    ],
                    content: othet
                },
            ]
            let settings = {
            fileName: "MySpreadsheet", 
            extraLength: 3,
            writeMode: "writeFile", 
            writeOptions: {}, 
            RTL: false, 
            }

            xlsx(data, settings)
        },
        async findOthetTwo(genreId) {
            const response = await othetTwo(genreId)
            this.getOthetTwo = response
            console.log(this.getOthetTwo)
            this.showOthetTwo = !this.showOthetTwo
        },
        generatePDF2(othet){
            let data = [
                {
                    sheet: "Othet",
                    columns: [
                        {label: "Название", value: "title"},
                        {label: "Рейтинг", value: "ratings"}
                    ],
                    content: othet
                },
            ]
            let settings = {
            fileName: "MySpreadsheet", 
            extraLength: 3,
            writeMode: "writeFile", 
            writeOptions: {}, 
            RTL: false, 
            }

            xlsx(data, settings)
        },        
        generatePDF3(othet){
            let data = [
                {
                    sheet: "Othet",
                    columns: [
                        {label: "Имя", value: "name"},
                        {label: "Почта", value: "email"}
                    ],
                    content: othet
                },
            ]
            let settings = {
            fileName: "MySpreadsheet", 
            extraLength: 3,
            writeMode: "writeFile", 
            writeOptions: {}, 
            RTL: false, 
            }

            xlsx(data, settings)
        },
        async findOthetTree() {
            const response = await othetTree()
            this.getOthetTree = response
            console.log(this.getOthetTree)
            this.showOthetTree = !this.showOthetTree
        },
        async fethGenre() {
            try {
                const response = await findAllGenre()
                this.allGenre = response
                console.log(response)
            } catch(error) {
                console.log(error)
            }
        },
    },
    computed: {
        ...mapGetters({
            movies: 'movie/getMovie',
            movieOpened: 'movie/getMovieOpened',
        }),
    },
    mounted() {
        this.findOpened(),
        this.fethGenre()
    }
}
</script>

<style lang="scss" scope>
.container {
    background-color: $color-black;
    margin-top: 20px;
    .pad {
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        margin-left: 26px;
    }
    .card {
        background-color: $color-gray;
        border: none;
    }
    .count__User {
        display: flex;
        justify-content: flex-end;
        margin-right: 75px;
        margin-bottom: 20px;
    }
}
</style>

//xml