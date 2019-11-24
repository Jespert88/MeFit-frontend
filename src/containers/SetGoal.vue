<template>
<div>
    <Loading v-if="loading"/>

    <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
    <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

    <div v-if="!loading">

        <h2 class="text-center">Set Goal</h2>
        <b-container class="d-flex justify-content-center">
            <b-form @submit="formSubmit">
                <b-form-group label="Goal name:">
                    <b-form-input v-model="form.name" required placeholder="Goal Name"></b-form-input>
                </b-form-group>
                <b-form-group label="Select Start Date:">
                    <Datepicker v-on:selected="highlightFrom" :disabled-dates="disabledDates"></Datepicker>
                </b-form-group>

                <Datepicker :inline="true" :highlighted="highlighted"></Datepicker>

                <b-button type="submit" variant="dark" style="margin: 3px;">Save</b-button>
            </b-form>
        </b-container>



        <b-card no-body class="full-width">
            <b-tabs pills card fill> 
                <b-tab title="Programs">
                    <b-form @submit="searchProgram">
                        <div class="d-flex justify-content-center">
                            <b-form-group label="Search for program">
                                <b-input v-model="search.program"></b-input>
                            </b-form-group>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b-button type="submit" variant="dark" style="margin: 3px;">Search</b-button>
                        </div>
                    </b-form>
                    <b-row no-gutters>
                        <b-col xl="6" class="d-flex justify-content-center" v-for="program in programList" :key="program.programId">
                            <ProgramCard :program="program" :toSelect="false" :goal="false"/>
                        </b-col>
                        <!-- Goal does not have programs -->
                        <div v-if="programList.length == 0">
                            <h2>There is no programs for this goal</h2>
                        </div>
                    </b-row>
                </b-tab>
                <b-tab title="Workouts">
                    <b-form @submit="searchWorkout">
                        <div class="d-flex justify-content-center">
                            <b-form-group label="Search for program">
                                <b-input v-model="search.workout"></b-input>
                            </b-form-group>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b-button type="submit" variant="dark" style="margin: 3px;">Search</b-button>
                        </div>
                    </b-form>
                    <b-row no-gutters>
                        <b-col xl="6" class="d-flex justify-content-center" v-for="workout in workoutList" :key="workout.workoutId">
                            <WorkoutCard :workout="workout" :toSelect="true" :toUpdate="true"/>
                        </b-col>
                        <!-- Goal does not have workouts -->
                        <div v-if="workoutList.length == 0">
                            <h2>There is no workouts for this goal</h2>
                        </div>
                    </b-row>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import WorkoutCard from '../components/WorkoutCard'
    import ProgramCard from '../components/ProgramCard'
    import Datepicker from 'vuejs-datepicker'

    export default {
        name: "SetGoal",
        components: {
            Datepicker,
            WorkoutCard,
            ProgramCard
        },
        data() {
            return {
                form: {
                    name: "",
                    startDate: "",
                    endDate: ""
                },
                search: {
                    program: "",
                    workout: ""
                },
                highlighted: {
                    from: "",
                    to: ""
                },
                disabledDates: {
                    to: new Date()
                },
                workoutList: [],
                originalWorkoutList: [],
                programList: [],
                originalProgramList: [],
                loading: "",
                errorMessage: "",
                successMessage: ""
            }
        },
        mounted() {
            this.retrieveWorkouts()
            this.retrievePrograms()
        },
        methods: {
            // submit form and send to api
            formSubmit: function(event) {
                event.preventDefault()
            },
            // highlight calendar dates
            highlightFrom: function(val) {
                this.highlighted.from = new Date(val);
                // automatically adds 6 days (7 in total)
                this.highlighted.to = new Date(new Date(val).getTime() + 8640*60000)

                this.form.startDate = this.highlighted.from
                this.form.endDate = this.highlighted.to
            },
            // retrieve initial workout list
            retrieveWorkouts: function() {
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
                        } 
                    })
                    .catch(e => {
                        this.loading = false
                        this.errorMessage = "Something went wrong, try again: " + e
                    })
            },
            // retrieve initial program list
            retrievePrograms: function() {
                this.loading = true
                axios
                    .get('https://me-fit.herokuapp.com/program')
                    .then(response => {
                        this.loading = false
                        this.errorMessage = ""
                        if(response.status == 202) {
                            // success
                            this.programList = response.data.slice(0)
                            this.originalProgramList = response.data.slice(0)
                        } 
                    })
                    .catch(e => {
                        this.loading = false
                        this.errorMessage = "Something went wrong, try again: " + e
                    })
            },
            // handle search workout
            searchWorkout: function() {

            },
            // handle search program
            searchProgram: function() {

            }
        }
    }
</script>

<style scoped>
.full-width {
    width: inherit;
}
</style>