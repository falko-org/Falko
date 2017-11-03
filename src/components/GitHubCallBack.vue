<template>
  <div>
    <h1> {{github_token}} </h1>
  </div>
</template>

<script>
import {HTTP} from '../http-common.js';
import { mapState } from 'vuex';


export default {
  data() {
    return {
      github_token: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId
    })
  },
  mounted() {
    var code = window.location.search.split("=")[1];
    var headers = { 'Authorization':this.token };

    HTTP.post('request_github_token',{
      code: code,
      id: this.userId
    }, { headers })
    .then((response) => {
      this.github_token = response.data.access_token
    })
    .catch((e) => {
      this.errors.push(e);
    });
  }
}
</script>

<style>
</style>
