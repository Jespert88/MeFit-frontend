<template>
    <div class="content">
        <Loading v-if="loading"/>

        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

        <div v-if="!loading">
                          <h2 class="text-center" style="font-weight:bold">Programs</h2>

            <b-container fluid v-if="!this.Myown">
              <b-button v-if="$auth.isContributor" @click="showOnlyMyPrograms">Show my programs</b-button>
                <b-row>
                    <b-col cols="12" xl="6" sm="10" md="10" v-for="program in programList" :key="program.id"  >
                        <ProgramCard :program="program" :goal="false" :toViewAndUpdate="false"/>
                    </b-col>
                </b-row>
            </b-container>

            <b-container fluid v-if="this.Myown">
              <b-button v-if="$auth.isContributor" @click="showAllprograms">Show All programs</b-button>
                <b-row>
                    <b-col  cols="12" xl="6" sm="12" md="12" v-for="program in minProgramList" :key="program.id"  >
                        <ProgramCard :program="program"  @clickedToUpdate="redirectToUpdateProgram" :goal="false" :toViewAndUpdate="true"/>
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
      minProgramList : [],
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
      //get users programss
      axios.get('https://me-fit.herokuapp.com/program/user/'+this.profileId).then(response => {
      if(response.status == "202"){
           this.loading= false
            this.errorMessage = ""
            this.minProgramList = response.data.slice(0)  
      } else if (response.status == 404) {
          this.errorMessage = "Programs not found"
      } else if (response.status == 400) {
          this.errorMessage = "Bad request, try again"
      } else {
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