import { createRouter, createWebHistory } from 'vue-router'
import Inscription from "../views/Inscription.vue"
import Home from "../views/Connexion.vue"
import AllPosts from "../views/AllPosts.vue"
import NewPost from "../views/NewPost.vue"
import PostId from "../views/PostId.vue"
//import Profile from "../views/profileUpdate.vue"

const routes = [
 
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Inscription",
    name: "inscription",
    component: Inscription
  },
 
  {
    path: "/AllPosts",
    name: "AllPosts",
    component: AllPosts,
    beforeEnter:(to, from, next) => {
      localStorage.getItem('token')? next() : next({ name: "Home"})
    }
  },
  {
    path: "/NewPost",
    name: "NewPost",
    component: NewPost,
    beforeEnter:(to, from, next) => {
      localStorage.getItem('token')? next() : next({ name: "Home"})
    },
    
    beforeRouteUpdate () {
      // react to route changes...
      
      // don't forget to call next()
    }
  },
   {
    path: "/PostId/:id",
    name: "PostId",
    component: PostId,
    beforeEnter:(to, from, next) => {
      localStorage.getItem('token')? next() : next({ name: "PostId"})
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
