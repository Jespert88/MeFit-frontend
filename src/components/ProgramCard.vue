<template>
        <b-card
        title="Program"
        style="max-width: 23rem;"
        class="text-center content"
        >
          <!--   <b-card-text>
                {{programGoal.programFk.name}}
            </b-card-text>
            <b-card-text>
                {{programGoal.programFk.category}}
            </b-card-text> -->

            <div role="tablist">
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
        reloadKey: Function
    },
    data() {
        return {
            GUID: this.generateUUID()
        }
    },
    methods: {
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
