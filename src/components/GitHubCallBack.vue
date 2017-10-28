<template>
<div>
<h1>{{token}}</h1>
</div>
</template>

<script>
import {HTTP} from '../http-common.js';

export default {
  data() {
    return {
      token: ""
    }
  },
  mounted() {
    var code = window.location.search.split("=")[1];
    HTTP.post('request_github_token',{
      code: code,
      id: localStorage.getItem('user_id')
    })
    .then((response) => {
      this.token = response.data.access_token
    })
    .catch((e) => {
      this.errors.push(e);
    });
  }
}
</script>

<style>
</style>
