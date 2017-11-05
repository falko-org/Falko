<template>
  <body>
    <div id="wrapper" v-if="this.$route.path != '/' && isLogged()">
      <div id="sidebar-wrapper">
        <aside id="sidebar">
          <ul id="sidemenu" class="sidebar-nav">
            <li>
              <router-link to="#">
              <a onclick="window.history.go(-1); return false;" data-toggle="popover" data-trigger="hover" data-content="Return">
                <span class="sidebar-icon"><i class=" fa fa-arrow-left"></i></span>
                <span class="sidebar-title"></span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link to="/user">
              <a data-toggle="popover2" data-trigger="hover" data-content="User Profile">
                <span class="sidebar-icon"><i class=" fa fa-user-circle-o"></i></span>
                <span class="sidebar-title"></span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link to="/projects">
              <a data-toggle="popover3" data-trigger="hover" data-content="Projects">
                <span class="sidebar-icon"><i class=" fa fa-file"></i></span>
                <span class="sidebar-title"></span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link v-bind:to="'/releases/'+this.$route.params.id+'/sprints'">
              <a data-toggle="popover4" data-trigger="hover" data-content="Sprints">
                <span  v-if="this.$route.path == '/releases/'+this.$route.params.id ||
                 this.$route.path == '/releases/'+this.$route.params.id+'/sprints' ||
                  this.$route.path == '/sprints/'+this.$route.params.id"
                   class="sidebar-icon"><i class=" fa fa-repeat"></i></span>
                <span class="sidebar-title"></span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link v-bind:to="'/projects/'+this.$route.params.id+'/releases'">
              <a data-toggle="popover5" data-trigger="hover" data-content="Releases" >
                <span v-if="this.$route.path == '/project/'+this.$route.params.id ||
                 this.$route.path == '/releases/'+this.$route.params.id+'/sprints' ||
                  '/releases/'+this.$route.params.id &&
                   this.$route.path != '/projects'"
                    class="sidebar-icon"><i class=" fa fa-cube"></i></span>
                <span class="sidebar-title"></span>
              </a>
              </router-link>
            </li>
          </ul>
        </aside>
      </div>
      <main id="page-content-wrapper" role="main">
      </main>
    </div>
  </body>

</template>

<script>
export default {
  methods: {
    isLogged(){
      if (localStorage.getItem('token') != null) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
});

$(document).ready(function() {
    $('[data-toggle="popover2"]').popover();
});

$(document).ready(function() {
    $('[data-toggle="popover3"]').popover();
});

$(document).ready(function() {
    $('[data-toggle="popover4"]').popover();
});

$(document).ready(function() {
    $('[data-toggle="popover5"]').popover();
});

</script>

<style>

#wrapper {
  padding-top: 0em;
  padding-left: 0;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}

@media (min-width: 992px) {
  #wrapper {
    padding-left: 1.5em;
  }
}

@media (min-width: 992px) {
  #wrapper #sidebar-wrapper {
    width: 2.3em;
  }
}

#sidebar-wrapper {
  z-index: 10;
  position: fixed;
  left: 14em;
  min-width: 4em;
  height: 100%;
  margin-left: -14em;
  overflow-y: auto;
  background: #f8f8f8;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}

.sidebar-icon {
  margin-left: 0.5em
}

#sidebar-wrapper .sidebar-nav {
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 2em;
  margin: 0;
  padding: 0;
  list-style: none;
}

#sidebar-wrapper .sidebar-nav li {
  text-indent: 0;
  line-height: 1.8em;
}

#sidebar-wrapper .sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #428bca;
}

@media (max-width: 992px) {
  #wrapper #sidebar-wrapper {
    width: 2.3em;
  }
}

.sidebar-nav li:first-child a {
  /*background: #275568 !important;*/
  color: #275568 !important;
}

.sidebar-nav li:nth-child(2) a {
  /*background: #124559 !important;*/
  color: #124559 !important;
}

.sidebar-nav li:nth-child(3) a {
  /*background: #113F51 !important;*/
  color: #113F51 !important;
}
.sidebar-nav li:nth-child(4) a {
  /*background: #124559 !important;*/
  color: #124559 !important;
}

.sidebar-nav li:nth-child(5) a {
  /*background: #113F51 !important;*/
  color: #113F51 !important;
}

</style>
