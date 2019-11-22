<template>
  <div class="content">
    <Loading v-if="loading"/>
    <b-container>
      <b-row>
            <b-col v-for="exercise in exerciseArray" :key="exercise.id" class="col-lg-3" ><ExerciseCard :exercise="exercise" :toShow="true" /></b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import ExerciseCard from '../components/ExerciseCard.vue'
import Loading from '../components/Loading.vue'
import axios from 'axios';
export default {
 data() {
        return {
            exerciseArray: [],
            profileId: "",
            loading: false,
            errorMessage: "",
            successMessage: "",
            userId : this.$auth.userId,
        }
    },
    components :{
      Loading , 
      ExerciseCard
    },
    created(){
         this.loading = true
        axios
            .get('https://me-fit.herokuapp.com/exercises')
            .then((response) => {
                this.loading = false
                this.errorMessage=""
                 if(response.status == 202) {
                        // success
                   this.exerciseArray = response.data.slice(0)
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
            })
            .catch(e => {
            this.errorMessage = e
            })

    }

}
</script>

<style>

</style>