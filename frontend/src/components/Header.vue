<template>
  <header>
    <div id = "logo" >
        <img alt="logo" src="../assets/icon-left-font-resize.png">
    </div>
  </header>
</template>

<script>
export default {
    name: 'Header',
    components: {      
    }
}

</script>

<style scoped>
header{
  width:100%;
}
#logo{
  top:0;
  margin:auto;
  width:100%;
  }
  #logo img{
      width:50%;
      margin:auto;
  }
</style>