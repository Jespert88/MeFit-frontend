<template>
  <div class  ="content">
    <b-container fluid>
        <b-row >
          <b-col cols="3" md="3" xl="2" sm="3">
            <SideNavbar/>
          </b-col>
          <b-col  cols="3" md="9" xl="10" sm="9">
            <router-view id="routerView" :stuff="stuff"/>
          </b-col>
        </b-row>
    </b-container>


  </div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'
import axios from 'axios'
export default {
    data () {
      return {
        userId  :this.$auth.userId,
        stuff: ""
      }
    },
    components: {
        SideNavbar
    },
    created(){
      this.checkIfProfileExist()
    },
    methods: {
      checkIfProfileExist (){
       this.loading =true;
      console.log('here')
      axios.get('https://me-fit.herokuapp.com/profile/user/'+this.userId).then(response => {
       this.loading =false;
       console.log(response)
        if(response.status == '202' && response.data !=""){
            console.log('fetched----')
            this.stuff = response.data.profileId
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
    }
    }
}
</script>

<style>
#routerView {
  margin-top: 2%;
}
</style>
