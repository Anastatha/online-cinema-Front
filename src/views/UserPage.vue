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
                <div class="user">
                    <div class="user__img">
                        <img class="img" src="../assets/poster.png" alt="userImage">
                    </div>
                    <div class="user__contant">
                        <p class="user__contant_title text-white fs-4">Email: {{ getUser.email }}</p>
                        <p class="fs-4 user__contant_title text-white">Роль</p>
                        <p class="user__contant_role text-white fs-5"
                            v-for="role in getUser.role" :key="role.id">
                            {{ role.value }}
                        </p>
                        <div class="user__action">
                            <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Офрмить подписку</button>
                            <button class="btn btn-light" @click="toggleUser()">редактировать</button>
                        </div>
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Оформление подписки</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                            </div>
                            <div class="modal-body">
                                <form class="create__actor" @submit.prevent="roleAdd">
                                    <div class="mb-3">
                                        <label for="userPassword" class="form-label">Ведити email</label>
                                        <input type="text" class="form-control" id="userPassword" v-model="email">
                                        <p v-if="addRole == true">Подписка оформлена</p>
                                        <p v-if="addRoleFalse == true">Попробуйте еще раз</p>
                                    </div>
                                    <button type="submit" class="btn btn-dark">Оформить</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="update__user" v-if="updateUserVisibility">
                    <UpdateUser 
                        :user="getUser"
                    />
                </div>
                <div class="user__favorit">
                    <p class="user__favorit_title text-white fs-4">Мои закладки</p>
                    <div class="col-12 card">
                        <MovieItem
                            v-for="movie in userFavorites.favorites"
                            :key="movie.id"
                            :movie="movie"
                            />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import MovieItem from '@/components/MovieItem.vue';
import { mapActions, mapGetters } from 'vuex';
import {getFavirite} from '@/api/movieApi'
import {addRole} from '@/api/userApi'
import MovieItemLeft from '@/components/MovieItemLeft.vue';
import UpdateUser from '@/components/UpdateUser.vue';

export default {
    name: 'UserPage',
    components: {
    MovieItem,
    MovieItemLeft,
    UpdateUser
},
    data() {
        return {
            userFavorites: {},
            email: '',
            updateUserVisibility: false,
            addRole: false,
            addRoleFalse: false
        }
    },
    methods: {
        async favirite() {
            const response = await getFavirite(this.$route.params.id)
            this.userFavorites = response
            try{
                
                for(let i = 0 ; i < response.role.length;i++){
                    console.log(response.role[i].value)
                }
            } catch (e){
                console.log(e)
            }
            console.log(response)
        },

        async roleAdd() {
            try{
                if(this.getUser.email == this.email) {
                    const response = await addRole(this.$route.params.id)
                    this.addRole = true
                    this.addRoleFalse = false
                } else {
                    this.addRoleFalse = true
                }
            } catch (e) {
                this.addRoleFalse = true
                console.log(e)
            }
        },

        toggleUser() {
            this.updateUserVisibility = !this.updateUserVisibility
        }
    },
    computed: {
        ...mapGetters({
            movieOpened: 'movie/getMovieOpened',
            getUser: 'user/getUser',
        }),
    },
    mounted() {
        this.favirite()
    }
}
</script>

<style scoped lang="scss">
.user {
    display: flex;
    flex-direction: row;
    background-color: $color-gray;
    padding-top: 15px;
    padding-left: 15px;
    &__contant {
        padding-left: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;   
        &_title {
            display: flex;
        }
        &_role {
            display: flex;
        }    
    }
    &__action {
        button {
            margin-right: 15px;
            float: left;
        }
    }
}
.img {
    widows: 218px;
    height: 308px;
}
.user__favorit {
    display: flex;
    background-color: $color-gray;
    padding-left: 15px;
    padding-top: 50px;
    flex-direction: column;
}
.update__user {
    color: white;
    background-color: $color-gray;
    padding-top: 15px;
}
</style>