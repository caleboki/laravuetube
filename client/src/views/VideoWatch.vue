<template>
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
        <div class="green--text" v-if="isPlayed(video.id)"><font-awesome-icon icon="check"></font-awesome-icon> Played</div>
        <div v-else>
          <v-btn x-small v-on:click="markPlayed" v-if="currentUser.name != null">Mark Played</v-btn>
        </div>
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

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    videoPlayer
  },
 
  computed: {
    
    ...mapState({
      videos: state => state.videos.videos,
      currentUser: state => state.users.currentUser
    }),
    // ...mapGetters(['playedVideos', 'users/isPlayed']),

    ...mapGetters({
      getTag: 'tags/getTag',
      playedVideos: 'playedVideos',
      isPlayed: 'users/isPlayed'
    }),

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
  
  },

  methods: {
    markPlayed(){
      this.$store.dispatch('users/markPlayed', this.video.id);
    }
  }

}
</script>

<style>
  
</style> 
