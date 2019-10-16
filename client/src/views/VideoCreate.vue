<template>
    <v-container>
      <v-row>
          <v-col md="3" cols="12">
              <h1>Video Create Page</h1>
              <v-text-field v-model="video.name" :rules="[rules.required, rules.counter]" label="Name" />
              <v-textarea v-model="video.description" :rules="[rules.required, rules.counter]" label="Description" />
              <v-text-field v-model="video.thumbnail" :rules="[rules.required]" label="Thumbnail URL" />
              <v-text-field v-model="video.videoUrl"
                      :rules="[rules.required]"
                      label="Video URL" 
                      hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />

              <v-btn @click="createVideo">Create Video</v-btn>
          </v-col>
          <v-col md="9" cols="12">
              <VideoListVideo :video="video" />
          </v-col>
      </v-row>
    </v-container>
    
</template>

<script>
import VideoListVideo from '@/components/VideoListVideo';

export default {
    data() {
      return {
        video: {},

        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
        },
    
      }
    },
    components: {
      VideoListVideo,
    },
    methods: {
      async createVideo() {
        let video = await this.$store.dispatch('createVideo', this.video);
        this.$router.push({ name: 'video-watch', params: {id: video.id}});
      }
    },
    
}
</script>

<style lang=scss scoped>
/* .field {
  input {
    border: 1px solid black;
  }
label {
    display: block;
  }
  padding-bottom: 10px;
} */

</style>