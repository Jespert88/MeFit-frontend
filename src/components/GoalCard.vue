<template>
    <div>
        <b-card v-if="goal" :title="goal.name" style="background-color:#fff !important; width: 100%;" align="center">
            <b-card-text>Start Date: {{startDate}}</b-card-text>
            <b-card-text>End Date: {{endDate}}</b-card-text>
            <b-card-text>Achieved: {{goal.achieved}}</b-card-text>

            <b-card no-body class="full-width" style="background : #fff">
                <b-tabs pills card fill>  
                    <b-tab title="Programs">
                        <b-row no-gutters>
                            <b-col xl="10" class="d-flex justify-content-center" v-for="programGoal in goal.programGoalFk" :key="programGoal.programGoalId">
                                <ProgramCard :programGoal="programGoal" :toSelect="false" :goal="true" :toRemove="true" :toUpdate="true"/>
                            </b-col>
                            <!-- Goal does not have programs -->
                            <div v-if="goal.programGoalFk.length == 0">
                                <h2>There is no programs for this goal</h2>
                            </div>
                        </b-row>
                    </b-tab>
                    <b-tab title="Workouts">
                        <b-row no-gutters>
                            <b-col xl="6" class="d-flex justify-content-center" v-for="goalWorkout in goal.goalWorkoutFk" :key="goalWorkout.workoutId">
                                <WorkoutCard :workout="goalWorkout.workoutFk" :toUpdate="true"/>
                            </b-col>
                            <!-- Goal does not have workouts -->
                            <div v-if="goal.goalWorkoutFk.length == 0">
                                <h2>There is no workouts for this goal</h2>
                            </div>
                        </b-row>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-card>
    </div>
</template>

<script>
import ProgramCard from '../components/ProgramCard'
import WorkoutCard from '../components/WorkoutCard'

export default {
    name: "GoalCard",
    props: {
        goal: Object
    },
    components: {
        ProgramCard,
        WorkoutCard
    },
    data() {
        return {
            startDate: new Date(this.goal.startDate).toLocaleDateString(),
            endDate: new Date(this.goal.endDate).toLocaleDateString()
        }
    }
}
</script>

<style scoped>
.full-width {
    width: inherit;
}
</style>