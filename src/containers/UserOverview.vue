<template>
<div class="content">

    <div v-if="!hasGoal" class="mainContainer">
        <b-row no-gutters>
            <b-col cols="1" md="2" xl="4"></b-col>
            <b-col cols="10" md="8" xl="4">
                <b-alert show align="center">No goal is set</b-alert>
            </b-col>
            <b-col cols="1" md="2" xl="4"></b-col>
        </b-row>
    </div>

    <div v-if="hasGoal" class="mainContainer">
        <b-row no-gutters>
            <!-- Full gridsystem overview in dashboard -->
            <b-col cols="12" md="12" xl="12">

                <!-- Showing progress and calender -->
                <b-row no-gutters>
                    <b-col cols="12" md="6" xl="6">
                        <Loading v-if="loading" />
                        <div style="text-align:center; padding:5px;" v-if="!loading">
                            <h3 id="daysTitle">Days remaning: 3</h3>
                            <b-progress class="mt-2" height="30px">
                                <b-progress-bar :value="goalProgress" :label="`${goalProgress.toFixed(0)}%`" variant="success"></b-progress-bar>
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
                                <b-collapse id="collapse-1" v-for="goalWorkout in userGoal.goalWorkoutFk" :key="goalWorkout.workoutId">

                                    <!-- Grid system for getting the workoutcard in center -->
                                    <b-row no-gutters>
                                        <b-col cols="1" md="0" xl="4"></b-col>
                                        <b-col cols="10" md="12" xl="4">
                                             <WorkoutCard :workout="goalWorkout.workoutFk" :toUpdate="goalWorkout.complete" :goalWorkout="goalWorkout" :reload="retrieveGoal"/>
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
                                        <b-col cols="10" md="12" xl="4" v-for="programGoal in userGoal.programGoalFk" :key="programGoal.programGoalId">
                                            <ProgramCard :programGoal="programGoal" :toSelect="false" :reloadKey="retrieveGoal"/>
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
import ProgramCard from '../components/ProgramCard'
import axios from 'axios'

export default {
    name: "UserOverview",
    components: {
        Calender,
        WorkoutCard,
        Loading,
        ProgramCard 
    },
    data() {
        return {
            userGoal: {},
            loading: false,
            hasGoal: false,
            max: 100,
            completedWorkouts: 0,
            totalWorkouts: 0,
            goalProgress: 0
        }
    },
    created: function () {
        this.retrieveGoal()
    },
    methods: {
        retrieveGoal: function() {
            axios
                .get('http://localhost:8080/goal/status/user/1')
                .then((response) => {
                    if (response.status == 202) {
                        this.hasGoal = true
                        this.userGoal = response.data
                        this.counterComplete()
                    } else if (response.status == 404) {
                        // not found
                        this.hasGoal = false
                        console.log("status: " + 404)
                    } else if (response.status == 400) {
                        // bad request
                        this.hasGoal = false
                        console.log("status: " + 400)
                    } else {
                        // something went wrong
                    }
                })
                .catch(() => {
                    this.hasGoal = false
                })
        },
        // calculate the progress 
        counterComplete: function() {
            this.totalWorkouts = 0
            this.completedWorkouts = 0
            this.userGoal.programGoalFk.forEach((programGoal) => {
                programGoal.goalWorkoutFk.forEach((workout) => {
                    this.totalWorkouts += 1
                    if(workout.complete) {
                        this.completedWorkouts += 1
                    }
                })
            })
            this.userGoal.goalWorkoutFk.forEach((goalWorkout) => {
                this.totalWorkouts += 1
                if(goalWorkout.complete) {
                    this.completedWorkouts++
                }
            })
            this.goalProgress = this.completedWorkouts * 100 / this.totalWorkouts
        }
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
