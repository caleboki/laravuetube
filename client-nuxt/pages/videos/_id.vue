<template>
    <div>
        <nuxt-child :video="video"></nuxt-child>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    head() {
      return {
        title: '',
        titleTemplate: `%s ${this.video.name} - Vue Screencasts`
      }
    },

    async fetch({$axios, params, store}) {
      let response = await $axios.get(`/videos/${params.id}`)
      let video = response.data.video
      store.commit('SET_CURRENT_VIDEO', video);
    },

    computed: {
      ...mapState({
        video: 'currentVideo'
      })
    }
    
}
</script>

<style scoped>

</style>