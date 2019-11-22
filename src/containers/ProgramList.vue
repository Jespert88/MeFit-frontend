<template>
    <div class="content">
        <Loading v-if="loading"/>

        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

        <div v-if="!loading">

            <b-container fluid v-if="!this.Myown">
              <b-button v-if="$auth.isContributor" @click="showOnlyMyPrograms">Show my programs</b-button>
                <b-row>
                    <b-col v-for="program in programList" :key="program.id" class="col-lg-3" >
                        <ProgramCard :program="program" :goal="false"/>
                    </b-col>
                </b-row>
            </b-container>

            <b-container fluid v-if="this.Myown">
              <b-button v-if="$auth.isContributor" @click="showAllprograms">Show All programs</b-button>
                <b-row>
                    <b-col v-for="program in minprogramList" :key="program.id" class="col-lg-3" >
                        <ProgramCard :program="program" @clickedToUpdate="redirectToUpdateprogram" :toViewAndUpdate="true" :toUpdate="true"/>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading'
import ProgramCard from '../components/ProgramCard'
export default {
      components: {
        ProgramCard,
        Loading
    },
  data(){
    return {
      successMessage : '',
      errorMessage : '',
      programList : [],
      loading : false,
      profileId : this.$auth.profileId,
      minprogramList : [],
      Myown : false
    }
  },
  created(){
   this.showAllprograms()
  },
  methods: {
    showAllprograms(){
    this.Myown = false
    this.loading = true;
    axios.get('https://me-fit.herokuapp.com/program').then(response => {
      this.loading= false
      this.errorMessage = ""
      this.programList = response.data.slice(0)
      console.log(this.programList)
      console.log(response)
    //   if(response.status == "202"){
    //     this.programlist = response.data.slice(0)
    //     console.log(this.programList)
    //   } else if (response.status == 404) {
    //       // not found
    //       this.errorMessage = "programs not found"
    //   } else if (response.status == 400) {
    //       // bad request
    //       this.errorMessage = "Bad request, try again"
    //   } else {
    //       // something went wrong
    //       this.errorMessage = "Something went wrong, try again"
    //   }
    }).catch(e => {
      this.errorMessage = "Something went wrong, try again: " + e
    })
    },
    redirectToUpdateProgram (program){
      let id = program.programId
      console.log('updating ' + program.programId)
      this.$router.push({name:'UpdateProgram' , params :{sentId :id} })
    },
    showOnlyMyPrograms () {
      this.profileId = this.$auth.profileId
       if (event) {
        event.preventDefault()
       }
      this.loading=true;
      console.log(this.profileId)
      //get users programss
      axios.get('https://me-fit.herokuapp.com/program/user/'+this.profileId).then(response => {
      this.loading= false
      this.errorMessage = ""
      if(response.status == "202"){
        this.minprogramlist = response.data.slice(0)
      } else if (response.status == 404) {
          // not found
          this.errorMessage = "Programs not found"
      } else if (response.status == 400) {
          // bad request
          this.errorMessage = "Bad request, try again"
      } else {
          // something went wrong
          this.errorMessage = "Something went wrong, try again"
      }
    }).catch(e => {
      this.errorMessage = "Something went wrong, try again: " + e
    })

    //hide old list and show new one with update button on them as this user can update them
    this.Myown =true;
    } 
  }
}
</script>

<style>
/* Desktop */
  .card {
    width: 240px;
    margin: 10px;
    background: rgba(70, 155, 172, 0.5);
  }

</style>