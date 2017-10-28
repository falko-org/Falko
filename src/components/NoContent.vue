<template>
  <div align="center" id="noProjects">
    <img src="../assets/bw-logo.png" class="img-fluid" width="200em" alt="Falko" id="falkoLogo"/>
    <div id="noProjectsMessage">

      <div v-if="parent == 'Project'">
      <h3>No Projects Added</h3>
      </div>

      <div v-else-if="parent == 'Sprint'">
      <h3>No Sprints Added</h3>
      </div>

      <div v-else-if="parent == 'Release'">
      <h3>No Releases Added</h3>
      </div>

      <p class="text-muted">Click on "Add a {{parent}}" to Get Started</p>
    </div>
  </div>

</template>

<script>
export default {
  props: ["parent"]
}
</script>

<style scoped>
h3 {
  color: #275568;
  font-weight: bold;
}

#noProjects {
  margin-top: 3em;
}

#noProjectsMessage {
  margin-top: 2.5em;
}
</style>
