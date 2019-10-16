<template>
<!-- <div>
  <video-player class="video-player-box"
                ref="videoPlayer"
                :options="playerOptions">
  </video-player>

  
  <span v-for="tag_id in video.tags" :key="tag_id.id">
    <router-link :to="{ name: 'tag', params: {id: tag_id.id}}">
      <button class="tag-button">{{tag_id.name}}</button>
    </router-link>
    
  </span>
  
  
  <h1>{{video.name}}</h1>
  <div v-html="video.description"></div>
</div> -->

<v-container>
    <v-row>
      <v-col md="9" cols="12">
        <video-player ref="videoPlayer"
                      :options="playerOptions"
                      @ended="markPlayed">
        </video-player>
      </v-col>
      <v-col md="3" cols="12">
        <div class="display-1">{{video.name}}</div>
        <div class="green--text" v-if="isPlayed"><font-awesome-icon icon="check"></font-awesome-icon> Played</div>
        <div v-else><v-btn x-small v-on:click="markPlayed">Mark Played</v-btn></div>
        <div v-html="video.description"></div>
        <span v-for="tag_id in video.tags" :key="tag_id.id">
          <v-btn :to="{ name: 'tag', params: {id: tag_id.id}}"
                color="green lighten-2"
                class="mr-1 mb-2">
                {{tag_id.name}}
          </v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import 'video.js/dist/video-js.css' 
import { videoPlayer } from 'vue-video-player'

import { mapState } from 'vuex'

export default {
  components: {
    videoPlayer
  },
 
  computed: {
    
    ...mapState(['playedVideos', 'videos']),

    video () {
      return this.videos.find(vid => vid.id == this.$route.params.id) || {}
    },
    
    playerOptions(){
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
        sources: [{
          type: "video/mp4",
          src: this.video.videoUrl
        }],
        poster: this.video.thumbnail,
        fluid: true
      }
    },
    isPlayed(){
      return this.playedVideos.includes(this.video.id); 
    }
  },

  methods: {
    markPlayed(){
      this.$store.dispatch('markPlayed', this.video.id);
    }
  }

}
</script>

<style>
  
</style> 
