<template>
    <form class="create__actor" @submit.prevent="actorUpdate">
        <p class="create__actor_title fs-3">Редактировать актера</p>
        <div class="mb-3">
            <label for="titleMovie" class="form-label">Имя</label>
            <input type="text" class="form-control" id="titleMovie" :value="nameActor" @input="nameActor = $event.target.value">
        </div>
        <div class="mb-3">
            <label for="titleMovie" class="form-label">Описание</label>
            <input type="text" class="form-control" id="titleMovie" :value="descriptionActor" @input="descriptionActor = $event.target.value">
        </div>
        <div class="mb-3">
            <label for="formFileActor" class="form-label">Постер</label>
            <input class="form-control" type="file" id="formFileActor" ref="files" v-on:change="handleFileUploadActor()">
        </div>
        <button type="submit" class="btn btn-dark">Изменить</button>
    </form>                 
</template>

<script>
import {updateActor, fi} from '@/api/movieApi'

export default {
    name: "UpdateActor",
    props: {
        actor: {
            type: Object
        }
    },
    data() {
        return {
            nameActor: this.actor.name,
            descriptionActor: this.actor.description,
            posterActor: [],
        }
        
    },
    methods: {
      async actorUpdate() {
        const data = await updateActor(this.actor.id, this.nameActor, this.descriptionActor, this.actor.poster)
        console.log(data)
      },

      async handleFileUploadActor(){
        let response = await fi(this.$refs.files.files[0])
        this.actor.poster = response[0].url
        console.log(this.actor.poster)
      },
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