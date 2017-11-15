<template>
</template>

<script>
import { HTTP } from '../../http-common';

export default {
  data() {
    return {
      token: '',
    };
  },

  mounted() {
    const rawToken = localStorage.getItem('token');
    const token = rawToken.replace(/"/, '').replace(/"/, '');
    const headers = { Authorization: token };
    const userId = localStorage.getItem('user_id');

    const code = window.location.search.split('=')[1];
    HTTP.post('request_github_token', {
      code,
      id: userId,
    }, { headers })
      .then((response) => {
        this.token = response.data.access_token;
        this.$router.push({ name: 'UserProfile' });
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style>
</style>
