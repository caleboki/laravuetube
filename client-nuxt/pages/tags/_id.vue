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
import VideoListVideo from '@/components/VideoListVideo';

export default {
    
    components: {
      VideoListVideo
    },

    async asyncData({$axios, params}) {
        
        let responseTag = await $axios.get(`/tags/${params.id}`)
        let tag = responseTag.data.tag;
        let responseVideo = await $axios.get(`/videos`)
        let videos = responseVideo.data.videos
        let tagVideoIds = []

        tag.videos.forEach(element => {
                tagVideoIds.push(element.id)
            });
        let videosOnTag = videos.filter(v => tagVideoIds.includes(v.id))

        return {tag, videosOnTag}
    }
    
}
</script>

<style scoped>

</style>