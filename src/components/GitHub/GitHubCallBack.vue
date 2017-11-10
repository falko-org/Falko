<template>
  <div>
    <h1> {{github_token}} </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { HTTP } from '../../http-common';


export default {
  data() {
    return {
      github_token: '',
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
      userId: state => state.auth.userId,
    }),
  },
  mounted() {
    const code = window.location.search.split('=')[1];
    const headers = { Authorization: this.token };
    console.log(headers);
    HTTP.post('request_github_token', {
      code,
      id: this.userId,
    }, { headers })
      .then((response) => {
        this.github_token = response.data.access_token;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style>
</style>
