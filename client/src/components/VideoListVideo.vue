<template>
    
    <v-card width="340px" 
          hover 
          class="ma-2"
          :to="{ name: 'video-watch', params: { id: video.id }}">
        <v-img :src="video.thumbnail" />
        <v-card-title>{{ video.name }}</v-card-title>
        <v-card-text>
            <div class="green--text" v-if="isPlayed">
                <font-awesome-icon icon="check" /> Played
            </div>
        </v-card-text>

        <v-card-actions>
        <span v-for="tag_id in video.tags" :key="`${video.id}-${tag_id}`">
            <v-btn color="green lighten-2" 
                class="mr-2"
                small
                @mousedown.stop
                :to="{ name: 'tag', params: {id: tag_id.id}}">
                {{tag_id.name}}
            </v-btn>
        </span>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['playedVideos', 'tags']),

        tag () {
            return this.tags.find(tag => tag.id == this.$route.params.id) || {}
        },

        isPlayed(){
            return this.playedVideos.includes(this.video.id)
        }
    },

    props: ['video']
}
</script>

<style lang="scss" scoped>
    .video-box {
      border: 1px solid black;
      border-radius: 10px;
      margin: 10px;
      padding: 10px;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      img {
        width: 200px;
        padding: 10px;
      }
    }

</style>