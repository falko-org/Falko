import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import AddProject from '@/components/AddProject'
import InProject from '@/components/InProject'
import DeleteProject from '@/components/DeleteProject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/addproject',
      name: 'AddProject',
      component: AddProject
    },
    {
      path: '/inproject/:id',
      name: 'InProjects',
      component: InProject
    },
    {
      path: '/deleteproject',
      name: 'DeleteProject',
      component: DeleteProject
    },
  ]
})
