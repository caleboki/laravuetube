import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VideoWatch from '../views/VideoWatch'
import TagVideoList from '../views/TagVideoList'
import Admin from '../views/Admin.vue';
import AdminVideoCreate from "../views/AdminVideoCreate.vue";
import AdminVideoList from "../views/AdminVideoList.vue";
import AdminVideoEdit from "../views/AdminVideoEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegistration from "../views/UserRegistration.vue";
import AdminVideoShow from "../views/AdminVideoShow";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser && currentUser.admin) {
        next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "videos",
        name: "admin-video-list",
        component: AdminVideoList,
      },
      {
        path: "users",
        name: "admin-user-list",
        component: AdminUserList
      },
      {
        path: "videos/:id/edit",
        name: "admin-video-edit",
        component: AdminVideoEdit,
        params: true,
      },
      {
        path: "video/new",
        name: "admin-video-create",
        component: AdminVideoCreate
      },
      {
        path: "videos/:id/show",
        name: "admin-video-show",
        component: AdminVideoShow,
        params: true,
      },
    ]
  },
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser && currentUser.admin) {
        next("/");
      } else {
        next();
        
      }
    },
    
  },
  {
    path: '/registration',
    name: 'user-registration',
    component: UserRegistration,
    beforeEnter(to, from, next) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser && currentUser.admin) {
        next("/");
      } else {
        next();
        
      }
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
  {
    path: '/video/:id',
    name: 'video-watch',
    component: VideoWatch,
    params: true
  },
  {
    path: '/tag/:id',
    name: 'tag',
    component: TagVideoList,
    params: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
