<template>
  <v-card class="sidebar-nav">
    <v-navigation-drawer
      v-model="drawer"
      permanent
    >
      <v-list-item>
        <v-btn
          icon
          @click="$router.go(-1)"
        >
          <v-icon class=" fa fa-arrow-left"></v-icon>
        </v-btn>
      </v-list-item>

       <v-list-item>
        <v-btn
          icon
          to="/user"
        >
          <v-icon class=" fas fa-user-circle"></v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item>
        <v-btn
          icon
          to="/projects"
        >
          <v-icon class=" fa fa-file"></v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item>
        <v-btn
          icon
          v-bind:to="'/projects/'+this.$route.params.id+'/releases'"
          v-if="this.$route.path == '/projects/'+this.$route.params.id ||
                this.$route.path == '/releases/'+this.$route.params.id ||
                this.$route.path == '/projects/'+this.$route.params.id+'/releases'"
        >
          <v-icon class=" fa fa-cube"></v-icon>
        </v-btn>
      </v-list-item>
    </v-navigation-drawer>
  </v-card>
</template> 


<script>

export default {
};

</script>

<style>


#sidebar-wrapper {
  position: fixed;
  min-width: 4em;
  height: 100%;
  overflow-y: auto;
  background: #f8f9fa;
  border-right: solid;
  border-width: thin;
  border-color: #ddd;
  margin-right: 4em;
}

#sidebar-wrapper .sidebar-nav {
  font-size: 2em;
  list-style: none;
  padding: 0;
}

#sidebar-wrapper .sidebar-nav li {
  text-indent: 0;
  line-height: 1.8em;
}

.sidebar-nav li a {
  color: #3E5361;
}

</style>
