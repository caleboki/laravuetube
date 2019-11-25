<template>
  <v-app>
    <v-app-bar app color="green">
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text to="/">VueTube</v-btn>
        
      </v-toolbar-title>
      <v-btn text to="/admin/videos" v-if="currentUser.admin == 1">Admin</v-btn>
      <v-btn text to="/admin/video/new" v-if="currentUser.admin == 1">Add Video</v-btn>
      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        {{ currentUser.name }}
        <v-btn text class="mr-2" @click="logoutUser">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn text class="mr-2" to="/login">Login</v-btn>
        <v-btn text class="mr-2" to="/registration">Register</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${(index * 60) + 8}px`"
    >
      {{snackbar.text}}
      <v-btn 
      text
      @click="snackbar.showing=false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    
  },
  computed: {
    // ...mapState(['currentUser', 'snackbars'])
    ...mapState({
      currentUser: state => state.users.currentUser, 
      snackbars: state => state.snackbar.snackbars
    })
  },

  created(){
    this.$store.dispatch('users/getAuthenticatedUser');
    this.$store.dispatch('videos/loadVideos');
    this.$store.dispatch('tags/loadTags');
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("users/logoutUser");
      this.$router.push("/");
    },
    loginUser({commit}, user) {
      commit('SET_CURRENT_USER', user);
    }
  },

};
</script>
