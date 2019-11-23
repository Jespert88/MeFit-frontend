<template>
    <div class="content">
        <Loading v-if="loading"/>

        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

        <div v-if="!loading">

            <b-container fluid v-if="!this.Myown">
              <b-button v-if="$auth.isContributor" @click="showOnlyMyWorkouts">Show my workouts</b-button>
                <b-row>
                    <b-col v-for="workout in workoutList" :key="workout.id" cols="10" xl="4" sm="10" md="7" >
                        <WorkoutCard :workout="workout"  :toViewAndUpdate="false" :toUpdate="true"/>
                    </b-col>
                </b-row>
            </b-container>

            <b-container fluid v-if="this.Myown">
              <b-button v-if="$auth.isContributor" @click="showAllworkouts">Show All workouts</b-button>
                <b-row>
                    <b-col v-for="workout in minWorkoutList" :key="workout.id" cols="10" xl="4" sm="10" md="7">
                        <WorkoutCard :workout="workout" @clickedToUpdate="redirectToUpdateWorkout" :toViewAndUpdate="true" :toUpdate="true"/>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading'
import WorkoutCard from '../components/WorkoutCard'
export default {
      components: {
        WorkoutCard,
        Loading
    },
  data(){
    return {
      successMessage : '',
      errorMessage : '',
      workoutList : [],
      loading : false,
      profileId : this.$auth.profileId,
      minWorkoutList : [],
      Myown : false
    }
  },
  created(){
   this.showAllworkouts()
  },
  methods: {
    showAllworkouts(){
    this.Myown = false
    this.loading = true;
    axios.get('https://me-fit.herokuapp.com/workout').then(response => {
      this.loading= false
      this.errorMessage = ""
      if(response.status == "202"){
        this.workoutList = response.data.slice(0)
      } else if (response.status == 404) {
          // not found
          this.errorMessage = "Workouts not found"
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
    },
    redirectToUpdateWorkout (workout){
      let id = workout.workoutId
      console.log('updating ' + workout.workoutId)
      this.$router.push({name:'UpdateWorkout' , params :{sentId :id} })
    },
    showOnlyMyWorkouts () {
      this.profileId = this.$auth.profileId
       if (event) {
        event.preventDefault()
       }
      this.loading=true;
      console.log(this.profileId)
      //get users workouts
      axios.get('https://me-fit.herokuapp.com/workout/user/'+this.profileId).then(response => {
      this.loading= false
      this.errorMessage = ""
      if(response.status == "202"){
        this.minWorkoutList = response.data.slice(0)
      } else if (response.status == 404) {
          // not found
          this.errorMessage = "Workouts not found"
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