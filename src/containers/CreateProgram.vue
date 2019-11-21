<template>
    <div class="content">
        <Loading v-if="loading"/>

        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

        <div v-if="!loading">
            
            <b-container style="paddin : 10px; margin-bottom:10px">
                <b-form v-if="!loading" @submit="createProgram">    
                    <h1 id="bodyTitle">Create your Program</h1>

                    <b-form-group label="Program name">
                        <b-form-input type="text" v-model="form.name" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Program category">
                        <b-form-input type="text" v-model="form.category" required></b-form-input>
                    </b-form-group>
                  
        
                    <b-container v-if="workoutListToSend.length > 0" id="selectedContainer" style="border: 1px solid; margin-bottom:10px" required>
                        <b-row align-h="start">
                            <b-col v-for="workout in workoutListToSend" :key="workout.id" cols="3" style="padding:10px;" >
                                <WorkoutCard :workout="workout" @clicked-workoutCard="addToWorkoutListToSend"/>
                
                                <b-button type="submit" variant="secondary" @click="removeFromWorkoutList(workout)">Remove Workout</b-button>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-button type="submit" variant="secondary">Create Program</b-button>
                </b-form>
            </b-container>
           
            
            <b-container>
                <b-row>
                    <b-col v-for="workout in workoutList" :key="workout.id" class="col-lg-4" >
                        <WorkoutCard :workout="workout" :toSelect="true" @clicked-workoutCard="addToWorkoutListToSend"/>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import WorkoutCard from '../components/WorkoutCard.vue'
import Loading from '../components/Loading.vue'
import axios from 'axios'

export default {
    components: {
        WorkoutCard,
        Loading
    },
    data() {
        return {
            form: {
                name: "",
                category: ""
            },
            loading: false,
            workoutList: [],
            workoutListToSend: [],
            originalWorkoutList: [],
            errorMessage: "",
            successMessage: "",
            profileId: 1
        }
    },
    created() {
        this.getWorkoutList()
    },
    methods: {
        getWorkoutList: function() {
            this.loading = true
            axios
                .get('https://me-fit.herokuapp.com/workout')
                .then(response => {
                    this.loading = false
                    this.errorMessage = ""
                    if(response.status == 202) {
                        // success
                        this.workoutList = response.data.slice(0)
                        this.originalWorkoutList = response.data.slice(0)
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
                  this.errorMessage = "Something went wrong, try again: " + e
                })
        },
        removeFromWorkoutList: function(workout){
            // remove from workout list to send
            if (event) {
                event.preventDefault()
            }
            let pos = this.workoutListToSend.indexOf(workout)
            this.workoutListToSend.splice(pos , 1)

            this.workoutList.push(workout)
        },
        addToWorkoutListToSend: function(workout) {
            // add to workout list to send and remove it from available list
            if (event) {
                event.preventDefault()
            }
            this.workoutListToSend.push(workout)
            let pos = this.workoutList.indexOf(workout)
            this.workoutList.splice(pos , 1)
        },
        resetValues: function(){
            this.form = {}
            this.profileId = ""
            this.loading = false
            this.workoutListToSend.length = 0
            this.workoutList = this.originalWorkoutList.splice(0)
        },
        createProgram: function(){
            event.preventDefault()
            this.loading = true
            axios
                .post('http://localhost:8080/addProgram',{
                    name: this.form.name,
                    category: this.form.category,
                    profileId: this.profileId,
                    workoutList: this.workoutListToSend
                })
                .then((results) => {
                    this.loading = false;
                    if (results.status == 201) {
                        // success
                        this.successMessage = "Program has been succesfully created"
                    } else if (results.status == 400) {
                        // bad request
                        this.errorMessage = "Bad request, try again"
                    } else {
                        // something went wrong
                        this.errorMessage = "Something went wrong, try again."
                    }
                })
                .catch((e) => {
                    this.errorMessage = "Something went wrong, try again. " + e
                })
                .finally(() => { 
                    // set values to default
                    this.resetValues()
                })
        }
    }
}
</script>

