<template>
  <div class="drop-active flex items-center justify-center">

    <p class="text-stone-900 text-xl p-2 m-10">Drop image here</p>

    <file-upload
      v-bind:put-action="uploadLink"
      :multiple="false"
      :drop="true"
      :drop-directory="false"
      @input-file="inputFile"
      @input-filter="inputFilter"
      ref="upload">
    </file-upload>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component';

export default {
  props: ['uploadLink'],
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
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }

      if (newFile && oldFile) {
        if (newFile.success !== oldFile.success) {
          window.location.reload();
        }
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png)$/i.test(newFile.name)) {
          return prevent();
        }
      }
    }
  }
}
</script>
