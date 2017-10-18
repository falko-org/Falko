import Vue from 'vue'
import Router from 'vue-router'
import Projects from '@/components/Projects'
import AddProject from '@/components/AddProject'
import InProject from '@/components/InProject'
import DeleteProject from '@/components/DeleteProject'
import EditProject from '@/components/EditProject'
import Login from '@/components/Login'
import Register from '@/components/Register'
import LoginRegister from '@/components/LoginRegister'
import HomePage from '@/components/HomePage'
import NoProjects from '@/components/NoProjects'
import SprintIndex from '@/components/SprintIndex'
import InSprint from '@/components/InSprint'
import EditSprint from '@/components/EditSprint'
import DeleteSprint from '@/components/DeleteSprint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/projects',
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
    {
      path: '/editproject/:id',
      name: 'EditProjects',
      component: EditProject
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },

    {
      path: '/loginregister',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/inproject/:id/sprint',
      name: 'SprintIndex',
      component: SprintIndex
    },
    {
      path: '/insprint/:id',
      name: 'InSprint',
      component: InSprint
    },
    {
      path: '/deletesprint',
      name: 'DeleteSprint',
      component: DeleteSprint
    },
    {
      path: '/editsprint',
      name: 'EditSprint',
      component: EditSprint
    }
  ]
})
