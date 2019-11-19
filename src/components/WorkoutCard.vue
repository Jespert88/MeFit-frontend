<<<<<<< HEAD
<template>
<div id="workoutCardContainer">

    <Loading v-if="!loading" />

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

            <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
            <b-collapse id="collapse-1" class="mt-2" v-for="exercise in exerciseArray" :key="exercise.exerciseID">
                
                    <p class="card-text">Collapse contents Here</p>
                    <!-- This button needs to have a v-for from each exercisecard later.. -->
                    <b-button v-b-toggle.collapse-1-inner size="sm" >Toggle Inner Collapse</b-button>
                    <b-collapse id="collapse-1-inner" class="mt-2" >
                        
                            <Exercisecard :exercise="exercise" />
                       
                    </b-collapse>
                
            </b-collapse>

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
            errors: "",
            loading: false,
            admin: false,
            user: false,
            name: "No name",
            type: "no type",
            exerciseArray: [],
            collapseBtnsArray: []
        }
    },

    created() {
        this.user = true
        this.admin = true
        this.loading = true

        axios.get('https://me-fit.herokuapp.com/exercises')
            .then(response => {
                /* this.loading = false */
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

title {
    text-align: center !important;
}

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
=======
<template>
        <b-card
        title="Workout"
        style="max-width: 20rem;"
        class="text-center"
        >
            <b-card-text>
                {{workout.name}}
            </b-card-text>
            <b-card-text>
                {{workout.type}}
            </b-card-text>

            <div role="tablist">
                <div v-for="set in workout.set" v-bind:key="set.setId">
                    <b-button block v-b-toggle="'set-' + set.setId" variant="info">{{set.exerciseFk.name}}</b-button>

                    <b-collapse :id="'set-' + set.setId" accordion="workout-accordion" role="tab">
                        <ExerciseCard :exercise="set.exerciseFk" :toSelect="false" :setData="set"/>
                    </b-collapse>
                    <br>
                </div>
            </div>
            
            <b-button v-if="toSelect" variant="danger" @click="addWorkoutObj(workout)">Select Workout</b-button>

        </b-card>
</template>

<script>
import ExerciseCard from '../components/ExerciseCard.vue'

export default {
    name: "WorkoutCard",
    components: {
        ExerciseCard
    },
    props: {
        workout: Object,
        toSelect: Boolean
    },
    methods: {
        addWorkoutObj: function(workout) {
            this.$emit("clicked-workoutCard", workout)    
        },
    }
}
</script>

<style scoped>

</style>
>>>>>>> 49e9fde3fa5858da57ccebc94ec965d5cbc05e60
