<template>
    <b-card  
        bg-variant=""
        :img-src="exercise.imageLink"
        img-alt="Image"
        
        :header="exercise.name"
        style="text-align:center; max-width: 15rem ;" 
        class="mb-2"
    >
        <b-card-text v-if="!toRemove"> {{ exercise.description }}</b-card-text>

        <b-container>
            <b-row v-if="toSelect">
                <b-input-group>
                    <b-col>
                        <b-input  v-b-popover.hover="'Reps'" type="number" min="1" max="100" required v-model="reps" placeholder="Reps">Repetions</b-input>   
                    </b-col>
                    <b-col>
                        <b-input  v-b-popover.hover="'Sets'" type="number" min="1" max="100" required v-model="sets" placeholder="">Sets</b-input>
                    </b-col>
                </b-input-group> 
            </b-row>
            <!-- Show reps / sets for CreateProgram -->
            <b-row v-if="!toSelect && setData != null  &&!toShow " >
                <b-col>
                    <label>Sets: {{setData.setRepetitions}}</label>
                </b-col>
                <b-col>
                    <label>Reps: {{setData.repetitions}}</label>
                </b-col>
            </b-row>
            <!-- Show reps / sets for CreateWorkout -->
            <b-row v-if="!toSelect && setData == null &&!toShow">
                <b-col>
                    <label>Sets: {{this.exercise.sets}}</label>
                </b-col>
                <b-col>
                    <label>Reps: {{this.exercise.reps}}</label>
                </b-col>
            </b-row>

            <b-row v-if="toSelect"  style="justify-content : center ; padding-top:10%">
                <div>
                 <b-button type="submit" variant="danger" @click="addExerciseObj(exercise)">Select Exercise</b-button>
                </div>
            </b-row>
            
            <b-row v-if="toRemove"  style="justify-content : center ; padding-top:10%">
                 <b-button type="submit" variant="danger" @click="removeFromExercises(exercise)">X</b-button>  
            </b-row>
        </b-container>            
    </b-card>
</template> 

<script>
export default {
    name: "ExerciseCard",
    data() {
        return{
            reps: 1,
            sets:1
        }
    },
    props: {
        exercise: Object,
        toSelect: Boolean,
        setData: Object,
        toShow : Boolean,
        toRemove :Boolean

    },
    methods: {
        addExerciseObj: function(exercise) {
            exercise.sets = this.sets
            exercise.reps = this.reps
            this.$emit("clicked-exerciseCard", exercise)    
        },
        removeFromExercises: function(exercise){
            exercise.sets = 1
            exercise.reps = 1
            this.$emit("clicked-exerciseCardRemove", exercise)    
        }
    }
}
</script>
<style  scoped>
.card-img{
    height: 10rem
}
</style>

