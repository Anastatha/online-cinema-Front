<template>
    <div class="container">
    <div class="card" style="width: 25rem;">
    <form @submit.prevent="_registration">
        <div class="card-content mt-5">
            <h3 class="card-title text-white">Регестрация</h3>
            <div class="mb-2">
                <label for="email" class="col-form-label text-white">Email</label>
                <input
                    class="form-control"
                    name="email"
                    type="text"
                    v-model="email"
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
                    name="password"
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
                есть аккаунт?
                <router-link to="/login" class="link text-white">Войти</router-link>
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
import { registration } from '@/api/userApi';

export default {
    name: 'registration',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    validations () {
        return {
            email: { required, email },
            password: {required, minLength: minLength(6)}
        }
    },
    methods: {
        ...mapActions({
            setUser: 'user/setUser',
            setAuth: 'user/setAuth'
        }),
        async _registration() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }

            let data = await registration(this.email, this.password)
            this.setUser(data)
            this.setAuth(true)
            this.$router.push('/')
        },
    },
    computed: {
        ...mapGetters({
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