<template>
    <form class="update__user" @submit.prevent="userUpdate">
        <p class="update__user_title fs-3">Редактировать</p>
        <div class="mb-3">
            <label for="nameUser" class="form-label">Имя</label>
            <input type="text" class="form-control" id="nameUser" v-model="name">
        </div>
        <div class="mb-3">
            <label for="emailUser" class="form-label">Email</label>
            <input type="text" class="form-control" id="emailUser" v-model="email">
        </div>
        <div class="mb-3">
            <label for="passwordUser" class="form-label">Пароль</label>
            <input type="text" class="form-control" id="passwordUser" v-model="password">
        </div>
        <button type="submit" class="btn btn-dark">Изменить</button>
    </form>                 
</template>

<script>
import {updateUser} from '@/api/userApi'

export default {
    name: "UpdateUser",
    props: {
        user: {
            type: Object
        }
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
        }
        
    },
    methods: {
      async userUpdate() {
        const data = await updateUser(this.$route.params.id, this.name, this.email, this.password)
        console.log(data)
      },
    },
}
</script>

<style scoped lang="scss">
.update__user {
    display: flex;
    flex-direction: column;
    margin-right: 350px;
    margin-left: 350px;
    &_title {
        text-align: center
    }
    &_btn {
        margin-left: 150px;
        margin-right: 150px;
    }
}

</style>