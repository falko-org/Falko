import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Projects from '@/components/Projects'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: Projects
    }
  ]
})
