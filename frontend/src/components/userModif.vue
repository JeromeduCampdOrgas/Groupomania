<template>

    <div >
        <h1>Modifier mes informations</h1>
        <form action="">
            <div class = "form-div">
                <label for="username">username: </label>
                <input type="text" name = "username" v-model="this.$store.state.userLoggedIn.username">
            </div>
            <div class = "form-div">
                <label for="email">email: </label> 
                <input type="text" name = "email" v-model="this.$store.state.userLoggedIn.email">
            </div> 
            <div>
                <input id = "validationButton" class = "button" type="button" value = "Valider" @click="userValid">
            </div>
        </form>
    </div>

</template>

<script>
import store from '../store/index'
import axios from 'axios'
export default {

    name: 'user-modif',
    data(){
        return {
            user:{
                username:'',
                email:''
            }
        }
    },
    props: ['revele','toggleModale'],
    components: {      
    },
    methods:{
        userValid(){
        const token = localStorage.getItem('token')
      
        this.user.username = this.$store.state.userLoggedIn.username
        this.user.email = this.$store.state.userLoggedIn.email

            axios
                .put("http://localhost:3000/api/users/me",{
                    username:this.user.username,
                    email:this.user.email
                }, {
                    headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("token")
                    }    
                })
                .then(() => {
                    alert('Profil modifié')
                                        axios
                    .get("http://localhost:3000/api/users/me/",{
                    headers: {
                        Authorization: "Bearer " + token
                    } 
                    })
                        .then(result => {
                            store.dispatch('getUserInfos',result.data )
                            location.replace('/AllPosts') 
                        })
                        .catch(() => console.log('Touche pas ça p\'tit con'))  
                })               
                .catch(console.log('echec'))
        }    
    }
}

</script>
<style >
    .button{
    width:30%;
    text-align:center;
    cursor:pointer;
    margin:15px 30px;
    padding:10px;
    border:none;
    box-shadow: 1px 2px 10px 1px #aaa ;
    border-radius:20px;
}
.form-div{
    display:flex;
    width:50%;
    margin: 5px auto;}
</style>
