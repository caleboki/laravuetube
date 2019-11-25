<template>

<v-container>
  <VideoEditForm :video="video" :saveVideo="saveVideo" buttonText="Save Video"/>
  
    
</v-container>
    
</template>

<script>
import { mapState } from 'vuex';
import VideoEditForm from '@/components/VideoEditForm.vue'

export default {
    components: {
      VideoEditForm
    },
    
    computed: {
      ...mapState({
        videos: state => state.videos.videos
      }),
      video(){
        return this.videos.find(v => v.id == this.$route.params.id);
      },

      required(propertyType) { 
          return v => v && v.length > 0 || `You must input a ${propertyType}`
        },
        minLength(propertyType, minLength) {
          return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
        },
        maxLength(propertyType, maxLength) {
          return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
        }
      },

    methods: {
      async saveVideo() {
        let video = await this.$store.dispatch('videos/editVideo', this.video);
        this.$store.dispatch('snackbar/setSnackbar', {
          text: `You have successfully edited your video, ${video.name}`
        });
        this.$router.push({name: 'admin-video-list'});
      }
    },
    
}
</script>

<style lang="scss" scoped>

</style>