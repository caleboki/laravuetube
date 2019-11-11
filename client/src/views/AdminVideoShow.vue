<template>
<div>
    <div class="display-1 pt-3">{{video.name}}</div>
    <div v-html="video.description"></div>

    <v-autocomplete :items="tags"
                    item-text="name" 
                    v-model="videoTags" 
                    multiple
                    chips
                    deletable-chips
                    hide-selected>
    </v-autocomplete>
</div>
    
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
        set(newTags) {
          //Note to self: When creating tags make sure there are unique!!! i.e tag name   
          this.$store.dispatch('connectTagToVideo', {tag: newTags, video: this.video})
        }
      }

    },
    
}
</script>

<style scoped>

</style>