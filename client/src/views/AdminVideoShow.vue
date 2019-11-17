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
                    hide-selected>
    </v-combobox>
</div>
    
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';

export default {

    computed: {
        ...mapState(['videos', 'tags']),
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
            await this.$store.dispatch('createTag', {name: createdTag, videoId: this.video.id});
            return
          }

          //Use lodash difference operator to get removed tags, then loop through the ids at backend and detach
          let addedTags = _.differenceBy(newTags, this.videoTags, 'id');
          let removedTags = _.differenceBy(this.videoTags, newTags, 'id');

          if(addedTags.length > 0) {
            this.$store.dispatch('connectTagToVideo', {tagId: addedTags[0], video: this.video})
          }
          if(removedTags.length > 0) {
            this.$store.dispatch('disconnectTagFromVideo', {tagId: removedTags[0], video: this.video})
          }
          
          // if (videoTagsLength - newTagsLength > 0) {
          //   this.$store.dispatch('connectTagToVideo', {tagId: newTags[newTags.length - 1], video: this.video})
          //   return
          // }
        
          //this.$store.dispatch('connectTagToVideo', {tagId: newTags[newTags.length - 1], video: this.video})
        }
      }, 

    }
    
}
</script>

<style scoped>

</style>