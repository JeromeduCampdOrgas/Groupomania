<template>
  <div class = "formPost" id = "formPost">
        <div id = "formHeader">
            <h2>Nouveau message</h2>
            <img alt="Groupomania logo" src="../assets/icon.png">
        </div>
        <form action="">
            <div class = "form-div">
                <label for="title">Titre </label> 
                <input class = 'input' type="text" name = "title" v-model="dataPost.title">
            </div>
            <div class = "form-div">
                <label for="content">Contenu</label> 
                <textarea class = 'input' name="content" id="content" cols="24" rows="10" v-model="dataPost.content"></textarea>
            </div>
            <div class = "form-div">
                <label for="picture">Image </label> 
                <input class = 'input' type="file" name = "picture" @change="onFileChange">
            </div>
            <p class="alerte" v-show="unvalablePost">Le message doit contenir au moins un titre et un contenu</p>
            <div class = "form-div">
                
                <input type = "text" id = "validationButton" class = "button"  v-on:click="newPost" value="Valider">
                <input type="text" v-if="isVisible" id = "annullationButton" class = "button"  v-on:click="allPosts" value="Annuler">
            </div>
        </form>
  </div>
</template>

<script>
import configAxios from '../axios/configAxios'

export default {
    name: "nouveau",
    data() {
        return { 
            userId: localStorage.getItem('userId'),
            dataPost:{
                title:null,
                content:null,
                picture:null
            },
            isVisible: true,
            unvalablePost: false
        }
    },
    methods:{
        allPosts(){
            this.$router.push("/AllPosts")
        },
        onFileChange(event){
            this.dataPost.picture = event.target.files[0];
        },
        newPost(){  
            if(!this.dataPost.title || !this.dataPost.content){
                this.unvalablePost = true
            }else{
            const formData = new FormData()
               formData.set("title", this.dataPost.title)
               formData.set("content", this.dataPost.content)
               formData.set("picture", this.dataPost.picture)

        configAxios.post(`messages/new`,formData)
            .then( location.replace("/AllPosts"))
            .catch(function(){console.log('que pasa')});
            }
        }
    }
}
</script>

<style scoped>
div{
    width:50%;
    margin:90px auto;;
}
.formPost{
    display: flex;
    flex-direction:column;
    width: 35%;
    margin:0 auto;
    padding:5px;
    background-color:#ddd;
    border-radius: 25px;
    z-index:2;
}
#formHeader{
    display:flex;
    justify-content:space-between;
    width:100%;
    margin:5px 24px;;
}
h2{
    text-align:center;
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
    width:30%;
}
.input{
    margin-right:0;
    width:60%;
}
.button{
    width:30%;
    text-align:center;
    cursor:pointer;
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
.button :hover{
    transform:scale(1.2);
}

@media screen and (max-width:800px){
    .formPost{
        width:90%;
        margin:30px auto;
    }

}
</style> 