<template>
<div id="workoutCardContainer">

    <Loading v-if="!loading"/>

    <div v-if="errors">
        <b-alert v-for="error in errors" :key="error" show variant="danger">{{error}}</b-alert>
    </div>


    <!-- Workout card for the regular user. -->
    <div v-if="user">
        <!-- Showing only for admin / contributors -->
         <b-button to="/updateworkout" variant="warning" v-if="admin"> Update workout </b-button>

            <!-- Workout Card -->
        <b-card v-if="loading">
            <h1 style="text-align: center;">{{name}}</h1>
            <h5 style="text-align: center;">{{type}}</h5><br>

            <!-- Div with all exercisecards -->
            <div role="tablist" v-for="exercise in exerciseArray" :key="exercise">

                 <b-card no-body class="mb-1" :exercise="exercise" v-for="id in testArray" :key="id">
   
                    <b-card-header header-tag="header" class="p-1" role="tab" :key="id">
                        <b-button block v-b-toggle="'accordion-' + id" variant="info">  Exercise {{ id }} </b-button>
                    </b-card-header>

                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                        <Exercisecard :exercise="exercise" />
                    </b-collapse>
              
                 </b-card>

            </div>
        </b-card>
    </div>

   
</div>
</template>

<script>
import axios from 'axios';
import Exercisecard from '../components/ExerciseCard'
import Loading from '../components/Loading.vue'
export default {
    name: "WorkoutCard",

    components: {
        Loading,
        Exercisecard
    },

    data() {
        return {
            loading : false,
            admin: false,
            user: false,
            name: "No name",
            type: "no type",
            exerciseArray: []
        }
    },

    created() {

        this.image = "url"

    this.loading = true
    this.user = true
    this.admin = true

    this.exerciseArray.push(1,2)
    this.testArray.push(1,2)

    axios.get('http://localhost:8080/exercises')
    .then(response => {
        this.loading= false
      // JSON responses are automatically parsed.
      this.exerciseArray.push(response.data)
      console.log(this.exerciseArray)
    })
    .catch(e => {
      this.errors.push(e)
    })
    },

    methods: {
        toggleTest() {
            this.test = !this.test
        }
    },
}
</script>

<style scoped>

/* Desktop CSS */
#workoutCardContainer {
    margin-top: 5%;
    margin-right: 40%;
    margin-left: 40%;
    margin-bottom: 5%;
}
title {text-align: center !important;}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
    #workoutCardContainer {
        margin-top: 20%;
        margin-right: 10%;
        margin-left: 10%;
        margin-bottom: 5%;
    }
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    #workoutCardContainer {
        margin-top: 20%;
        margin-right: 20%;
        margin-left: 20%;
        margin-bottom: 5%;
    }
} 
</style>
