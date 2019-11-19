<template>
<div class="content">

    <b-row no-gutters>
        <!-- Full gridsystem overview in dashboard -->
        <b-col cols="12" md="12" xl="12">

            <!-- Showing progress and calender -->
            <b-row no-gutters>
                <b-col cols="12" md="6" xl="6">

                    <Loading v-if="loading"/>

                    <div style="text-align:center; padding:5px;" v-if="!loading">
                        <b-progress class="mt-2" :max="max" show-value>
                            <b-progress-bar :value="value" :label="`${(value)}%`" variant="success"></b-progress-bar>
                        </b-progress>
                        <p>Days remaning on goal: ...</p>
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
                            <!-- Workouts -->
                            <b-collapse id="collapse-1" v-for="workout in workoutArray" :key="workout.workoutId">
                                <Loading v-if="loading" />
                                <WorkoutCard :workout="workout" v-if="!loading"/>
                            </b-collapse>
                        </b-col>

                        <b-col cols="12" md="6" xl="6">
                            <div style="text-align:center;">
                                <b-button v-b-toggle="'collapse-2'" class="m-1" variant="success">Show programs</b-button>
                            </div>
                            <!-- Programs -->
                            <b-collapse id="collapse-2">
                                <Loading v-if="loading" />
                                <!-- <ProgramCard  v-if="!loading" /> -->
                                <h1>Showing the current program for the user.</h1>
                            </b-collapse>
                        </b-col>

                    </b-row>
                </b-col>
            </b-row>
        </b-col>
    </b-row>

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
            loading : false,
            programArray: [],
            workoutArray: [],
            value: 40,
            max: 100
        }
    },

    created: function () {
        axios.get('https://me-fit.herokuapp.com/workout').then(response => {
            if (response.status == 202) {
                console.log("Status 202. Created!");
                this.loading = false;
                this.workoutArray = response.data
            } else if (response.status == 400) {
                console.log("Status 400. Bad Request..");
            } else if (response.status == 404) {
                console.log("Status 404. Not Found..");
            }
        })
    },

    methods: {

    }
}
</script>

<style>

</style>
