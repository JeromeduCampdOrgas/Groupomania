<template>

    <div >
        <h1>Modifier mes informations</h1>
        <form action="">
            <div class = "form-div">
                <label for="username">username: </label>
                <input type="text" id = "username" name = "username" v-model="this.$store.state.userLoggedIn.username">
            </div>
            <div class = "form-div">
                <label for="email">email: </label> 
                <input type="text" id = "email" name = "email" v-model="this.$store.state.userLoggedIn.email">
            </div> 
            <div>
                <button id = "validationButton" class = "button" type="button" @click="userValid">Valider</button>
            </div>
        </form>
    </div>

</template>

<script>
import store from '../store/index'
import configAxios from '../axios/configAxios'
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
        this.user.username = this.$store.state.userLoggedIn.username
        this.user.email = this.$store.state.userLoggedIn.email
            configAxios.put(`users/me`,{
                username:this.user.username,
                email:this.user.email})
                .then(() => {
                    alert('Profil modifié')
                    configAxios.get(`users/me`)
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
