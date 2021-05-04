<template>
 <div>     
    
    <div id = "postContainer" >
        <div class ="post">
            <div class = "card" >
                <h3>{{ post.title }}</h3>      
                <img :src=" post.attachment " alt="">
            </div>
            <div class = 'content'>
                <p>{{ post.content }}</p>
            </div>
            <div v-if="userLoggedIn.isAdmin">
                <button  >Modifier</button>
                <button @click="deletePost">Supprimer</button>
            </div>
        </div>
        <form action="" id = "modif"> 
            <h3>Modifiez votre message</h3>
            <div class ="modif">
                <label for="title">Titre </label> 
                <input type="text" v-model="post.title" name = "title">
            </div>
            <div class ="modif">
                <label for="picture">Image </label> 
                <input type="file" name = "picture" @change="onFileChange"> 
            </div>
            <div class ="modif">
                <label for="content">Contenu</label> 
                <textarea name="content" id="content" cols="33" rows="18" v-model="post.content"></textarea>
            </div>
            <p class="alerte" v-show="isVisible">
                Vous n'êtes pas autorisé pour cette action
            </p>
            <input type="text" id = "validationButton" class = "submit-button"  v-on:click="validModif" value="Valider">
        </form>
    </div>
    
  </div>
</template>

<script>
import configAxios from '../axios/configAxios'
import store from '../store/index'

export default {
    name: "message",
    
    //store: store,
    data(){
        return {
            post: [],
            dataPost:{
                picture:''
            },
            isVisible: false
        }
    },
    methods: {
        getMessage(){
            const page = window.location;

            let str = String(page)
            let idMessage = str.split("/").pop(); 

          configAxios.get(`messages/` + idMessage + ``)
                .then((response) => {
                    this.post = response.data})
                .catch(()=> this.post = [{title: "Erreur de chargement"}])
        },
    deletePost(){
        const page = window.location;

        let str = String(page)
        let idMessage = str.split("/").pop(); 


        configAxios.delete(`messages` + idMessage + ``)
            .then(()=> {location.replace("/AllPosts") })
            .catch(()=> this.post = [{title: "Erreur de traitement"}])
        },
        requeteAxios(){

            configAxios.get(`users/me/`)
            .then(result => {console.log('result.data: ');

            store.dispatch('getUserInfos',result.data )})
            .catch(() => console.log('Touche pas ça p\'tit con'))
        },
        ajouter(){
            store.dispatch('increment')
        },
        onFileChange(event){  
            this.post.attachment = event.target.files[0];  
        },
        validModif(){   
            const userId = this.post.userId;
            const currentUserLoggedInId = this.$store.state.userLoggedIn.id
            const isAdmin = this.$store.state.userLoggedIn.isAdmin

           if(userId != currentUserLoggedInId && !isAdmin ){
               return this.isVisible = true;
           }else{
            const formData = new FormData()
                formData.set("userId",this.post.userId)
                formData.set("title", this.post.title)
                formData.set("content", this.post.content)
                formData.set("picture",this.post.attachment)

                configAxios.put(`messages/` + this.post.id + ``, formData)
                .then(() => {
                    window.location.replace("/AllPosts")
                })
                .catch(console.log('prout'))
            }   
        }
    },
    mounted() {
         this.$nextTick(this.getMessage,)         
         },
    computed: {
    userLoggedIn () {
      return store.state.userLoggedIn
    }
    }
}
</script>

<style scoped>
#container{
    background:blue;
}
#postContainer{
    display:flex;
    flex-direction:row;
    align-content:space-between;
}
    #card{
        display:flex;
        flex-direction:column;
    }
    .post{
        width:25%;
        margin: 1em auto;
        background-color: #F2F5F7;
        border-radius:15px;  
    }
    .modif{
        display:flex;
        margin: 30px 5px;
    }
    #modif{
        width:25%;
        margin: 1em auto;

        background-color: #F2F5F7;
        border-radius:15px;  
    }
    label{
    margin:5px 5px;
    padding:3px;
    text-align:left;
    width:30%;
}
    img{
        margin:auto;
        width:100%;
    }
    .submit-button{
        cursor:pointer;
    width:30%;
    text-align:center;
    margin:15px auto 15px auto;
    padding:10px;
    border:none;
    box-shadow: 1px 2px 10px 1px #aaa ;
    border-radius:20px;
    }
    .alerte{
    color:red;
    font-weight:bold;
}


@media screen and (max-width:800px){
    #postContainer{
    display:flex;
    flex-direction:column;
    align-content:space-between;
    }
    .post,#modif{
        width:90%;
    }
}
</style>