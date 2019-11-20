
<template>
        <b-card
        :title= this.workout.name
        style="max-width: 20rem;"
        class="text-center"
        >
         
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
