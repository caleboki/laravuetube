export const state = () => ({
    videos: [],
    tags: []
  })
  
export const mutations = {
  SET_VIDEOS (state, videos) {
      state.videos = videos
    },

  SET_TAGS (state, tags) {
    state.tags = tags
  },

  SET_CURRENT_VIDEO (state, video) {
      state.currentVideo = video
    }
  }

export const actions = {
  async loadVideos({commit}) {
    let response = await this.$axios.get('/videos')
    let videos = response.data.videos

    commit('SET_VIDEOS', videos)
  },

  async loadTags({commit}) {
    let response = await this.$axios.get('/tags')
    let tags = response.data.tags

    commit('SET_TAGS', tags)
  },

  // async loadOneVideo({commit}, {videoId}) {
  //   let response = await this.$axios.get(`/videos/${videoId}`)
  //   let video = response.data.video;
    
  //   commit('SET_TAGS', video.tags)
  //   commit('SET_VIDEOS', video)
  // },

  // async loadTagAndRelationships({commit}, {tagId}) {
  //   let responseTag = await this.$axios.get(`/tags/${tagId}`)
  //   let tag = responseTag.data.tag;
  //   let responseVideo = await this.$axios.get(`/videos`)
  //   let videos = responseVideo.data.videos
  //   let tagVideoIds = []

  //   tag.videos.forEach(element => {
  //           tagVideoIds.push(element.id)
  //       });
  //   let videosOnTag = videos.filter(v => tagVideoIds.includes(v.id))

  //   commit('SET_TAGS', tag)
  //   commit('SET_VIDEOS', videosOnTag)
    
  // }
}

