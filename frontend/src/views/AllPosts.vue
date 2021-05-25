<template>
<div id = "container" >   
    <div id = "card">   
        <div v-for="post in posts" v-bind:key="post"  class = "post"  >
            <h3 @click="AffichePosts">{{ post.title }}</h3>  
            <img :src=" post.attachment " alt="">
            <div class = 'content'>
                <p>Post créé par <strong>{{ post.createdBy}} </strong> le {{ post.createdAt }}</p>
                <p>{{ post.content }}</p> 
            </div>
            <div id = "likes">
                <i class="fas fa-heart" ><span class = "likesCount">{{ post.likes }}</span></i>  
                <span id = "like" @click="like(post.id)" v-if="!post.liked">j'aime! </span> 
                <span id = "unlike" @click="unlike(post.id)" v-else>j'aime plus</span> 
                <!--<span id = "comments" @click.prevent="getPostId(post.id)">Commentaires</span>-->
            </div>
            <div class = "buttonModif" v-if="userLoggedIn.isAdmin == true || userLoggedIn.id == post.userId">
                <span class = "modif" id ="buttonModif" @click.prevent="getPostId(post.id)" @mouseover = " hover = true "
                @mouseleave = " hover = false " :class = " {active: hover} ">Modifier</span>
                <span class = "modif" id = "buttonDelete" @click="deletePost(post.id)"  @mouseover = " survol = true "
                @mouseleave = " survol = false " :class = " {actif: survol} ">Supprimer</span>  
            </div>
        </div>

    </div>
 
  </div>
</template>

<script>
//import axios from "axios";
import store from '../store/index'
import jwtDecode from 'jwt-decode'
import dataPost from './NewPost.vue'
import configAxios from '../axios/configAxios'

export default {
name:'AllPosts',
data(){
    return{
    posts :[],
    users :[],
    postId: [],
    likedPost:[],
    user: [],
    hover :  false,
    survol :  false 
    }
},

methods: {
    getPosts(){
        const token = localStorage.getItem('token')
        const decoded =jwtDecode(token)
        this.posts.push(dataPost)

        configAxios.get(`messages`)
            .then(response => {
                for(let elem of response.data){
                    Object.defineProperties(elem,{
                        'liked':{
                            value: false,
                            writable: true
                            },
                        'createdBy': {
                            value: '',
                            writable: true
                        }
                    })
                }
                this.posts = response.data
                this.user = decoded
                for(let post of this.posts){
                    let timestamp = Date.parse(post.createdAt);
                    let date = new Date(timestamp);
                    post.createdAt= date.toLocaleDateString();
                    for(let user of post.Users){
                        if(user.id == decoded.userId){
                        post.liked = true
                        }
                    }      
                }   
                configAxios.get(`users`)
                .then(response => {
                    this.users = response.data;
                    for(let post of this.posts){         
                        for(let user of this.users){
                            if(user.id == post.userId){
                                post.createdBy = user.username
                            }
                        }    
                    }
                })
                .catch(() => this.users = [{title: "Requête non autorisée"}])
                configAxios.get(`users/me/`)    
                        .then(result => {
                            store.dispatch('getUserInfos',result.data )
                            
                        })
                        .catch(() => console.log('Touche pas ça p\'tit con'))   
            })       
            .catch(()=> this.posts = [{title: "Erreur de chargement"}])
    },
    getPostId(id){ 
            this.$router.push("/PostId/" + id + "")   
        },
    like(id){
        configAxios.post(`messages/` + id + `/vote/like`,{})
        .then(() => {
            for(let post of this.posts){ 
                if(post.id == id){
                    post.likes++
                    post.liked = true
                }
            }    
        })  
        .catch(error => console.log(error))
    },
    unlike(id){
       configAxios.post(`messages/` + id + `/vote/dislike`,{})
        .then(() => {
            for(let post of this.posts){ 
                if(post.id == id){
                    post.likes--
                    post.liked = false
                }
            } 
        })
        .catch(error => console.log(error))
},
    deletePost(id){
        /*const token = localStorage.getItem('token')
        axios
        .delete("http://localhost:3000/api/messages/" + id +'',{
        headers: {"Authorization": "Bearer " + token}})*/
        configAxios.delete(`messages/` + id + ``)
        .then(() => location.replace('/AllPosts'))
        .catch()
    },
    AffichePosts() {
      let timestamp = Date.parse(this.createdAt);
      let date = new Date(timestamp);
      return date.toLocaleDateString();
    }
    },
mounted(){ 
    this.$nextTick(this.getPosts,this.getUsers)
    },
computed: {
    userLoggedIn () {
        return store.state.userLoggedIn
        },
    currentPostId() {
        return store.state.currentPostId
        }
    }
}
    


</script>

<style scoped>
    #container{
        display:flex;  
        justify-content:center;
    }
    #card{
        display:flex;
        flex-direction:column;
    }
    .post{
        width:50%;
        margin: 1em auto;
        background-color: #F2F5F7;
        border-radius:15px;  
    }
    .content{
        margin: 15px;
    }
    img{
        margin:auto;
        width:80%;
    }

    
/*likes*/
#likes{
    display:flex;
    justify-content:space-between;
    padding:20px;
    font-weight:bold;
}
.likesCount{
    margin-left:10px;
}
.fas{
    color:rgb(155, 30, 155);
}
#comments, #like, #unlike{
    cursor:pointer;
}

.buttonModif{
    margin: 0 auto 10px auto;
    font-weight:bold;
}
.modif{
    cursor:pointer;
    margin: 10px;
}
.active{
    color:green;
}
.actif{
    color:red;
}


@media screen and (max-width:800px){
.post{
    width:90%;
}
}
</style>