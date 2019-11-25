<template>
    <div class="content">
        <Loading v-if="loading"/>

        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

        <div v-if="!loading">
            
            <b-container style="paddin : 10px; margin-bottom:10px">
                <b-form v-if="!loading" @submit="updateProgram">    
                    <h1 id="bodyTitle">Update your Program</h1>

                    <b-form-group label="Program name">
                        <b-form-input type="text" v-model="form.name" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Program category">
                        <b-form-input type="text" v-model="form.category" required></b-form-input>
                    </b-form-group>
                  <b-jumbotron v-if="workoutListToSend.length > 0" id="selectedContainer" style="border: 1px solid; margin-bottom:10px" required>
                        <b-row align-h="start">
                            <b-col v-for="workout in workoutListToSend" :key="workout.id" cols="4" style="padding:10px;" >
                                <WorkoutCard :workout="workout" :toRemove="true" @clicked-workoutCard="addToWorkoutListToSend" @clicked-RemoveWorkoutCard="removeFromChosed" :toUpdate="true"/>
                            </b-col>
                        </b-row>
                        <b-row >
                            <b-button class="mx-auto bg-info" type="submit" variant="secondary">Update Workout</b-button>
                        </b-row>
                    </b-jumbotron>
                </b-form>
            </b-container>
           
            
            <b-container>
                <b-row>
                    <b-col v-for="workout in workoutList" :key="workout.id" class="col-lg-4" >
                        <WorkoutCard :workout="workout" :toSelect="true" :toUpdate="true" @clicked-workoutCard="addToWorkoutListToSend"/>

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
    props: {
        sentId:Number
    },
    data() {
        return {
            form: {
                name: "",
                category: ""
            },
            programId : '',
            loading: false,
            workoutList: [],
            workoutListToSend: [],
            errorMessage: "",
            successMessage: "",
            profileId: this.$auth.profileId
        }
    },
    created() {
        if(!this.$auth.isContributor){
             this.$router.push('/unauthorized')
        }
        this.getWorkoutList()
    },
    methods: {
        getWorkoutList: function() {
            if(this.sentId == undefined){
            this.$router.push('/viewprograms')
            } else {
                this.loading= true
                Promise.all([axios.get('https://me-fit.herokuapp.com/program/'+this.sentId), 
                    axios.get('https://me-fit.herokuapp.com/workout')]).then( response => {
                    this.loading= false
                    this.workoutList = response[1].data.slice(0)

                    this.programId = response[0].data.programId
                    this.form.name = response[0].data.name
                    this.form.category=response[0].data.category
                    response[0].data.programWorkoutFk.forEach(Element =>{
                        this.workoutListToSend.push(Element.workoutFk)
                        let pos = this.workoutList.indexOf(Element.workoutFk)
                        this.workoutList.splice(pos-1,1)
                    })

                    }).catch()
                }
              

        },
        removeFromChosed: function(workout){
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
        updateProgram: function(){
            event.preventDefault()
            this.loading = true
           
            axios
                .patch('https://me-fit.herokuapp.com/program/'+this.programId,{
                    name: this.form.name,
                    category: this.form.category,
                    profileId: this.profileId,
                    workoutList: this.workoutListToSend
                })
                .then((results) => {
                    this.loading = false;
                    if (results.status == 204) {
                        // success
                        this.successMessage = "Program has been succesfully updated"
                    } else if (results.status == 400) {
                        // bad request
                        this.errorMessage = "Bad request, try again"
                    } else {
                        // something went wrong
                        this.errorMessage = "Something went wrong, try again."
                    }
                })
                .catch((e) => {
                    this.loading = false;
                     if(e.response.status== 409){
                        this.errorMessage = 'This workout is used. You cannot edit it'
                        }else{    
                        this.errorMessage = "Something went wroing: "+ e
                    }                
                })
        }
    }
}
</script>

