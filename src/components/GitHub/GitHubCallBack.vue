<template>
</template>

<script>
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
      userId: state => state.auth.userId,
    }),
  },
  mounted() {
    const code = window.location.search.split('=')[1];
    const headers = { Authorization: this.token };

    this.$store.dispatch('linkGithub', { code, headers, userId: this.userId })
      .then(() => {
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
