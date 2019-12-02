
<template>
        <b-card
        style="min-width: 19rem;  background-color:#fafbf2; box-shadow: 1px 1px 5px #000;"
        >

            <template v-slot:header>
                <b-card-text class="text-center" style="font-weight:bold" > {{ workout.name }}</b-card-text>
             </template>
            <b-card-text >
               Description: {{workout.type}}
            </b-card-text>

            <div role="tablist" v-if="!toRemove" >
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
            <b-button v-if="toViewAndUpdate" variant="danger" @click="goToUpdatePage(workout)" >Update</b-button>
             <b-row v-if="toRemove"  style="justify-content : center ; padding-top:10%">
                 <b-button type="submit" variant="danger" @click="removeFromWorkouts(workout)">X</b-button>  
            </b-row>
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
        reload: Function,
        toViewAndUpdate :Boolean,
        toRemove :Boolean
    },
    data() {
        return {
            GUID: this.generateUUID()
        }
    },
    methods: {
        goToUpdatePage: function(workout){
          this.$emit("clickedToUpdate", workout) 
        },
        removeFromWorkouts :function(workout){
            this.$emit("clicked-RemoveWorkoutCard", workout)    
        },
        addWorkoutObj: function(workout) {
            this.$emit("clicked-workoutCard", workout)    
        },
        markWorkoutComplete: function(goalWorkout) {
            axios
                .patch('https://me-fit.herokuapp.com/goal/workout/' + goalWorkout.goalWorkoutId)
                .then((response) => {
                    if (response.status == 204) {
                        // success
                        this.reload()
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
 image  