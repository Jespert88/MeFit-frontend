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
import Vue from 'vue'
export default {
  name: "home",
   data() {
        return{
         userId : this.$auth.userId,
         loading :false,

         }
    },

  created(){
      this.loading =true;
      axios.get('https://me-fit.herokuapp.com/profile/user/'+this.userId).then(response => {
        
       this.loading =false;
       console.log(response)
        if(response.status == '202' && response.data !=""){
          console.log(response.data.profileId)
            Vue.prototype.$profileid= response.data.profileId
            console.log('fetched----')
        }
       else if (response.status == '202' && response.data ==""){
          axios.post('https://me-fit.herokuapp.com/createProfile/',{
            userId :  this.$auth.user.sub.substring(6)
          }).then(response =>{
            if (response.status == '201'){
              const ProfileID =response.headers.location.substring(37)
              Vue.prototype.$profileid= ProfileID
              this.$router.push('/profile')

            }
          })
        }
        else if (response.status=='400'){
          console.log('400')
        }
      })
  },
  components: {
    Loading
  },
  methods :{
      async fetchAndCreateProfile () {
      // this.userId = this.$auth.userId
      const user = await this.$auth.user
      // console.log(this.$auth)
      // console.log(this.$auth.userId)
      console.log(user)
      console.log(user.sub)
      console.log(user.sub.substring(6))
      

  } 
  }
};
</script>


