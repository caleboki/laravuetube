<template>
<div>
    <h1 class="display-3 ma-4 d-flex justify-center">Videos with Tag "{{ tag.name }}"</h1>

    <div class="d-flex flex-wrap">
        <div v-for="video_id in tag.videos" :key="video_id.id">
            <VideoListVideo :video="video_id"></VideoListVideo>
        </div>
    </div>
</div>
    
</template>

<script>
import { mapGetters } from 'vuex';
import VideoListVideo from '@/components/VideoListVideo'
export default {
    components: {
        VideoListVideo
    },
    computed: {
        // ...mapGetters(['getTag']),
        // tag() {
        //     return this.getTag(this.$route.params.id)
        // },
        // videosOnTag() {
        //     return true
        // }

        tag () {
            return this.$store.state.tags.find(tag => tag.id == this.$route.params.id) || {}
        },
    }
    
    
}
</script>