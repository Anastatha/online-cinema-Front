<template>
    <div class="container">
        <div class="row">
            <div class="col-3 card">
                <h5 class="card-title text-white mt-3">Топ фильмов</h5>
                <MovieItemLeft
                    v-for="movie in movieOpened"
                    :key="movie.id"
                    :movie="movie"/>
            </div>
            <div class="col-9">
                <div class="movie">
                    <div class="movie__img">
                        <img class="img" :src="moviePoster + movieI.poster" alt="">
                        <div class="favorit">
                            <button v-if="getAuth === true" class="btn btn-light mt-3" @click="addFavorite"><p class="mb-0">В закладки</p></button>
                        </div>
                    </div>
                    <div class="movie__contant">
                        <p class="movie__contant_title text-white fs-2">{{ movieI.title }} ({{ movieI.yers }})</p>
                        <div class="movie__contant_text">
                            <span class="text-white">{{ movieI.description }}</span>
                        </div>
                        <br>
                        <ul class="movie__contant_lines">
                            <li>
                                <div class="label">Год выпуска: </div>
                                <div class="desc">{{ movieI.yers }}</div>
                            </li>
                            <li>
                                <div class="label">Страна: </div>
                                <div class="desc">{{ movieI.country }}</div>
                            </li>
                             <li>
                                <div class="label">Жанр: </div>
                                <div class="desc" v-for="movie in movieI.genre"
                                    :key="movie.id"
                                >
                                <div class="desc_info">{{ movie.name }}</div>
                                </div>
                            </li>
                            <li>
                                <div class="label">В ролях: </div>
                                <div class="desc">
                                <span class="spicok" v-for="movieActor in movieI.actor"
                                    :key="movieActor.id"
                                    @click="$router.push(`/actor/${movieActor.id}`)"
                                    >{{ movieActor.name }}
                                </span>
                                </div>
                            </li>
                        </ul>
                        <div class="movie__contant_opened">
                            <span><font-awesome-icon icon="fa fa-eye"/> {{movieI.coundOpened }}</span>
                        </div>
                        <br>
                        <div class="movie__contant_rates">
                            <div class="movie__contant_rates_fx">
                                Рейтинг:<span style="margin-left: 15px;">{{movieI.general_rating }}</span>
                            </div>
                        </div>
                        <br>
                        <div class="movie__contant_rates_cr">
                            Ваша оценка: 
                            <button class="btn btn-light" style="margin-right: 5px; margin-left: 10px;" @click="addRating(1)"><p class="mb-0">1</p></button>
                            <button class="btn btn-light" style="margin-right: 5px;" @click="addRating(2)"><p class="mb-0">2</p></button>
                            <button class="btn btn-light" style="margin-right: 5px;" @click="addRating(3)"><p class="mb-0">3</p></button>
                            <button class="btn btn-light" style="margin-right: 5px;" @click="addRating(4)"><p class="mb-0">4</p></button>
                            <button class="btn btn-light" @click="addRating(5)"><p class="mb-0">5</p></button>
                        </div>
                        <div class="movie__contant_action">
                            <button class="btn btn-light" 
                                v-if="usRole()" 
                                @click="deleteMovie"    
                                >Удалить
                            </button>
                            <button class="btn btn-light" 
                                @click="toggleMovie()" 
                                v-if="usRole()"
                                >Изменить
                            </button>
                        </div>
                    </div>
                </div>
                <div class="update__movie" v-if="updateMovieVisibility">
                    <UpdateMovie 
                        :movie="movieI"
                    />
                </div>
                <div class="title">
                    <p class="fs-4 text-white">{{ movieI.title }}</p>
                </div>
                <div class="show">
                    <iframe v-if="usRole()" style="margin-right: 15px; margin-bottom: 15px;" width="980" height="500" :src="movieI.video" frameborder="0"  allowfullscreen></iframe>
                    <div v-else class="show__error">Для просмотра фильма, оформити подписку</div>
                </div>
                <div class="comments__movie">
                    <div class="comments__movie__head">
                        <div class="comments__movie__head_title">Комментарии</div>
                        <div class="comments__movie__head_add">
                            <button class="btn btn-light" v-if="getAuth === true" @click="toggleComment()" >Комментировать</button>
                        </div>
                    </div>
                    <CreateComment
                        v-if="createCommentVisibility"
                        :user="getUser"
                        :movie="movieI"
                    />
                    <div class="comments__movie__items">
                        <CommentsItem
                            v-for="comment in comments"
                            :key="comment.id"
                            :comment="comment"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {findOneMovie, toggleFavorite, createRating,  deleteOneMovie, findCommentsByMovie, updateCountOpened} from '@/api/movieApi'
