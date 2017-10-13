<template>
  <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="logo.png" width="50"/>
        <img src="../assets/falko-text.png" height="50"/>
      </a>
      <div class="container">
            <searchbar></searchbar>
      </div>
  </nav>
</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
  components: {
    'searchbar': SearchBar
  }
}
</script>

<style scoped>
</style>
