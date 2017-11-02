<template>
  <div>
    <h1> {{token}} </h1>
  </div>
</template>

<script>
import { HTTP } from '../http-common.js';

export default {
  data() {
    return {
      token: '',
    };
  },
  mounted() {
    var raw_token = localStorage.getItem('token');
    var token = raw_token.replace(/"/, "").replace(/"/, "");
    var headers = { 'Authorization': token };
    var user_id = localStorage.getItem('user_id');

    var code = window.location.search.split('=')[1];
    HTTP.post('request_github_token', {
      code: code,
      id: user_id,
    }, { headers: headers })
      .then((response) => {
        console.log(response.data.access_token);
        this.token = response.data.access_token;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style>
</style>
