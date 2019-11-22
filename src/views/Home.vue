<template>
<!-- <p>{{this.usersId[3]}}</p> -->
 
  <div class="content">
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
      console.log('here')
      axios.get('https://me-fit.herokuapp.com/profile/user/'+this.userId).then(response => {
       this.loading =false;
       console.log(response)
        if(response.status == '202' && response.data !=""){
            console.log('fetched----')
        }

      }).catch(e =>{
        if(e == "Error: Request failed with status code 404"){
         axios.post('https://me-fit.herokuapp.com/createProfile/',{
            userId :  this.$auth.user.sub.substring(6)
          }).then(response =>{
            if (response.status == '201'){
              this.$router.push('/profile')

            }
          })
        }else {
        console.log('erros is : ' +e)

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


