<template>
  <div class="row justify-content-around">
    <div class="row top-buffer" v-for="i in Math.ceil(releases.length / 2)">
      <div v-for="release in releases.slice((i-1) * 2,i*2)" class="col-5">
        <div align="center">
          <release-preview></release-preview>
        </div>
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
      releases: {}
    }
  },

  methods: {
    getReleases() {
      HTTP.get(`projects/${this.$route.params.id}/releases`)
        .then((response) => {
          this.releases = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }
  }

}
</script>

<style scoped>

</style>
