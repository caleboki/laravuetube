<template>
  <div>
    <div class="flex-table">
      <div>Name</div>
      <div>Number of Videos</div>
      <div></div>
    </div>
    <div v-for="tag in tags" :key="tag.id" class="flex-table">
      <div>
        <div v-if="tagEditingId == tag.id">
          <v-text-field v-model="tag.name"
                        :id="`tag-edit-${tag.id}`"
                        @blur="updateTagName(tag)"
                        @keydown.enter="updateTagName(tag)" />
        </div>
        <div v-else @click="setToEditing(tag)">
          {{tag.name}}
        </div>
      </div>
      <div>
        <router-link :to="`/tags/${tag.id}`">
          {{tag.videos.length}}
        </router-link>
      </div>
      <div class="actions">
        <v-btn x-small @click="setToEditing(tag)">Edit</v-btn>
        <v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
      </div>
    </div>
    <div v-if="!isEditingNewTag">
      <v-btn @click="startNewTag()">Add Tag</v-btn>
    </div>
    <div v-else>
      <v-text-field v-model="newTagName"
                    :id="`new-tag-name`"
                    @blur="createTag()"
                    @keydown.enter="createTag()" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        tagEditingId: '',
        isEditingNewTag: false,
        newTagName: '',
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags.tags
      })
    },
    methods: {
      setToEditing(tag) {
        this.tagEditingId = tag.id;
        setTimeout(()=> {
          document.getElementById(`tag-edit-${tag.id}`).focus()
        }, 1)
      },
      async updateTagName(tag) {
        let update = await this.$store.dispatch('tags/updateTagName', {tag}).then(response=>{
          this.$store.dispatch('snackbar/setSnackbar', {
                color: 'black', text: 'You have successfully updated a tag'
            });
            
        }).catch((error)=>{
            
            this.$store.dispatch('tags/loadTags');
            this.$store.dispatch('snackbar/setSnackbar', {
                color: 'error', text: error.response.data.errors.name[0]
            });

        })
        this.tagEditingId = ''
      },
      deleteTag(tag) {
        let confirmed = confirm(`Are you sure you want to delete tag ${tag.name}? It is connected to ${tag.videos.length} videos.`)
        if(confirmed){
          this.$store.dispatch('tags/deleteTag', {tag});
        }
      },
      startNewTag(){
        this.isEditingNewTag = true;
        setTimeout(()=> {
          document.getElementById(`new-tag-name`).focus()
        }, 1)
      },
      createTag(){
        if(this.newTagName.length > 0) {
          this.$store.dispatch('tags/createTag', {name: this.newTagName})
          this.newTagName = ''
        }
        this.isEditingNewTag = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flex-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33%);
    padding: 10px;
    border-bottom: 1px black solid;
    &:nth-of-type(2n) {
      background-color: #dedede;
    }
    .actions {
      * {
        margin-right: 10px
      }
    }
  }
</style>