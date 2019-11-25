<template>
    
    <v-card width="340px" 
          hover 
          class="ma-2"
          :to="{ name: 'video-watch', params: { id: video.id }}">
        <v-img :src="video.thumbnail" />
        <v-card-title>{{ video.name }}</v-card-title>
        <v-card-text>
            <div class="green--text" v-if="isPlayed(video.id)">
                <font-awesome-icon icon="check" /> Played
            </div>
        </v-card-text>

        <v-card-actions>
            <span v-for="tag_id in video.tags" :key="tag_id + Math.random()">
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
import { mapState, mapGetters } from 'vuex';
export default {
    computed: {
        // ...mapGetters(['users/isPlayed']),
        ...mapGetters({
            isPlayed: 'users/isPlayed'
        }),
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