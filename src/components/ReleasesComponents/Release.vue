<template>
  <div>
    <div class="row justify-content-around" id="releaseData">
      <div class="col-md-8">
        <div class="row justify-content-start">
          <div class="col-md-3">
            <h1>{{release.name}}</h1>
            <p class="text-justify text-muted">
              {{release.description}}
            </p>
          </div>
          <div class="col-md-4">
            <h5 class="float-left">
              {{release.initial_date}}
              | 
              {{release.final_date}}
            </h5>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <button type="button" class="btn btn-info btn-md falko-button" 
         id="addButton" data-toggle="modal" data-target="#addReleaseModal">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../http-common.js';

export default {
  data () {
    return {
      release: {}
    }
  },

  methods: {
    getRelease() {
    var token = localStorage.getItem('token');
    var tokenSimple = token.replace(/"/, "");
    var tokenSimple2 = tokenSimple.replace(/"/, "");
    var headers = { 'Authorization': tokenSimple2 };
    
    // console.log(this.$route.params.id)
    HTTP.get(`releases/${this.$route.params.id}`, { headers: headers })
      .then((response) => {
        this.release = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    }
  },

  mounted() {
    this.getRelease()
  }
}
</script>

<style scoped>
#releaseData {
  margin-top: 2em;
  margin-right: 0em;
}

div h5 {
  margin-top: 0.5em;
}
</style>
