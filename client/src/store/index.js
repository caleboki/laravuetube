import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/api'
import snackbarModule from './snackbar';
import tagsModule from './tags';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
    tags: tagsModule
  },
  
  state: {
    videos: [],
    users: [],
    currentUser: {},
    token: null
  },

  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    
    SET_PLAYED_VIDEOS(state, playedVideos) {
      Vue.set(state.currentUser, 'playedVideos', playedVideos);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.currentUser.playedVideos.concat(videoId);
      state.currentUser.playedVideos = playedVideos;
    },
    LOGOUT_USER(state) {
      state.currentUser = {}
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      window.localStorage.token = JSON.stringify(token);
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

    async getAuthenticatedUser({commit, dispatch}){

        if (localStorage.getItem("currentUser") && localStorage.getItem("token") !== null) {
          //Check if user is authenticated at the backend
          try {
            let response = await Api().post('/auth/me');
            let user = response.data
            //console.log(user)
            commit('SET_CURRENT_USER', user);
            dispatch('loadPlayedVideos', user.id);
            
          } catch (error) {
            //if not logged in at the backend, clear token an user data in localstorage
            console.log(error)
            commit('LOGOUT_USER');  
          }
        } 
    },

    async loadPlayedVideos({commit}, userId) {
        //Get videos played by user
        let uservid = await Api().get(`/users/${userId}`)
        let a = uservid.data.user[0].videos;
        let b = [];
        a.forEach(c => {
          b.push(c.id)
        })
        commit('SET_PLAYED_VIDEOS', b)
    },

    markPlayed({commit, state}, videoId) {
      if (state.currentUser.name) {
        commit('MARK_VIDEO_PLAYED', videoId);
        Api().post('/video_played', {
          videoId: videoId
        }); 
      } 
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

    async loadUsers({commit}) {
      let response = await Api().get('/users');
      let users = response.data.users;
      console.log(users)
      commit('SET_USERS', users.map(u => u));
    },

    async loginUser({commit, dispatch}, loginInfo) {
      
      try {
        let response = await Api().post('/auth/login', loginInfo);
        let user = response.data.user.original;
        let token = response.data.access_token;

        dispatch('loadPlayedVideos', user.id);
        
        commit('SET_TOKEN', token);
        commit('SET_CURRENT_USER', user);
        return user;
      } catch(error) {
          return {error: "Email/password combination was incorrect. Please try again."}
      }

    },

    async registerUser({commit, dispatch}, registrationInfo) {
      try {
        let response = await Api().post('/users', registrationInfo);
        let user = response.data.user;

        dispatch('loadPlayedVideos', user.id);

        commit('SET_CURRENT_USER', user);
        return user;
      } catch(error) {
        return {error: error.response.data.errors.email}
      }
    },

    async logoutUser({commit}) {
      try {
        let response = await Api().post('/auth/logout')
      } catch (error) {
        return error  
      }
      commit('LOGOUT_USER');
    },

    
  },
 
  getters: {
    playedVideos: state => {
      return state.currentUser.playedVideos || []
    },
    isPlayed: (state, getters) => videoId => {
      return getters.playedVideos.includes(videoId)
    },
    
  }
})
