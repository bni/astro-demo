<template>
  <div class="upload">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>

    <file-upload
      class="btn btn-primary"
      v-bind:put-action="uploadUrl"
      :multiple="false"
      :drop="true"
      :drop-directory="false"
      @input-file="inputFile"
      ref="upload">
    </file-upload>
  </div>
</template>

<style>
.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #444;
}

.drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>

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
