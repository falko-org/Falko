import Vue from 'vue';
import Router from 'vue-router';
import Projects from '../components/Projects/Projects.vue';
import AddProject from '../components/Projects/AddProject.vue';
import Project from '../components/Projects/Project.vue';
import DeleteProject from '../components/Projects/DeleteProject.vue';
import EditProject from '../components/Projects/EditProject.vue';
import Login from '../components/Authentication/Login.vue';
import Register from '../components/Authentication/Register.vue';
import LoginRegister from '../components/Authentication/LoginRegister.vue';
import HomePage from '../components/HomePage.vue';
import NoContent from '../components/NoContent.vue';
import Sprints from '../components/Sprints/Sprints.vue';
import Sprint from '../components/Sprints/Sprint.vue';
import EditSprint from '../components/Sprints/EditSprint.vue';
import DeleteSprint from '../components/Sprints/DeleteSprint.vue';
import GitHubCallBack from '../components/GitHub/GitHubCallBack.vue';
import GitHubProjects from '../components/GitHub/GitHubProjects.vue';
import Releases from '../components/Releases/Releases.vue';
import Release from '../components/Releases/Release.vue';
import UserProfile from '../components/Users/UserProfile.vue';
import EditUserProfile from '../components/Users/EditUserProfile.vue';
import DeleteUserProfile from '../components/Users/DeleteUserProfile.vue';
import NotFound from '../components/NotFound.vue';
import Retrospective from '../components/Retrospective/Retrospective.vue';
import Issues from '../components/Issues/Issues.vue';
import Velocity from '../components/Sprints/Velocity.vue';
import Burndown from '../components/Sprints/Burndown.vue';
import IssuesGraphic from '../components/Issues/IssuesGraphic.vue';

Vue.use(Router);

const router = new Router({

  routes: [
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/addproject',
      name: 'AddProject',
      component: AddProject,
    },
    {
      path: '/projects/:id',
      name: 'Project',
      component: Project,
    },
    {
      path: '/deleteproject',
      name: 'DeleteProject',
      component: DeleteProject,
    },
    {
      path: '/editproject/:id',
      name: 'EditProjects',
      component: EditProject,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/loginregister',
      name: 'LoginRegister',
      component: LoginRegister,
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/edituser',
      name: 'EditUserProfile',
      component: EditUserProfile,
    },
    {
      path: '/deleteuser',
      name: 'DeleteUserProfile',
      component: DeleteUserProfile,
    },
    {
      path: '/githubcallback',
      name: 'GitHubCallBack',
      component: GitHubCallBack,
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/releases/:id/sprints',
      name: 'Sprints',
      component: Sprints,
    },
    {
      path: '/sprints/:id',
      name: 'Sprint',
      component: Sprint,
    },
    {
      path: '/deletesprint',
      name: 'DeleteSprint',
      component: DeleteSprint,
    },
    {
      path: '/githubprojects',
      name: 'GitHubProjects',
      component: GitHubProjects,
    },
    {
      path: '/editsprint',
      name: 'EditSprint',
      component: EditSprint,
    },
    {
      path: '/projects/:id/releases',
      name: 'Releases',
      component: Releases,
    },
    {
      path: '/releases/:id',
      name: 'Release',
      component: Release,
    },
    {
      path: '/nocontent',
      name: 'NoContent',
      component: NoContent,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/projects/:id/issues',
      name: 'Issues',
      component: Issues,
    },
    {
      path: '/retrospectives/:id',
      name: 'Retrospective',
      component: Retrospective,
    },
    {
      path: '/sprints/:id/burndown',
      name: 'Burndown',
      component: Burndown,
    },
    {
      path: '/sprints/:id/velocity',
      name: 'Velocity',
      component: Velocity,
    },
    {
      path: '/projects/:id/issueschart',
      name: 'IssuesGraphic',
      component: IssuesGraphic,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const state = JSON.parse(localStorage.getItem('vuex'));

  if (to.path === '/' || to.path === '/notFound') {
    next();
  } else if (!to.matched.length) {
    next('/notFound');
  } else if (state.auth.token === null) {
    next('/');
  } else {
    next();
  }
});
