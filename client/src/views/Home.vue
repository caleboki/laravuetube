<template>
  <div class="home">
    <div class="display-4 ma-4 d-flex justify-center">
      All Videos
    </div>
    
    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoListVideo from '@/components/VideoListVideo';
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    VideoListVideo
  },
  computed: {
    // ...mapState(['videos', 'tags'])
    ...mapState({
      videos: state => state.videos.videos
    }),
  },

  mounted() {
    this.$store.dispatch('videos/loadVideos');
    this.$store.dispatch('tags/loadTags');
  }
}
</script>

<style scoped lang="scss">
 
</style>
