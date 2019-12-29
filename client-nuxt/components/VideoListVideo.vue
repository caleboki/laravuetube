<template>
  <v-card width="340px" 
          hover 
          class="ma-2"
          :to="`/watch/${video.id}`"
          >
    <v-img :src="video.thumbnail"></v-img>
    <v-card-title>{{ video.name }}</v-card-title>
    <v-card-text>
      <!-- <div class="green--text" v-if="isPlayed(video.id)">
        <font-awesome-icon icon="check" /> Played
      </div> -->
    </v-card-text>

    <v-card-actions>
      <span v-for="tag_id in video.tags" :key="tag_id + Math.random()">
        <no-ssr>
          <v-btn color="green lighten-2" 
              class="mr-2"
              small
              @mousedown.stop
              :to="`/tags/${tag_id.id}`"
              > 
              {{tag_id.name}}
          </v-btn>
        </no-ssr>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  methods: {
  //   ...mapGetters({
  //     getTag: 'tags/get',
  //     isPlayed: 'users/videoIsPlayed'
  //   })
    getTag(tagId) {
      return this.tags.find(t => t.id == tagId);
    }
  },
  props: ['video', 'tags'],  
}
</script>

<style scoped lang="scss">
</style> 