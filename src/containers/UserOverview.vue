<template>
<div class="content">

    <!-- not implemented right now  -->
    <Loading v-if="loading"/>

    <div v-if="!loading">
        <div v-if="!hasGoal" class="mainContainer" align="center">
            <b-alert show variant="danger" dismissible>
                <h2>{{errorMessage}}</h2>
                <div>
                    <b-button variant="primary" to="/setgoal">Set Goal</b-button>
                </div>
            </b-alert>
        </div>

        <b-container v-else fluid class="mainContainer">
            <b-row no-gutters>
                <!-- Left Top Corner -->
                <b-col cols="5">
                    <div class="text-center">
                        <b-progress class="mb-3" height="30px">
                            <b-progress-bar :value="goalProgress" :label="`${goalProgress.toFixed(0)}%`" variant="success"></b-progress-bar>
                        </b-progress>
                        <h3 id="daysTitle">Days remaning: 3</h3>
                    </div>
                </b-col>

                <b-col cols="1"></b-col>

                <!-- Right Top Corner -->
                <b-col cols="5">
                    <div class="d-flex justify-content-center">
                        <Calender/>
                    </div>
                </b-col>
            </b-row>

            <b-row no-gutters>
                <!-- Left Bottom Corner -->
                <b-col cols="5">
                    <div class="d-flex justify-content-center">
                        <b-button v-b-toggle="'collapse-1'" class="m-1" variant="success">Show workouts</b-button>
                    </div>
                    <b-collapse id="collapse-1">
                        <div class="d-flex justify-content-center" v-for="goalWorkout in userGoal.goalWorkoutFk" :key="goalWorkout.workoutId">
                            <WorkoutCard :workout="goalWorkout.workoutFk" :toUpdate="goalWorkout.complete" :goalWorkout="goalWorkout" :reload="retrieveGoal"/>
                        </div>
                    </b-collapse>
                </b-col>

                <b-col cols="1"></b-col>

                <!-- Right Bottom Corner -->
                <b-col cols="5">
                    <div class="d-flex justify-content-center">
                        <b-button v-b-toggle="'collapse-2'" class="m-1" variant="success">Show programs</b-button>
                    </div>
                    <b-collapse id="collapse-2">
                        <div class="d-flex justify-content-center" v-for="programGoal in userGoal.programGoalFk" :key="programGoal.programGoalId">
                            <ProgramCard :programGoal="programGoal" :toSelect="false" :reloadKey="retrieveGoal"/>
                        </div>
                    </b-collapse>
                </b-col>
            </b-row>
        </b-container>
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
            goalProgress: 0,
            profileId: this.$auth.profileId,
            errorMessage: "There is no goal set. Set the goal first."
        }
    },
    created: function () {
        this.retrieveGoal()
    },
    methods: {
        retrieveGoal: function() {
            this.loading = true
            axios
                .get('http://localhost:8080/goal/status/user/1')
                .then((response) => {
                    if (response.status == 202) {
                        this.hasGoal = true
                        this.userGoal = response.data
                        this.counterComplete()
                        this.loading = false
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
            this.userGoal.goalWorkoutFk.forEach((goalWorkout) => {
                this.totalWorkouts += 1
                if(goalWorkout.complete) {
                    this.completedWorkouts++
                }
            })
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
                .patch('http://localhost:8080/goal/' + this.userGoal.goalId, {
                    achieved: isAchieved,
                    profileId: 1
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
                .patch('http://localhost:8080/goal/program/' + programId)
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

#daysTitle {
    font-size: 30px;
}
</style>
