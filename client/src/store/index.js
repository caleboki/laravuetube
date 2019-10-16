import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: [],
  },

  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_PLAYED_VIDEOS(state, playedVideos) {
      state.playedVideos = playedVideos;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.playedVideos.concat(videoId);
      state.playedVideos = playedVideos;
      window.localStorage.playedVideos = JSON.stringify(playedVideos);
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
    async loadVideos({commit}){
      let response = await Api().get('/videos');
      let videos = response.data.videos
      let tags = response.data.tags
      videos.forEach(v => {
        v.tags.forEach(u => {
          //get tags for each video
          u.pivot.tag_id = tags.id
        })
      })
      tags.forEach(t => {
        //get videos for each tag
        t.videos.forEach(w => {
          w.pivot.video_id = videos.id
        })
      })
      commit('SET_VIDEOS', videos.map(v => v)); 
      commit('SET_TAGS', tags);

      let playedVideos = JSON.parse(window.localStorage.playedVideos);
      commit('SET_PLAYED_VIDEOS', playedVideos);
    },

    markPlayed({commit}, videoId) {
      commit('MARK_VIDEO_PLAYED', videoId);
    },

    async createVideo({commit}, video) {
      let response = await Api().post('/videos', video);
      //debugger
      let savedVideo = response.data.video;
      commit('ADD_VIDEO', savedVideo);
      return savedVideo;
    },

    async editVideo({commit}, video) {
      let response = await Api().put(`/videos/${video.id}`, video);
      let newVideo = response.data.video;
      commit('EDIT_VIDEO', newVideo);
      return newVideo;

    },

    async deleteVideo({commit}, video) {
      let response = await Api().delete(`/videos/${video.id}`);
      if(response.status == 200 || response.status == 204){
        commit('DELETE_VIDEO', video.id);
      }
    },
  },
  modules: {
  }
})
