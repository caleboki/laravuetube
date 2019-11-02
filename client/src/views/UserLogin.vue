<template>
    <v-container>
      <h1>Login</h1>
      <UserAuthForm :submitForm="loginUser" buttonText="Login" />
    </v-container>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";

export default {
    components: {
      UserAuthForm
    },

    methods: {
      async loginUser(loginInfo) {
        let user = await this.$store.dispatch('loginUser', loginInfo);
        console.log(user);
        if(user.error){
          //alert(user.error)
          this.$store.dispatch('setSnackbar', {
          color: 'error', text: user.error
          });
          
        } else {
            this.$store.dispatch('setSnackbar', {
            text: 'Thank you for signing in, ' + user.name
          });
            if (user.admin == 1) {
              this.$router.push('/admin/videos');

            } else {
              this.$router.push({name: 'home'});
            }
        
        }
      }
    },
    
}
</script>

<style lang="scss">

</style>