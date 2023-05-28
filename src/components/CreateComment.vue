<template>
    <form class="create__comment" @submit.prevent="commentCreate">
        <div class="create__comment__editor">
            <div class="create__comment__editor_action">
            <label for="valueComment" class="title">Написать</label>
            <textarea type="text" class="text" id="valueComment" rows="4" cols="95" v-model="value"></textarea>
            </div>
            <div class="create__comment__editor_btn">
                <button type="submit" class="btn btn-light">Отправить</button>
            </div>
        </div>
    </form>                 
</template>

<script>
import {createComment} from '@/api/movieApi'

export default {
    name: "CreateComment",
    props: {
        user: {
            type: Object
        },
        movie: {
            type: Object
        }
    },
    data() {
        return {
            value: '',
        }
        
    },
    methods: {
      async commentCreate() {
        const data = await createComment(this.user.id, this.movie.id, this.value)
        console.log(data)
      },
    },
}
</script>

<style scoped lang="scss">
.create__comment {
    display: block;
    margin-top: 20px;
    &__editor {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        &_action {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .title {
            font-weight: 700;
            margin-top: 10px;
            font-size: 18px;
            }
            .text {
                margin-top: 20px;
                font-size: 16px;
                border-radius:3px;
                box-shadow: inset 0px 0px 15px 0px rgba(0, 0, 0, .45);
                outline: none;
            }
        }
        &_btn {
            padding-top: 50px;
            .btn {
                width: 151px;
            }
        }
    }
}

</style>