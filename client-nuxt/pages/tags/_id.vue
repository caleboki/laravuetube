<template>
<div>
    <h1 class="display-3 ma-4 d-flex justify-center">Videos with Tag "{{ tag.name }}"</h1>

    <div class="d-flex flex-wrap">
        <div v-for="video in videosOnTag" :key="video.id">
            <VideoListVideo :video="video"></VideoListVideo>
        </div>
    </div>
</div>
    
</template>

<script>
import { mapState } from 'vuex';
import VideoListVideo from '@/components/VideoListVideo';

export default {
    components: {
      VideoListVideo
    },
    computed: {
        ...mapState({
        tags: state => state.tags.tags,
        videos: state => state.videos.videos
      }),

        videosOnTag(){
            let tagVideoIds = []
            this.tag.videos.forEach(element => {
                tagVideoIds.push(element.id)
            });
            return this.videos.filter(v => tagVideoIds.includes(v.id))
        },

        tag(){
            return this.tags.find(t => t.id == this.$route.params.id)
        }
    }
}
</script>

<style scoped>

</style>