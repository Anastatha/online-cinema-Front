<template>
    <div class="container">
    <div class="card" style="width: 25rem;">
    <form @submit.prevent="_login">
        <div class="card-content mt-5">
            <h3 class="card-title text-white">Авторизация</h3>
            <div class="mb-2">
                <label for="email" class="col-form-label text-white">Email</label>
                <input
                    class="form-control" 
                    id="email"
                    type="text"
                    v-model.trim="email"
                    :class="{invalid: (v$.email.$dirty && !v$.email.required) || (v$.email.$dirty && !v$.email.email)}"
                > 
                <p class="form-text text-danger" v-if="v$.email.$error">
                    Неверный email
                </p>
            </div>
            <div class="mb-2">
                <label for="password" class="col-form-label text-white">Пароль</label>
                <input
                    class="form-control"
                    id="password"
                    type="password"
                    v-model="password"
                >
                <p class="form-text text-danger" v-if="v$.password.$error"
                >Неверный пароль</p>
            </div>
        </div>
        <div class="card-action">
            <div>
            <button type="submit" class="btn btn-light">Войти</button>
            </div>
            <p class="mt-4 text-white">
                Нет аккаунта?
                <router-link to="/registration" class="link text-white">Зарегистрироваться</router-link>
            </p>
            <p class="form-text text-danger">
                    {{ error }}
            </p>
        </div>
    </form>
    </div>
    </div>
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex';
import { login } from '@/api/userApi';

import axios from 'axios';


export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
            email: { required, email },
            password: {required, minLength: minLength(2)}
        }
    },
    methods: {
        ...mapActions({
            login: 'user/login',
            setUser: 'user/setUser',
            setAuth: 'user/setAuth'
        }),
        // _login() {//если делать запрос через vuex
        //     if (this.v$.$invalid) {
        //         this.v$.$touch()
        //         return
        //     }
        //     let data = {email: this.email, password: this.password}
        //     this.login(data)
        //     this.setAuth(true)
        //     this.$router.push('/')
        // },
        async _login() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                let data = await login(this.email, this.password)
                localStorage.setItem('user', JSON.stringify(data))
                this.setUser(data)
                this.setAuth(true)
                this.$router.push('/')
            } catch (err) {
                this.error = 'Неверное веденные данные'
            }
        }
    },
    computed: {
        ...mapGetters({
            USER: 'user/USER',
            getUser: 'user/getUser',
            getAuth: 'user/getAuth'
        })
    },
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    .card {
        background-color: $color-gray;
        margin-top: 20px;
        &-content {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .link {
            text-decoration: none;
            color:$color-black;
        }
    }
}
</style>