import { mapActions, mapGetters } from 'vuex';
import MovieItem from '@/components/MovieItem.vue';
import MovieItemLeft from '@/components/MovieItemLeft.vue';
import UpdateMovie from '@/components/UpdateMovie.vue';
import CreateComment from '@/components/CreateComment.vue';
import CommentsItem from '@/components/CommentsItem.vue';

export default {
    name: 'MoviePage',
    components: {
    MovieItem,
    MovieItemLeft,
    UpdateMovie,
    CreateComment,
    CommentsItem
},
    data() {
        return {
            movieI: {},
            moviePoster: 'http://localhost:7000',
            roleA: false,
            updateMovieVisibility: false,
            createCommentVisibility: false,
            comments: {},
        }
    },
    created() {
        this.setUser(JSON.parse(localStorage.getItem('user')))
        this.setAuth(true)
    },
    methods: {
        ...mapActions({
            // setMovieOn: 'movie/setMovieOne',
            setMovieOpened: 'movie/setMovieOpened',
            setUser: 'user/setUser',
            setAuth: 'user/setAuth'
        }),
        async fethOneMovie() {
            try {
                const response = await findOneMovie(this.$route.params.id)
                this.movieI = response
                console.log(this.movieI)
            } catch(error) {
                console.log(error)
            }
        },

        async updateOpened() {
            const response = await updateCountOpened(this.$route.params.id)
            console.log(response)
        },

        async addFavorite() {
            const response = await toggleFavorite(this.getUser.id, this.movieI.id)
            console.log(response)
        },

        async addRating(value) {
            const response = await createRating(this.getUser.id, this.movieI.id, value)
            console.log(response)
        },

        async deleteMovie() {
            const response = await deleteOneMovie(this.movieI.id)
            console.log(response)
            this.$router.push('/')
        },

        async findComments() {
            const response = await findCommentsByMovie(this.$route.params.id)
            this.comments = response
            console.log(this.comments)
        },

        usRole() {
            try{    
                for(let i = 0; i < this.getUser.role.length; i++) {
                    if(this.getUser.role[i].value == "ADMIN") {
                        this.roleA = true
                    }
                }
            } catch (e){}
            return this.roleA
        },

        toggleMovie() {
           this.updateMovieVisibility = !this.updateMovieVisibility
        },

        toggleComment() {
            this.createCommentVisibility = !this.createCommentVisibility
        }
    },
    computed: {
        ...mapGetters({
            movieOpened: 'movie/getMovieOpened',
            getUser: 'user/getUser',
            getAuth: 'user/getAuth',
            movies: 'movie/getMovie',
        }),
    },
    mounted() {
        this.fethOneMovie(),
        this.usRole(),
        this.findComments(),
        this.updateOpened()
    }
}
</script>

<style scoped lang="scss">
.movie {
    display: flex;
    flex-direction: row;
    background-color: $color-gray;
    padding-top: 15px;
    padding-left: 15px;
    &__img {
        .img {
            widows: 218px;
            height: 308px;
        }
    }
    &__contant {
        padding-left: 20px;
        width: 100%;
        &_title {
            display: flex;
        }
        &_text {
            display: flex;
            padding-right: 50px;
        }
        &_lines {
            border-bottom: 1px dashed #e3e3e3;
            margin-right: 20px;
            li {
                display: table;
                padding-bottom: 10px;
            } 
            ul {
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
                &_info {
                    display: flex;
                }
            }
            .spicok {
                padding-right: 15px;
                cursor: pointer;
            }
        }
        &_opened {
            height: 40px;
            line-height: 40px;
            color: white;
            float: left;
        }
        &_rates {
            margin-top: 17px;
            &_fx {
                color: white;
                float: left;
            }
            &_cr {
                color: white;
                float: left;   
            }
        }
        &_action {
            button {
                margin-left: 10px;
            }
        }  
    }
}
.show {
    display: flex;
    flex-direction: row;
    background-color: $color-gray;
    padding-top: 15px;
    padding-left: 15px;
    color: white;
    &__error {
        font-size: 20px;
        font-weight: 700;
        line-height: 38px;
    }
}
.title {
    display: flex;
    background-color: $color-gray;
    justify-content: center;
    padding-top: 15px;
}
.update__movie {
    background-color: $color-gray;
    color: white;
    padding-top: 15px;
    display: flex;
    justify-content: center;
}
.comments__movie {
    background-color: $color-gray;
    color: white;
    padding: 15px;
    &__head {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        &_title {
            font-size: 20px;
            font-weight: 700;
            line-height: 38px;
        }
    }
    &__items {
        margin-top: 15px;
    }
}
</style>