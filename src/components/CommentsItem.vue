<template>
    <div class="comment">
        <div class="comment__head">
            <div class="comment__head_title" 
                @click="$router.push(`/user/${comment.user.id}`)">
                {{ comment.user.name }}
            </div>
            <div class="comment__head_data">{{ commentCreate }}</div>
        </div>
        <div class="comment__contant">
            <div class="comment__contant_text">{{ comment.value }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "CommentsItem",
    props: {
        comment: {
            type: Object
        }
    },
    data() {
      return {
        commentCreate: this.comment.createdAt.substr(0, 10)
      }
    },
}
</script>

<style scoped lang="scss">
.comment {
    background-color: $color-gray;
    color: white;
    padding: 30px;
    display: flex;
    flex-direction: column;
    &__head {
        margin-top: 15px;
        display: flex;
        &_title {
            font-size: 20px;
            font-weight: 700;
            line-height: 38px;
        }
        &_data {
            margin-left: 20px;
            line-height: 38px;
        }
    }
    &__contant {
        display: flex;
        padding-left: 20px;
        &_text {
            font-size: 20px;
            line-height: 38px;
        }
    }
}

</style>