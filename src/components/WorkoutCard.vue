<template>
<div id="workoutCardContainer">

    <Loading v-if="!loading"/>

    <div v-if="errors">
        <b-alert v-for="error in errors" :key="error" show variant="danger">{{error}}</b-alert>
    </div>


    <!-- Workout card for the regular user. -->
    <div v-if="user">
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


    <!-- Workout card for admin and a contributor. -->
    <div v-if="admin">
            <!-- Admin Workout Card -->
        <b-card v-if="loading">
             <h1 style="text-align: center;">{{name}}</h1>
            <h5 style="text-align: center;">{{type}}</h5>

            <input type="text" placeholder="Enter name of workout" v-model="name" required>
            <input type="text" placeholder="Enter type" v-model="type" required>
            
            <!-- Div with all exercisecards -->
            <div role="tablist">
                <b-card no-body class="mb-1">

                    <!-- Exercise card 1 -->
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block href="#" v-b-toggle.accordion-1> Exercise 1 </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                        <Exercisecard />
                    </b-collapse>

                    <!-- Exercise card 2 -->
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block href="#" v-b-toggle.accordion-2> Exercise 2 </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                        <Exercisecard />
                    </b-collapse>
                </b-card>
            </div>

             <b-button to="/updateworkout" variant="warning"> Update workout </b-button>
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
            exerciseArray: [],
            testArray: [],
        }
    },

    created() {
    this.loading = true
    this.user = true
    this.admin = true

    this.exerciseArray.push(1,2)
    this.testArray.push(1,2)

    axios.get('http://localhost:8080/exercises')
    .then(response => {
        this.loading= false
      // JSON responses are automatically parsed.
      this.exerciseArray = response.data
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
