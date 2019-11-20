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
            console.log('fetched----')
        }
       else if (response.status == '202' && response.data ==""){
          axios.post('https://me-fit.herokuapp.com/createProfile/',{
            userId :  this.$auth.user.sub.substring(6)
          }).then(response =>{
            if (response.status == '201'){
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

  }
};
</script>


