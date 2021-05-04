<template>
    <div class = "form" id = "form">    
        <div id = "formHeader">
            <h2>Formulaire de connexion</h2>
            <img alt="Groupomania" src="../assets/icon.png">
        </div>
        <form action="">
            <div class = "form-div">
                <label for="email">email: </label> 
                <input type="text" name = "email" v-model="dataConnexion.email">
            </div> 
            <div class = "form-div">
                <label for="password">password: </label> 
                <input type="password" name = "password" v-model="dataConnexion.password">
            </div>
            <p class="alerte" v-show="isVisible">L'adresse mail est obligatoire et doit être une adresse valide. <br>
            Le mot de passe est obligatoire et doit comporter entre 4 et 10 caractères.
            </p>
            <p class="alerte" v-show="idUncorrect ">Utilisateur inconnu.</p>
            <div  class = "form-div">
                <button id = "validationButton" class = "submit-button" v-on:click.prevent="connexion" v-on:keyup.enter="connexion" > 
                    Valider
                </button>
            </div>
        </form>
        <div >
            <p>Pas encore de compte? <span id="inscription" @click="inscription"> S'inscrire</span></p>
        </div>
            
    </div>
</template>

<script>
import store from '../store/index'
import configAxios from '../axios/configAxios'

export default {
    name: "Connexion",   
    data(){
        return {
            dataConnexion:{   
                email: null,
                password: null   
            },
            isVisible: false,
            idUncorrect:false
        }
    },
    methods:{
        connexion(){
            const email = this.dataConnexion.email;
            const password = this.dataConnexion.password;
            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
            const regexPassword = /^(?=.*\d).{4,10}$/;//chaîne de 4 à 10 caractères

            if(!email || !regexEmail.test(email) || !password || !regexPassword.test(password)){ 
                return this.isVisible = true;
            }else{
                configAxios.post(`users/login`,{
                email:email,
                password:password,
            })

                .then(result =>{
                    localStorage.setItem("token", result.data.token );                               
                    location.replace('/AllPosts') 
                       
                })
                .catch(() => this.idUncorrect = true);
            }
        },
        ajouter(){
            store.dispatch('increment',10)
        },
        changeTexte(){
            
            const valeur = document.getElementById("inputText").value
            store.dispatch('changeTexte', valeur)
        },
        inscription(){
            this.$router.push("/inscription")
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
div{
    width:50%;
    margin:100px auto;;
}
#formHeader{
    display:flex;
    justify-content:space-between;
    width:100%;
    margin:5px 24px;;
}
.form{
    display: flex;
    flex-direction:column;
    width: 50%;
    margin:0 auto;
    padding:5px;
    background-color:#ddd;
    border-radius: 25px;
    z-index:2;
}
img{
    width:8%;
    margin-right:40px;
}
.form-div{
    display:flex;
    flex-direction:flex-start;
    margin: 5px 5px 5px 14px;
    width:100%;
}
label{
    margin:5px 5px;
    padding:3px;
    text-align:left;
    width:45%;
}
input{
    margin-right:0;
    min-width:45%;
}
.submit-button{
    cursor: pointer;
    width:30%;
    margin:50px auto 15px auto;
    padding:10px;
    border:none;
    box-shadow: 1px 2px 10px 1px #aaa ;
    border-radius:20px;
    transform:scale(1.2);
}
#inscription{
    color:blue;
    text-decoration:underline;
    cursor:pointer;
}
.alerte{
    color:red;
    font-weight:bold;
}

@media screen and (max-width:800px){
    .form{
        width:95%;
        margin:5px 5px 5px 0;
    }
        .form-div{
        width:90%;
        margin:5px 5px 5px 0;
    }

}
</style>