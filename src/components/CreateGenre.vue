<template>
    <form class="create__genre" @submit.prevent="addGenre">
        <p class="fs-3">Создать жанр</p>
        <div class="mb-3">
            <label for="nameGenre" class="form-label">Название</label>
            <input type="text" class="form-control" id="nameGenre" v-model="name">
        </div>
        <button type="submit" class="btn btn-light">Добавить</button>
    </form>

</template>

<script>
import {createGenre} from '@/api/movieApi'

export default {
    name: "CreateGenre",
    data() {
        return {
            name: ''
        }
    },
    methods: {
        async addGenre() {
            const response = await createGenre(this.name)
            console.log(response)
        }
    },
}
</script>

<style scoped lang="scss">
.create__genre {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>