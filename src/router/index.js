import Vue from 'vue';
import Router from 'vue-router';
import Projects from '@/components/Projects/Projects';
import Project from '@/components/Projects/Project';
import HomePage from '@/components/HomePage';
import Sprints from '@/components/Sprints/Sprints';
import Sprint from '@/components/Sprints/Sprint';
import Releases from '@/components/Releases/Releases';
import Release from '@/components/Releases/Release';
import UserProfile from '@/components/Users/UserProfile';
import NotFound from '@/components/NotFound';
import Retrospective from '@/components/Retrospective/Retrospective';
import Revision from '@/components/Revision/Revision';
import Issues from '@/components/Issues/Issues';

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
      path: '/revisions/:id',
      name: 'Revision',
      component: Revision,
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
