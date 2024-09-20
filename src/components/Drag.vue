<template>
  <div class="upload drop-active flex items-center justify-center">

    <p class="text-stone-900 text-xl p-2 m-10">Drop image here</p>

    <file-upload
      v-bind:put-action="uploadUrl"
      :multiple="false"
      :drop="true"
      :drop-directory="false"
      @input-file="inputFile"
      ref="upload">
    </file-upload>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component';

export default {
  props: ['uploadUrl'],
  components: {
    FileUpload
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        console.log('Add file', newFile.active, newFile);
      }

      if (newFile && oldFile) {
        console.log('Update file', newFile.active, newFile);

        if (newFile.active !== oldFile.active) {
          console.log('Start upload', newFile.active, newFile)
        }

        if (newFile.progress !== oldFile.progress) {
          console.log('Progress', newFile.progress, newFile)
        }

        if (newFile.error !== oldFile.error) {
          console.log('Error', newFile.error, newFile)
        }

        if (newFile.success !== oldFile.success) {
          console.log('Success!!', newFile.success, newFile);

          window.location.reload();
        }
      }

      // Automatic upload
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    }
  }
}
</script>
