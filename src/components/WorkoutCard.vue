
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
                    <b-button block v-b-toggle="'set-' + set.setId + '-' + GUID" variant="info">{{set.exerciseFk.name}}</b-button>

                    <b-collapse :id="'set-' + set.setId + '-' + GUID" accordion="workout-accordion" role="tab">
                        <ExerciseCard :exercise="set.exerciseFk" :toSelect="false" :setData="set"/>
                    </b-collapse>
                    <br>
                </div>
            </div>
            
            <b-button v-if="toSelect" variant="danger" @click="addWorkoutObj(workout)">Select Workout</b-button>
            <b-button v-if="!toUpdate" variant="danger" @click="markWorkoutComplete(goalWorkout)">Mark Complete</b-button>

        </b-card>
</template>

<script>
import ExerciseCard from '../components/ExerciseCard.vue'
import axios from 'axios'
export default {
    name: "WorkoutCard",
    components: {
        ExerciseCard
    },
    props: {
        workout: Object,
        toSelect: Boolean,
        toUpdate: Boolean,
        goalWorkout: Object,
        reload: Function
    },
    data() {
        return {
            GUID: this.generateUUID()
        }
    },
    methods: {
        addWorkoutObj: function(workout) {
            this.$emit("clicked-workoutCard", workout)    
        },
        markWorkoutComplete: function(goalWorkout) {
            axios
                .patch('http://localhost:8080/goal/workout/' + goalWorkout.goalWorkoutId)
                .then((response) => {
                    if (response.status == 202) {
                        // success
                        this.reload()
                    } else if (response.status == 404) {
                        // not found
                        console.log("status: " + 404)
                    } else if (response.status == 400) {
                        // bad request
                        console.log("status: " + 400)
                    } else {
                        // something went wrong
                    }
                })
                .catch(() => {
                })
        },
        // generate UUID
        generateUUID: function() {
            let d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now();
            }
            let newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            
            return newGuid;
        }
    }
}
</script>

<style scoped>

</style>
