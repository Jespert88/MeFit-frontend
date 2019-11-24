<template>
    <div>
        <b-card v-if="goal"
        title= "Program"
        style="min-width: 23rem;"
        class="text-center content"
        >
          <!--   <b-card-text>
                {{programGoal.programFk.name}}
            </b-card-text>
            <b-card-text>
                {{programGoal.programFk.category}}
            </b-card-text> -->

            <div role="tablist" v-if="toRemove">
                <div v-for="workout in programGoal.goalWorkoutFk" :key="workout.workoutFk.workoutId">
                    <br>
                    <b-button v-if="workout.complete" block v-b-toggle="'workout-' + workout.workoutFk.workoutId + '-' + GUID" variant="success">
                        {{workout.workoutFk.name}}
                    </b-button>
                    <b-button v-else block v-b-toggle="'workout-' + workout.workoutFk.workoutId + '-' + GUID" variant="dark">
                        {{workout.workoutFk.name}}
                    </b-button>

                    <b-collapse :id="'workout-' + workout.workoutFk.workoutId + '-' + GUID" role="tab">
                        <WorkoutCard :workout="workout.workoutFk" :toSelect="false" :toUpdate="workout.complete" :goalWorkout="workout" :reload="reloadKey"/>
                    </b-collapse>
                </div>
            </div>
        </b-card>

        <b-card v-if="!goal"
        :title= this.program.name
        style="min-width: 23rem;"
        class="text-center content"
        >
           <b-card-text>
                {{this.program.category}}
            </b-card-text> 
        <div role="tablist" v-if="!toRemove">
                <div v-for="programWorkout in program.programWorkoutFk" :key="programWorkout.workoutFk.workoutId">
                     <b-button  block v-b-toggle="'workout-' + programWorkout.workoutFk.workoutId + '-' + GUID" variant="success">
                        {{programWorkout.workoutFk.name}}
                    </b-button>
                 
                    <b-collapse :id="'workout-' + programWorkout.workoutFk.workoutId + '-' + GUID" role="tab">
                        <WorkoutCard :workout="programWorkout.workoutFk" :toSelect="false" :toUpdate="true"  />
                    </b-collapse>
                    <br>
                </div>
            </div>
            <b-button v-if="toViewAndUpdate" variant="danger" @click="goToUpdatePage(program)" >Update</b-button>
            <b-row v-if="toSelectProgram"  style="justify-content : center ; padding-top:10%">
                <div >
                 <b-button type="submit" variant="danger" @click="addExerciseObj(program)">Select Program</b-button>
                </div>
            </b-row>
             <b-row v-if="toRemove"  style="justify-content : center ; padding-top:10%">
                 <b-button type="submit" variant="danger" @click="removeFromPrograms(program)">X</b-button>  
            </b-row>
        </b-card>
    </div>
</template>

<script>
import WorkoutCard from '../components/WorkoutCard.vue'
export default {
    name: "ProgramCard",
    components: {
        WorkoutCard
    },
    props: {
        programGoal: Object,
        toSelect: Boolean,
        reloadKey: Function,
        program : Object,
        goal : Boolean,
        toViewAndUpdate :Boolean,
        toSelectProgram: Boolean,
        toRemove: Boolean
    },
    data() {
        return {
            GUID: this.generateUUID()
        }
    },
    methods: {
          goToUpdatePage: function(program){
          this.$emit("clickedToUpdate", program) 
        },
        removeFromPrograms :function(program){
            this.$emit("clickedToRemove", program)    
        },
         addExerciseObj: function(program) {
            this.$emit("clicked-exerciseCard", program)    
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
