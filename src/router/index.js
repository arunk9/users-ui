import { createRouter, createWebHistory } from 'vue-router'
import ListUser from '../components/ListUser.vue'
import CreateUser from '../components/CreateUser.vue'
import EditUser from '../components/EditUser.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListUser
    },
    {
      path: '/create',
      name: 'create',
      component: CreateUser
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditUser,
      props: true
    }
  ]
})

export default router
