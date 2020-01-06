<template>
<div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <div v-html="video.description"></div>

    <v-combobox :items="tags"
                    item-text="name" 
                    v-model="videoTags" 
                    multiple
                    chips
                    deletable-chips
                    hide-selected
                    return-object>
    </v-combobox>
</div>
    
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  
    computed: {

        ...mapState({
          videos: state => state.videos.videos,
          tags: state => state.tags.tags
        }),

        ...mapGetters({
          getTag: 'tags/getTag'
        }),

        video(){
          return this.videos.find(v => v.id == this.$route.params.id);
        },

      videoTags: {
        get() {
            return this.video.tags;
        },
        async set(newTags) {
          //Check if new & non-existing tag has been entered
          let createdTag = newTags.find(t => typeof t == 'string') 
          if (createdTag) {
            await this.$store.dispatch('tags/createTag', {name: createdTag, videoId: this.video.id});
            return
          }

          let videoTagsLength = this.videoTags.length;
          let newTagsLength = newTags.length;
          
          if (newTagsLength - videoTagsLength > 0) {
            await this.$store.dispatch('tags/connectTagToVideo', {tagId: newTags[newTagsLength - 1], video: this.video})
            return
          }
          else {
            this.$store.dispatch('tags/disconnectTagFromVideo', {tags: newTags, video: this.video})
          }
          
        }
      }, 

    }
    
}
</script>

<style scoped>

</style>