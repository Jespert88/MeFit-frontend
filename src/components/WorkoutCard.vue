<template>
<div id="workoutCardContainer">

    <!-- Workout Card -->
    <b-card>
        <h3 style="text-align: center;">Workout name here</h3>
        <h5 style="text-align: center;">Type here</h5><br>

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
    </b-card>

</div>
</template>

<script>
import Exercisecard from '../components/ExerciseCard'
export default {
    name: "WorkoutCard",
    components: {
        Exercisecard
    },
    data() {
        return {

        }
    },
    methods: {

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
