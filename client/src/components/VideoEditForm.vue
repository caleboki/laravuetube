<template>
    <v-form v-model="valid">
      <v-text-field v-model="video.name" 
                :rules="[required('name'), minLength('name', 5), maxLength('name', 50)]" counter=50 label="Name" />
      <v-textarea v-model="video.description" 
                :rules="[required('description'), minLength('description', 5)]" counter=true label="Description" />
      <v-text-field v-model="video.videoUrl"
                :rules="[required('videoUrl')]"
        label="Video URL" 
        hint="If you want our friends in China to be able to watch this, please use Amazon S3 or similar instead of Youtube and Vimeo." />
        
      <v-text-field v-model="video.thumbnail" 
                :rules="[required('thumbnail')]" label="Thumbnail URL" />

      <v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
    </v-form>
    
</template>

<script>
import validations from '@/utils/validations';
export default {

    data() {
      return {
        valid: false,
        ...validations
      }
    },

    props: ['video', 'saveVideo', 'buttonText']
    
}
</script>

<style lang="scss" scoped>

</style>