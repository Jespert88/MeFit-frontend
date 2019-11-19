<template>
<p>{{this.usersId[3]}}</p>
</template>

<script>

import axios from 'axios'
export default {
  name: "home",
   data() {
        return{
          usersId : []
        }
    },

  created(){
    axios.get('https://me-fit.herokuapp.com/profile/'+this.$auth.user.sub.substring(6)).then(response => {
        if(response.status == '202'){

        }else if (response.status == '403'){
          axios.post('https://me-fit.herokuapp.com/createProfile/',{
            userId =  this.$auth.user.sub.substring(6)
          }).then(response =>{
            if (response == '201'){
              window.location('/profile')
            }
          })
        }
      })
  },

  components: {
  },
  methods :{
      checkifexist : function () {
      console.log(this.usersId)
      }
      // if(element.userId === this.$auth.user.sub.substring(6) ){
      //  return true;
      // }else{
      //   return false;
      // }
      
      
    
  } 
};
</script>


