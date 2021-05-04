<template>
  <div class = "bloc-modale" v-if="revele">
      <div @click="toggleModale" class = "overlay"></div>
      <div class = "modale card">
          <div @click="toggleModale" class="btn-modale btn btn-danger">X</div>
          <h2>Mes Informations</h2>
          <p id="username">Moi: {{ userLoggedIn.username }}</p>
          <!--<span class="updtate" ><input type="text"></span>-->
          <p id="email">E-mail: {{ userLoggedIn.email }}</p>

        <!--<button @click="role" class = 'btn'>Modifier mes informations</button>
          <button @click="deleteAccount" class = 'btn'>Supprimer mon compte</button>-->

          <input type="text" @click="role" class = 'button' value="Modifier mes informations">
          <input type="text" @click="deleteAccount" class = 'button' value="Supprimer mon compte">
            <userModif v-bind:revele="affiche" v-if="affiche"></userModif>
      </div>

  </div>
</template>

<script>
import store from '../store/index'
import userModif from '@/components/userModif.vue'
import configAxios from '../axios/configAxios'

export default {
    name: 'Modale',
    data(){
        return {
            affiche:false,
            info:{
                username: this.$store.state.userLoggedIn.username,
                email: this.$store.state.userLoggedIn.email 
            }
            }
    },
    props: ['revele','toggleModale'],
    components:{
        userModif
    },
    methods: {  
        role: function(){
            this.affiche = !this.affiche
        },  
        deleteAccount(){
        const email = store.state.userLoggedIn.email
        configAxios.post(`users/me/delete`,{email : email})

        .then(() => {
           localStorage.clear()
           location.replace("/")}
           )
        .catch(error => console.log(error))
        }
    },
    computed: {
    userLoggedIn () {
        return this.$store.state.userLoggedIn
        }
    }


}

</script>

<style scoped>
    .bloc-modale{
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .overlay{
        background: rgba(0,0,0,0.5);
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
    }
    .modale{
        background: #f1f1f1;
        color: #333;
        padding:50px;
        position:fixed;
        top:30%;
    }
    .modale p{
        text-align:left;
    }
    .btn-modale{
        position:absolute;
        top:10px;
        right:10px;
        background: red;
        color: white;
        padding:5px;
        border-radius:5px;
        cursor: pointer;
    }
    .button{
    width:30%;
    text-align:center;
    cursor:pointer;
    margin:0 33px;
    padding:10px;
    border:none;
    box-shadow: 1px 2px 10px 1px #aaa ;
    border-radius:20px;
}

@media screen and (max-width:800px){
    .bloc-modale{
        height:50%;
    }
}

</style>