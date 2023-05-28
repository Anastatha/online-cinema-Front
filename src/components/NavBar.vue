<template>
    <nav class="navbar navbar-expand-lg background-color">
        <div class="container background-color">
            <router-link :to="{name: 'main'}" class="navbar-brand fs-2 text-white">Cinema</router-link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link :to="{name: 'main'}" class="nav-link fs-5 text-white">Фильмы</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{name: 'genre'}" class="nav-link fs-5 text-white">Жанры</router-link>
                    </li>
                    <li class="nav-item" v-if="usRole()">
                        <router-link :to="{name: 'othet'}" class="nav-link fs-5 text-white">Статистика</router-link>
                    </li>
                    <li class="nav-item" v-if="usRole()">
                        <router-link :to="{name: 'admin'}" class="nav-link fs-5 text-white">Редактирование</router-link>
                    </li>
                </ul>
            </div>
            <div class="navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav float-right mb-2 mb-lg-0">
                    <li class=" nav-item header__icons">
                        <a class="nav-link fs-5 text-white fas fa-search" id="search-icon" 
                            @click="searc"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /> Поиск</a>
                    </li>
                    <form @submit.prevent id="search__form" @keyup.esc="close">
                        <div class="search">
                            <input type="search" 
                                placeholder="Поиск" 
                                id="search-box" 
                                class="form-control"
                                v-model="searchTerm"
                            >
                            <label for="search-box"><i class="fas fa-search"></i></label>
                            <button class="search__btn btn__search">
                                <a  @click="findMovieSearch(searchTerm)"><font-awesome-icon icon="fa-solid fa-magnifying-glass"/></a>
                            </button>
                        </div>
                        <a id="close" @click="close">
                        <font-awesome-icon icon="fa-solid fa-xmark" /></a>
                        <div class="search__movie" v-for="movie in searchMovie" :key="movie.id">
                            <div class="search__movie_title">
                                <p class="text-white fs-5" 
                                    @click="routeAndClose(movie.id)">
                                    {{ movie.title }} ({{ movie.yers }})
                                </p>
                            </div>
                        </div>
                    </form>
                    <li class="nav-item">
                        <div class="dropdown">
                            <a class="nav-link dropdown-toggle fs-5 text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li v-if="getAuth === true">
                                    <p @click="$router.push(`/user/${getUser.id}`)" class="nav-link fs-6 text-black profil">Мой профиль</p>
                                </li>
                                <li v-if="getAuth === true">
                                    <p @click="logout()" class="nav-link fs-6 text-black profil">Выход</p>
                                    <!-- <router-link :to="{name: 'main'}" class="nav-link fs-6 text-black" >Выход</router-link> -->
                                </li>
                                <li v-else="getAuth === false">
                                    <router-link :to="{name: 'login'}" class="nav-link fs-6 text-black">Вход</router-link>
                                </li>
                                <li>
                                    <router-link :to="{name: 'registration'}" class="nav-link fs-6 text-black">Регестрация</router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>   
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {findAllMovieSearch} from '@/api/movieApi'

export default {
    name: 'NavBar',
    data() {
        return {
            roleA: false,
            searchTerm: '',
            searchMovie: {}
        }
    },
    computed: {
        ...mapGetters({
            getAuth: 'user/getAuth',
            getUser: 'user/getUser',
            movies: 'movie/getMovie',
        }),
    }, 
    created() {
        this.setUser(JSON.parse(localStorage.getItem('user')))
        if(localStorage.getItem("user") != null) {
            this.setAuth(true)
        }
    },
    methods: {
        ...mapActions({
            setAuth: 'user/setAuth',
            setUser: 'user/setUser',
        }),
        async findMovieSearch() {
            try {
                if(this.searchTerm.length) {
                    const response = await findAllMovieSearch(this.searchTerm)
                    this.searchMovie = response
                    console.log(response)
                }
            } catch(e) {
                console.log(e)
            }
        },
        searc() {
            document.querySelector('#search__form').classList.toggle('active');
        },
        close() {
            document.querySelector('#search__form').classList.remove('active');
        },
        usRole() {
            try{
                for(let i = 0; i < this.getUser.role.length; i++) {
                    if(this.getUser.role[i].value == "ADMIN") {
                        this.roleA = true
                    }
                }
            } catch(e){}
            return this.roleA
        },
        routeAndClose(id) {
            this.$router.push(`/movie/${id}`)
            this.close()
        },
        logout() {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            this.setUser({})
            this.setAuth(false)
            this.$router.push(`/`)
        }
    },
    watch: {
        searchTerm() {
            this.findMovieSearch(this.searchTerm)
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 0;
}
.background-color {
    background-color: $color-gray;
}
.navbar-collapse {
    justify-content: flex-end;
}
.search {
    display: flex;
    flex-direction: row;
    
}

#search__form {
        position: fixed;
        top: -110%; 
        left: 0; 
        height: 100%; 
        width: 100%;
        z-index: 1004;
        background:rgba(0,0,0,.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        flex-direction: column;
}
#search__form.active {
        top: 0;
    }
#search__form #search-box {
        width: 850px;
        height: 50px;
        border: none;
        border-bottom: 1px solid rgba(255,255,255,.48);
        padding: 1rem 0;
        color: #16222e;
        font-size: 2rem;
        text-transform: none;
    }
#search__form #search-box::placeholder {
        color:rgba(14, 10, 10, 0.48);
    }
#search__form label {
        background: transparent;
        cursor: pointer;
        font-size: 3rem;
    }
#search__form #close {
        position: absolute;
        color: rgba(255,255,255,.48);
        cursor: pointer;
        top: 2rem;
        right: 3rem;
        font-size: 2rem;
    }
.btn__search {
    background-color: rgba(28,28,28,0);
    color:azure;
    border: none;
    height: 50px;
}
#search__form i {
        background: transparent;
        padding-left: 10px;
    }
.profil {
    margin-bottom: 0;
    cursor: pointer;
}

</style>