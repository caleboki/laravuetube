import Api from "@/services/api";

export default {
    namespaced: true,
    state: {
      tags: []
    },
    mutations: {
      SET_TAGS(state, tags) {
        state.tags = tags;
      },
      CREATE_TAG(state, {tag}) {
        state.tags = state.tags.concat(tag);
      },
      UPDATE_TAG_NAME(state, {tag}) {
        let tagToUpdate = state.tags.find(t => t.id == tag.id)
        tagToUpdate.name = tag.name
      },
      DELETE_TAG(state, {tag}) {
        state.tags = state.tags.filter(t => t.id != tag.id)
      },
      CONNECT_TAG_TO_VIDEO(state, {video, tag}) {
        video.tag_ids = video.tag_ids.concat(tag.id.toString());
        tag.video_ids = tag.video_ids.concat(video.id.toString());
      },
      DISCONNECT_TAG_FROM_VIDEO(state, {video, tag}) {
        video.tag_ids = video.tag_ids.filter(t_id => t_id != tag.id);
        tag.video_ids = tag.video_ids.filter(v_id => v_id != video.id);
      },
    },
    actions: {
      
        async loadTags({commit}) {
            let response = await Api().get('/tags');
            let tags = response.data.tags;
            commit('SET_TAGS', tags);
        },

        async connectTagToVideo({commit, dispatch}, {video, tagId}) {
            await Api().post('/attach_tag', {
                videoId: video.id,
                tagId: tagId.id
            });
            //dispatch('loadTags');
        },

        async disconnectTagFromVideo({commit, dispatch}, {video, tags}) {
            await Api().post('/detach_tag', {
              videoId: video.id,
              tags: tags
            });
        },

        async createTag({commit, dispatch}, {videoId, name}) {
            let response = await Api().post('/tags', {videoId, name})
            dispatch('loadTags');
            //commit('CREATE_TAG'); 
        },

        async updateTagName({commit, dispatch}, {tag}) {

            let response = await Api().put(`/tags/${tag.id}`, tag)
              commit('UPDATE_TAG_NAME', {tag});
            // try {
            //   let response = await Api().put(`/tags/${tag.id}`, tag)
            //   commit('UPDATE_TAG_NAME', {tag});
              
            // } catch (error) {
            //     // console.log(error)
            //     dispatch('loadTags');
            //     return {error: 'The Tag name has already been taken'}
              
            // } 
          },

        deleteTag({commit}, {tag}) {
            Api().delete(`/tags/${tag.id}`);
            commit('DELETE_TAG', {tag})
        }
    },
    getters: {
        getTag: state => id => {
            return state.tags.find(t => t.id == id) || {}
        }
    }
  } 