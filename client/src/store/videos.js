import Api from "@/services/api";

export default {
  namespaced: true,
  state: {
    videos: [],
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    ADD_VIDEO(state, video) {
      let videos = state.videos.concat(video);
      state.videos = videos;
    },
    DELETE_VIDEO(state, videoId){
      let videos = state.videos.filter(v => v.id != videoId)
      state.videos = videos;
    },
    EDIT_VIDEO(state, video) {
        state.videos.forEach(v => {
          if(v.id == video.id) {
            v = video;
          }
        })
    }
  },
  actions: {
    async loadVideos({commit, dispatch}){
        let response = await Api().get('/videos');
        let videos = response.data.videos
        commit('SET_VIDEOS', videos.map(v => v));      
    },

    async createVideo({commit}, video) {
      let response = await Api().post('/videos', video);
      let savedVideo = response.data.video;
      commit('ADD_VIDEO', savedVideo);
      return savedVideo;
    },
    async deleteVideo({commit}, video) {
      let response = await Api().delete(`/videos/${video.id}`);
      if(response.status == 200 || response.status == 204){
        commit('DELETE_VIDEO', video.id);
      }
    },
    async editVideo({commit}, video) {
      let response = await Api().put(`/videos/${video.id}`, video);
      let newVideo = response.data.video;
      commit('EDIT_VIDEO', newVideo);
      return newVideo;
    },
  }
} 