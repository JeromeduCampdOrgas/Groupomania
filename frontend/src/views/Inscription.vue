<template>

    <div class = "form" id = "form">
        <div id = "formHeader">
            <h2>Formulaire d'inscription</h2>
            <img alt="Groupomania" src="../assets/icon.png">
        </div>
        <form action="">
            <div class = "form-div">
                <label for="email">email: </label> 
                <input class="info" type="text" name = "email" id = "email" v-model="dataInscription.email">
            </div>  
            <div class = "form-div">
                <label for="username">username: </label>
                <input class="info" type="text" name = "username" id = "username" v-model="dataInscription.username">
            </div>
            <div class = "form-div">
                <label for="password">password: </label>
                <input class="info" type="password" name = "password" id = "password" v-model="dataInscription.password">
            </div>
            <p class="alerte" v-show="isVisible">L'adresse mail est obligatoire et doit être une adresse valide. <br>
            Le username est obligatoire et doit comporter à minima 2 caractères. <br>
            Le mot de passe est obligatoire et doit comporter entre 4 et 10 caractères et au moins 1 chiffre.
            </p>
            <div class = "form-div">
                <!-- <button id = "validationButton" class = "submit-button" v-on:click.prevent="connexion" v-on:keyup.enter="connexion" > 
                    Valider
                </button>-->
                <button id = "validationButton" class = "button"  v-on:click="inscription">Valider</button>
                <!--<input type="text" id = "validationButton" class = "button"  v-on:click="inscription" value="Valider">-->
                <!--<input type="text" id = "annullationButton" class = "button"  v-on:click="cxAccess" value="Annuler">-->
                <button id = "annullationButton" class = "button"  v-on:click="cxAccess">Annuler</button>
            </div>
        </form>
        
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "Inscription",    
    data(){
        return {
            dataInscription:{   
                email: null,
                username: null,
                password: null
            },
            isVisible: false
        }
    },  
 
    methods:{

        cxAccess(){
            this.$router.push("/")
        },
        inscription(){
            const email = this.dataInscription.email;
            const username = this.dataInscription.username;
            const password = this.dataInscription.password;
            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
            const regexUsername = /^[a-zA-Zéèîï][a-zéèîïçàô]+([-'\s][a-zA-Zéèîï][a-zéèîïçàô]+)?/ ;
            const regexPassword = /^(?=.*\d).{4,10}$/;//chaîne de 4 à 10 caractères
            
            if(!email || !regexEmail.test(email) || !username || !regexUsername.test(username)
            || !password || !regexPassword.test(password)){
                return this.isVisible = true;
            }else{
                    axios
                    .post("http://localhost:3000/api/signup",{
                        email:email,
                        username:username,
                        password:password
                    })
                        .then(function(){
                           location.replace("/")})
                        .catch(function(error){
                            console.log(error)
                        })
            }

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

.info{
    margin-right:0;
    min-width:45%;
}
.button{
    cursor: pointer;
    text-align:center;
    margin:50px auto 15px auto;
    padding:10px;
    border:none;
    box-shadow: 1px 2px 10px 1px #aaa ;
    border-radius:20px;
    transform:scale(1.2);
}
.alerte{
    color:red;
    font-weight:bold;
}
#inscription{
    color:blue;
    text-decoration:underline;
    cursor:pointer;
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