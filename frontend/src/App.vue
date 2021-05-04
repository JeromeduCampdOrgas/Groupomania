<template>
  <div id = "app" v-if="renderComponent"> 
    <Header/>
  <div id = "nav" v-if="token">
      <router-link to="/"  v-if="token" @click="disconnect" > Déconnexion </router-link>
      <router-link to="/NewPost"  > Nouveau Message </router-link>
      <router-link to="/AllPosts"  > Tous les messages </router-link>
    </div>

    <div>
      <contenu v-if="token"></contenu>
      <router-view/></div>
  </div>
</template>
<script>
import store from './store/index'
//import jwtDecode from 'jwt-decode'
import Header from '@/components/Header.vue'
import Contenu from './components/Contenu.vue'

export default{
name: "App",
components: {
  Header,
  Contenu
},
data() {
  return {
    renderComponent : true ,
    token: localStorage.getItem('token') ,
    chemin: window.location.pathname
  }
  
},
methods: {
  forceRerender() {
        // Remove my-component from the DOM
        this.renderComponent = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderComponent = true;
        });
      },
  disconnect(){
    if(localStorage.getItem('token')){
    localStorage.clear()
   location.replace("/")
    }
  },
  newPost(){
    window.location.replace("/NewPost");
    window.location.reload()
  }
},
mounted(){
    const token = localStorage.getItem('token');  
    return token;
  },
    computed: {
    userLoggedIn () {
        return store.state.userLoggedIn
        }
    }


}
</script>

<style scoped>

#app {
  display:flex;
  flex-wrap:wrap;
  width:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
div{
  width:100%;
}
#nav {
  display:flex;
  justify-content:space-between;;
  width:50%;
  padding: 30px;
  text-decoration: none;
  font-weight: bold;
  margin:auto;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (max-width:800px){
  #nav {
    width:90%;
  }
}


</style>
