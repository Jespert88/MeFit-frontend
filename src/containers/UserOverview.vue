<template>
<div class="content">

    <div v-if="!goal" class="mainContainer">
        <b-row no-gutters>
            <b-col cols="1" md="2" xl="4"></b-col>
            <b-col cols="10" md="8" xl="4">
                <b-alert show align="center">No goal is set</b-alert>
            </b-col>
            <b-col cols="1" md="2" xl="4"></b-col>
        </b-row>
    </div>

    <div v-if="goal" class="mainContainer">
        <b-row no-gutters>
            <!-- Full gridsystem overview in dashboard -->
            <b-col cols="12" md="12" xl="12">

                <!-- Showing progress and calender -->
                <b-row no-gutters>
                    <b-col cols="12" md="6" xl="6">
                        <Loading v-if="loading" />
                        <div style="text-align:center; padding:5px;" v-if="!loading">
                            <h3 id="daysTitle">Days remaning: 3</h3>
                            <b-progress class="mt-2" :max="max" show-value>
                                <b-progress-bar :value="value" :label="`${(value)}%`" variant="success"></b-progress-bar>
                            </b-progress>
                        </div>
                    </b-col>
                    <b-col cols="12" md="6" xl="6">
                        <Loading v-if="loading" />
                        <Calender v-if="!loading" />
                    </b-col>
                </b-row>

                <!-- Programs and Workouts will show here -->
                <b-row no-gutters>
                    <b-col cols="12" md="12" xl="12">
                        <b-row no-gutters>

                            <b-col cols="12" md="6" xl="6">
                                <div style="text-align:center;">
                                    <b-button v-b-toggle="'collapse-1'" class="m-1" variant="success">Show workouts</b-button>
                                </div>
                                <Loading v-if="loading" />
                                <b-collapse id="collapse-1" v-for="workout in workoutArray" :key="workout.workoutId">

                                    <!-- Grid system for getting the workoutcard in center -->
                                    <b-row no-gutters>
                                        <b-col cols="1" md="0" xl="4"></b-col>
                                        <b-col cols="10" md="12" xl="4">
                                             <WorkoutCard :workout="workout" v-if="!loading" />
                                        </b-col>
                                        <b-col cols="1" md="0" xl="4"></b-col>
                                    </b-row>
                                    
                                </b-collapse>
                            </b-col>

                            <b-col cols="12" md="6" xl="6">
                                <div style="text-align:center;">
                                    <b-button v-b-toggle="'collapse-2'" class="m-1" variant="success">Show programs</b-button>
                                </div>
                                <Loading v-if="loading" />
                                <b-collapse id="collapse-2">

                                     <!-- Grid system for getting the program in center -->
                                    <b-row no-gutters>
                                        <b-col cols="1" md="0" xl="4"></b-col>
                                        <b-col cols="10" md="12" xl="4">

                                            <!-- DELETE THIS LATER!! -->
                                            <div style="background-color:#fff; height: 100vh; width: 100%">
                                             <h5>Program component here</h5>
                                            </div>

                                        </b-col>
                                        <b-col cols="1" md="0" xl="4"></b-col>
                                    </b-row>
                                </b-collapse>
                            </b-col>

                        </b-row>
                    </b-col>
                </b-row>

               
            </b-col>
        </b-row>
    </div>

</div>
</template>

<script>
import Calender from '../components/Calender'
import WorkoutCard from '../components/WorkoutCard'
import Loading from '../components/Loading'
/* import ProgramCard from '../components/ProgramCard' */
import axios from 'axios'
export default {
    name: "UserOverview",
    components: {
        Calender,
        WorkoutCard,
        Loading,
        /* ProgramCard */
    },

    data() {
        return {
            loading: false,
            goal: false,
            programArray: [],
            workoutArray: [],
            value: 40,
            max: 100
        }
    },

    created: function () {
        /* Get workout list */
        axios.get('https://me-fit.herokuapp.com/workout').then(response => {
            if (response.status == 202) {
                console.log("Status 202. Created!");
                this.loading = false;
                this.goal = true;
                this.workoutArray = response.data
            } else if (response.status == 400) {
                console.log("Status 400. Bad Request..");
            } else if (response.status == 404) {
                console.log("Status 404. Not Found..");
            }
        })

        /* Get program list */
        /* axios.get('https://me-fit.herokuapp.com/program').then(response => {
             if (response.status == 202) {
                 console.log("Status 202. Created!");
                 this.loading = false;
                 this.programArray = response.data
             } else if (response.status == 400) {
                 console.log("Status 400. Bad Request..");
             } else if (response.status == 404) {
                 console.log("Status 404. Not Found..");
             }
         }) */

    },

    methods: {

    }
}
</script>

<style scoped>
/* Desktop */
.mainContainer {
    margin-top: 5%;
}

#noGoalDiv {
    margin-top: 20%;
    padding: 30px;
    text-align: center !important;
    border-radius: 20px;
    background-color: #fff !important;
}

#daysTitle {
    color: #fff;
    font-size: 30px;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>
