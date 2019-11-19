<template>
<!-- <p>{{this.usersId[3]}}</p> -->
 
  <div>
  <Loading v-if="loading"/> 
   <div>
        <p>this is home page  {{this.userId}}</p>
  </div>
  </div>
</template>

<script>

import axios from 'axios'
import Loading from '../components/Loading.vue'

export default {
  name: "home",
   data() {
        return{
         userId : '',
         loading :false,
         }
    },

  created(){
       this.loading =true;
      this.fetchAndCreateProfile()
      
  },
  components: {
    Loading
  },
  methods :{
      async fetchAndCreateProfile(){
      this.userId = await this.$auth.userId
      if(this.userId == undefined){
        console.log('here')
        this.$router.push('/')
      }else {
      axios.get('https://me-fit.herokuapp.com/profile/user/'+this.userId).then(response => {
       this.loading =false;
       console.log(response)
        if(response.status == '202' && response.data !=""){
            console.log('fetched----')
        }
       else if (response.status == '202' && response.data ==""){
          console.log('here')
          axios.post('https://me-fit.herokuapp.com/createProfile/',{
            userId :  this.$auth.user.sub.substring(6)
          }).then(response =>{
            console.log(response)
            if (response.status == '201'){
              this.$router.push('/profile')

            }
          })
        }
        else if (response.status=='400'){
          console.log('400')
        }
      })
      }
      // if(element.userId === this.$auth.user.sub.substring(6) ){
      //  return true;
      // }else{
      //   return false;
      // } 
  } 
  }
};
</script>


