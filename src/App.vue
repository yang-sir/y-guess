<template>
  <div id="app">
    <v-draw></v-draw>
    <router-link to='/Room'>room</router-link>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript6">
import Draw from './components/draw/draw.vue';
export default {
  components: {
    'v-draw': Draw
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus"> 

</style>
