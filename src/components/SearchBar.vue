<template>
  <div class="container" v-if="this.$route.path != '/'">
    <form action="" class="search-form">
        <div class="form-group has-feedback">
        <label for="search" class="sr-only">Search</label>
          <i class="fa fa-search form-control-feedback"></i>
          <input type="text" class="form-control" name="search" id="search"
                 placeholder="Search..." v-model="search">
          </input>
      </div>
        <div v-for="project in filteredProjects">
          <router-link v-bind:to="'/projects/' + project.id"> {{ project.name }}</router-link>
        </div>
    </form>
  </div>
</template>


<script>
import { HTTP } from '../http-common.js';

export default {
  data() {
    return {
      projects: [],
      search: ''
    }
  },
  methods: {
    getProjects() {
      var token = localStorage.getItem('token');
      var tokenSimple = token.replace(/"/, "");
      var tokenSimple2 = tokenSimple.replace(/"/, "");
      var headers = { 'Authorization':tokenSimple2 };

      var userId = localStorage.getItem('user_id');
      var userInt = parseInt(userId);

      HTTP.get(`users/${userInt}/projects`, { headers: headers })
        .then((response) => {
          this.projects = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    goToProject() {
      var index=-1;
      for(var i = 0, len = this.projects.length; i < len; i++) {
        if (this.projects[i].name === this.search) {
            index = this.projects[i].id;
            this.search = "";
            this.$router.push({ path : '/projects/' + index});
            break
        }
      }
      if(index == -1) {
        this.$router.push({ path: '/NotFound/'});
      }
    },
    refreshProjects() {
      this.getProjects();
    },
    isProjectsEmpty() {
      return this.projects.length === 0;
    },
    updateProject: function() {
      this.$emit('changeProject', 'filteredProjects')
    },
  },
  created() {
    this.getProjects();
  },
  computed: {
    filteredProjects: function() {
      return this.projects.filter((project) => {
        return project.name.match(this.search);
      });
    }
  }
}

</script>


<style>


.search-form .form-group {
  transition: all 0.35s, border-radius 0s;
  width: 17.5em;
  background-color: #fff;
  border-radius: 1.563em;
  border: 0.063em solid #ccc;
  margin-bottom: 0;
}

.search-form .form-group input.form-control {
  border: 0 none;
  background: transparent;
}

.search-form .form-group i.form-control-feedback {
  position: absolute;
  top: -0.0625em;
  right: 0.833333125em;
  z-index: 2;
  display: block;
  width: 8.125em;
  height: 2.125em;
  line-height: 2.125em;
  padding: none;
  text-align: center;
  color: #598392;
  left: initial;
  font-size: 1em;
}
</style>
