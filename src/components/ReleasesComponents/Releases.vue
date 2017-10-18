<template>
  <div class="row justify-content-around">
    <div class="col-5">
      <div align="center">
        <release-preview></release-preview>
      </div>
    </div>
  </div>
</template>

<script>
import ReleasePreview from '@/components/ReleasesComponents/ReleasePreview'

export default {
  components: {
    'release-preview': ReleasePreview
  },

  data () {
    return {

    }
  }  
}
</script>

<style scoped>

</style>
