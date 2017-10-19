<template>
  <div>
    <div class="row justify-content-around" id="releaseData">
      <div class="col-md-8">
        <ul class="list-inline">
          <li class="list-inline-item vertical-center">
            <h1>{{release.name}}</h1>
          </li>
          <li class="list-inline-item vertical-center small-float-right">
            <h5 class="float-left">
              {{release.initial_date}}
              | 
              {{release.final_date}}
            </h5>
          </li>
          <p class="text-justify text-muted">
            {{release.description}}
          </p>
        </ul>
      </div>
      <div class="col-md-3" align="center">
        <button type="button" class="btn btn-info btn-md falko-button" 
         id="addButton" data-toggle="modal" data-target="#addReleaseModal">
          Edit
        </button>
        <button type="button" class="btn btn-info btn-md falko-button 
         falko-button-danger small-float-right" id="addButton" 
        data-toggle="modal" data-target="#addReleaseModal"
        >
          Delete
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
h1 {
  color: #688E9B;
  font-weight: bold;
}

h5 {
  color: rgba(1, 22, 30, 0.75);
  font-weight: lighter;
}

#releaseData {
  margin-top: 2em;
  margin-right: 0em;
}

.small-float-right {
  margin-left: 1em;
}
.vertical-center {
  vertical-align: middle;
}
</style>
