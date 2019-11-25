<template>
<div class="content">

    <!-- not implemented right now  -->
    <Loading v-if="loading"/>

    <div v-if="!loading" class="mainContainer">
        <div v-if="!hasGoal" align="center">
            <b-alert show variant="danger" dismissible>
                <h2>{{errorMessage}}</h2>
                <div>
                    <b-button variant="primary" to="/setgoal">Set Goal</b-button>
                </div>
            </b-alert>
        </div>

        <b-container v-if="hasGoal" fluid id="stuff">
            <div class="text-center" id="progressBar">
                <h1>Status</h1>
                <b-progress class="mb-3" height="30px">
                    <b-progress-bar :value="goalProgress" :label="`${goalProgress.toFixed(0)}%`" variant="success"></b-progress-bar>
                </b-progress>
            </div>
            <div class="d-flex justify-content-center">
                <Datepicker :inline="true" :highlighted="highlightedDates"></Datepicker>
            </div>
    
            <b-card no-body class="full-width">
                <b-tabs pills card fill> 
                    <b-tab title="Programs">
                        <b-row no-gutters>
                            <b-col xl="6" class="d-flex justify-content-center" v-for="programGoal in userGoal.programGoalFk" :key="programGoal.programGoalId">
                                <ProgramCard :programGoal="programGoal" :toSelect="false" :goal="true" :toRemove="true" :reloadKey="retrieveGoal"/>
                            </b-col>
                            <!-- Goal does not have programs -->
                            <div v-if="userGoal.programGoalFk.length == 0">
                                <h2>There is no programs for this goal</h2>
                            </div>
                        </b-row>
                    </b-tab>
                    <b-tab title="Workouts">
                        <b-row no-gutters>
                            <b-col xl="6" class="d-flex justify-content-center" v-for="goalWorkout in userGoal.goalWorkoutFk" :key="goalWorkout.workoutId">
                                <WorkoutCard :workout="goalWorkout.workoutFk" :toUpdate="goalWorkout.complete" :goalWorkout="goalWorkout" :reload="retrieveGoal"/>
                            </b-col>
                            <!-- Goal does not have workouts -->
                            <div v-if="userGoal.goalWorkoutFk.length == 0">
                                <h2>There is no workouts for this goal</h2>
                            </div>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>

        </b-container>
    </div>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import WorkoutCard from '../components/WorkoutCard'
import Loading from '../components/Loading'
import ProgramCard from '../components/ProgramCard'
import axios from 'axios'

export default {
    name: "UserOverview",
    components: {
        Datepicker,
        WorkoutCard,
        Loading,
        ProgramCard 
    },
    data() {
        return {
            highlightedDates: {
                from: "",
                to: ""
            },
            userGoal: {},
            loading: false,
            hasGoal: false,
            max: 100,
            completedWorkouts: 0,
            totalWorkouts: 0,
            goalProgress: 0,
            errorMessage: "There is no goal set. Set the goal first."
        }
    },
    mounted: function () {
        this.retrieveGoal()
    },
    methods: {
        retrieveGoal: function() {
            this.loading = true
            axios
                .get('https://me-fit.herokuapp.com/goal/status/user/' + this.$auth.profileId)
                .then((response) => {
                    if (response.status == '202') {
                        this.hasGoal = true
                        this.userGoal = response.data[0]
                        this.highlightedDates.from = new Date(response.data[0].startDate)
                        this.highlightedDates.to = new Date(response.data[0].endDate)
                        this.counterComplete()
                        this.loading = false

                        if(this.highlightedDates.to < new Date()) {
                            this.patchGoal(true)
                            this.hasGoal = false
                            this.errorMessage = "You have completed your Goal. Set a new Goal"                        
                        }
                    }
                })
                .catch(() => {
                    this.hasGoal = false
                    this.loading = false
                })
        },
        // calculate the progress 
        counterComplete: function() {      
            this.totalWorkouts = 0
            this.completedWorkouts = 0
            if(this.userGoal.programGoalFk != null) {
                this.userGoal.programGoalFk.forEach((programGoal) => {
                    let totalProgramWorkouts = 0

                    programGoal.goalWorkoutFk.forEach((workout) => {
                        totalProgramWorkouts += 1
                        this.totalWorkouts += 1
                        if(workout.complete) {
                            this.completedWorkouts += 1
                        }
                    })

                    if(totalProgramWorkouts == this.completedWorkouts && !programGoal.complete) {
                        // mark program complete
                        this.patchGoalProgram(programGoal.programGoalId)
                        totalProgramWorkouts = 0
                    }

                })
            }
            if(this.userGoal.goalWorkoutFk != null) {
                this.userGoal.goalWorkoutFk.forEach((goalWorkout) => {
                    this.totalWorkouts += 1
                    if(goalWorkout.complete) {
                        this.completedWorkouts++
                    }
                })
            }
            this.goalProgress = this.completedWorkouts * 100 / this.totalWorkouts

            if(this.goalProgress == 100) {
                // mark goal achieved
                this.patchGoal(true)
                this.hasGoal = false
                this.errorMessage = "You have completed your Goal. Set a new Goal"
            }
        },
        // mark goal achieved
        patchGoal: function(isAchieved) {
           axios
                .patch('https://me-fit.herokuapp.com/goal/' + this.userGoal.goalId, {
                    achieved: isAchieved,
                    profileId: this.$auth.profileId
                })
                .then((response) => {
                    if (response.status == 202) {
                        // success
                    } 
                })
                .catch(() => {
                    this.hasGoal = false
                })
        },
        // mark program achieved
        patchGoalProgram: function(programId) {
           axios
                .patch('https://me-fit.herokuapp.com/goal/program/' + programId)
                .then((response) => {
                    if (response.status == 202) {
                        // success
                    }
                })
                .catch(() => {
                })
        }
    }
}
</script>

<style scoped>
/* Desktop */
.mainContainer {
    margin-top: 5%;
}
#progressBar {
    padding-right: 100px;
    padding-left: 100px;
}
.full-width {
    width: inherit;
}
</style>
