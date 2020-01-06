// import {getData, deserializeVideos} from '@/utils/store-utils';

export const state = () => ({
  videos: [],
})

export const mutations = {
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
    let v = state.videos.find(v => v.id == video.id)
    v = video;
  }
}

export const actions = {
  async loadVideos({commit}) {
    let response = await this.$axios.get('/videos')
    let videos = response.data.videos
    commit('SET_VIDEOS', videos)
  },
  async create({commit}, video) {
    let response = await this.$axios.post('/videos', video);
    let savedVideo = response.data.data.attributes;
    commit('ADD_VIDEO', savedVideo);
    return savedVideo;
  },
  async delete({commit}, video) {
    let response = await this.$axios.delete(`/videos/${video.id}`);
    if(response.status == 200 || response.status == 204){
      commit('DELETE_VIDEO', video.id);
    }
  },
  async edit({commit}, video) {
    let response = await this.$axios.put(`/videos/${video.id}`, video);
    let newVideo = response.data.data.attributes;
    commit('EDIT_VIDEO', newVideo);
    return newVideo;
  },
}

export const getters = {
  get: state => id => {
    return state.videos.find(v => v.id == id) || {}
  }
} 