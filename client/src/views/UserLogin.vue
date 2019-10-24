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
          alert(user.error)
        } else {
          alert('Thank you for signing in, ' + user.name);
        }
      }
    },
    
}
</script>

<style lang="scss">

</style>