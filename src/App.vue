<template>
  <NavBar></NavBar>
  <router-view/>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MainPage from './views/MainPage.vue';

export default{
  components: {
    NavBar,
    MainPage
}
}
</script>

<style lang="scss">
html {
  background-color: $color-black;
}
#app {
  text-align: center;
  background-color: $color-black;
}
</style>
