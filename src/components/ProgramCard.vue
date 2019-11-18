<template>
        <b-card
        title="Program"
        style="max-width: 20rem;"
        class="text-center content"
        >
            <b-card-text>
                {{program.name}}
            </b-card-text>
            <b-card-text>
                {{program.category}}
            </b-card-text>

            <div role="tablist">
                <div v-for="programWorkoutFk in program.programWorkoutFk" v-bind:key="programWorkoutFk.programWorkoutId">
                    <b-button block v-b-toggle="'workout-' + programWorkoutFk.programWorkoutId" variant="info" aria-label="Left Align">
                        {{programWorkoutFk.workoutFk.name}}
                    </b-button>

                    <b-collapse :id="'workout-' + programWorkoutFk.programWorkoutId" accordion="workout-accordion" role="tab">
                        <WorkoutCard :workout="programWorkoutFk.workoutFk" :toSelect="false"/>
                    </b-collapse>
                    <br>
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
        program: Object,
        toSelect: Boolean
    }
}
</script>

<style scoped>

</style>
