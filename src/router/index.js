import Vue from 'vue';
import Router from 'vue-router';
import AssignMember from '@/components/Stories/AssignMember';
import ScorePoints from '@/components/Stories/ScorePoints';
import Projects from '../components/Projects/Projects.vue';
import Project from '../components/Projects/Project.vue';
import HomePage from '../components/HomePage.vue';
import Sprint from '../components/Sprints/Sprint.vue';
import GitHubCallBack from '../components/GitHub/GitHubCallBack.vue';
import GitHubProjects from '../components/GitHub/GitHubProjects.vue';
import Releases from '../components/Releases/Releases.vue';
import UserProfile from '../components/Users/UserProfile.vue';
import NotFound from '../components/NotFound.vue';
import Retrospective from '../components/Retrospective/Retrospective.vue';
import Issues from '../components/Issues/Issues.vue';
import Velocity from '../components/Sprints/Velocity.vue';
import Burndown from '../components/Sprints/Burndown.vue';
import IssuesGraphic from '../components/Issues/IssuesGraphic.vue';
import Grade from '../components/Projects/Grade.vue';
import Revision from '../components/Revision/Revision.vue';

Vue.use(Router);

const router = new Router({

  routes: [
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/projects/:id',
      name: 'Project',
      component: Project,
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfile,
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
      path: '/sprints/:id',
      name: 'Sprint',
      component: Sprint,
    },
    {
      path: '/githubprojects',
      name: 'GitHubProjects',
      component: GitHubProjects,
    },
    {
      path: '/projects/:id/releases',
      name: 'Releases',
      component: Releases,
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
    {
      path: '/stories/assign',
      name: 'AssignMember',
      component: AssignMember,
    },
    {
      path: '/stories/score',
      name: 'ScorePoints',
      component: ScorePoints,
    },
    {
      path: '/revisions/:id',
      name: 'Revision',
      component: Revision,
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  const state = JSON.parse(localStorage.getItem('vuex'));

  if ((to.path === '/' && (state === null || state.auth === null)) || to.path === '/notFound') {
    next();
  } else if ((to.path === '/' && state.auth.token !== null)) {
    next('/projects');
  } else if (!to.matched.length) {
    next('/notFound');
  } else if (state.auth === null) {
    next('/');
  } else {
    next();
  }
});
