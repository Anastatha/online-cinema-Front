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
                <div class="actor">
                    <div class="actor__img">
                        <!-- <img class="img" src="@/assets/poster.png" alt=""> -->
                        <img class="img" :src="actorPoster + actor.poster" alt="">
                        <!-- <div class="favorit">
                            <button class="btn btn-light mt-3" @click="addFavorite"><p class="mb-0">В закладки</p></button>
                        </div> -->
                    </div>
                    <div class="actor__contant">
                        <p class="actor__contant_title text-white fs-2">{{ actor.name }}</p>
                        <br>
                        <ul class="actor__contant_lines">
                            <li>
                                <div class="label">День рождения: </div>
                                <div class="desc"> {{ dataBirth }} </div>
                            </li>
                            <li>
                                <div class="label">Место рождения: </div>
                                <div class="desc">{{ actor.placeBirth }}</div>
                            </li>
                        </ul>
                        <div class="actor__contant_action">
                            <button class="btn btn-light" 
                                v-if="usRole()"
                                @click="deleteActor"    
                                >Удалить 
                            </button>
                            <button class="btn btn-light" 
                                v-if="usRole()"
                                @click="toggleActor()"
                                >Изменить
                            </button>
                        </div>
                    </div>
                </div>
                <div class="update__actor" v-if="updateActorVisibility">
                    <UpdateActor
                        :actor="actor"
                    />
                </div>
                <div class="actor__description">
                    <p>{{ actor.description}}</p>
                </div>
                <div class="actor__movie">
                    <p class="actor__movie_title text-white fs-4">Фильмография:</p>
                    <div class="col-12 card">
                        <MovieItem
                            v-for="movie in actor.movie"
                            :key="movie.id"
                            :movie="movie"
                        />
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import {findOneActor, deleteOneActor} from '@/api/movieApi'
import { mapActions, mapGetters } from 'vuex';
import MovieItem from '@/components/MovieItem.vue';
import MovieItemLeft from '@/components/MovieItemLeft.vue';
import UpdateActor from '@/components/UpdateActor.vue';

export default {
    name: 'ActorPage',
    components: {
        MovieItem, MovieItemLeft, UpdateActor
    },
    data() {
        return {
            actor: {},
            dataBirth: '',
            actorPoster: 'http://localhost:7000',
            roleA: false,
            updateActorVisibility: false
        }
    },
    methods: {
        ...mapActions({
            setMovieOpened: 'movie/setMovieOpened'
        }),

        async fethOneActor() {
            try {
                const response = await findOneActor(this.$route.params.id)
                this.dataBirth = response.dataBirth.substr(0, 10)
                this.actor = response
                console.log(this.actor)
            } catch(error) {
                console.log(error)
            }
        },

        async deleteActor() {
            const response = await deleteOneActor(this.actor.id)
            console.log(response)
            this.$router.push('/')
        },

        usRole() {
            try{    
                for(let i = 0; i < this.getUser.role.length; i++) {
                    if(this.getUser.role[i].value == "ADMIN") {
                        this.roleA = true
                    }
                }
            } catch (e){
                console.log(e)
            }
            return this.roleA
        },

        toggleActor() {
            this.updateActorVisibility = !this.updateActorVisibility
        }
    },
    computed: {
        ...mapGetters({
            movieOpened: 'movie/getMovieOpened',
            getUser: 'user/getUser',
        }),
    },
    mounted() {
        this.fethOneActor(),
        this.usRole()
    }
}
</script>

<style scoped lang="scss">
.actor {
    display: flex;
    flex-direction: row;
    background-color: $color-gray;
    padding-top: 15px;
    padding-left: 15px;
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
        }
        &_action {
            button {
                margin-left: 10px;
            }
        }
    }
}
.img {
    widows: 218px;
    height: 308px;
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
.spicok {
    padding-right: 15px;
}

.actor__description {
    display: flex;
    flex-direction: row;
    background-color: $color-gray;
    padding: 15px;
    color: white;
}
.actor__movie {
    display: flex;
    flex-direction: column;
    background-color: $color-gray;
    padding-top: 15px;
    &_title {
        display: flex;
        padding-left: 15px;
    }
}
.update__actor {
    background-color: $color-gray;
    color: white;
    padding-top: 15px;
    display: flex;
    justify-content: center;
}
</style>