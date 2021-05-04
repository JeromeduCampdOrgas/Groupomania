<template>

    <div class = "container">
      <h4 @click="toggleModale"  v-if="token" @mouseover = " hover = true "
       @mouseleave = " hover = false " :class = " {active: hover} ">Mon profil</h4>
      <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
    </div>
  
</template>

<script>
import Modale from './Modale'

export default {
    name:'Contenu',
    data(){
        return {
            token: localStorage.getItem('token') ,
            revele: false,
            hover :  false 
        }
    },
    components: {
        'modale': Modale
    },
    methods: {
        toggleModale: function(){

            this.revele = !this.revele
        }

    }
}
</script>

<style>
.container{
    width:100%;
    text-align:center;
}
h4{
    position: absolute;
    cursor:pointer;
    text-decoration: underline;
    width:100px;
    right:10px;
    top:142px;

}

.active  { 
  color: red ; 
}

@media screen and (max-width:800px){
    h4{
        left:26px;;
        top:110px;  
    }
 
}

</style>