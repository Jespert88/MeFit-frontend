


 <template>
     
  <b-card  
    bg-variant=""
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
 >
        <b-card-text> {{ exercise.name }}</b-card-text>
        <b-card-text> {{ exercise.description }}</b-card-text>

        <b-container>
            <b-row v-if="toSelect">
                <b-col>
                <b-input-group>
                  <b-input   v-b-popover.hover="'Reps'" type="number" min="1" max="100" required v-model="reps" placeholder="Reps">Repetions</b-input>
                </b-input-group>  
                </b-col>
                
                <b-col>
                <b-input-group>
                    <b-input  v-b-popover.hover="'Sets'" type="number" min="1" max="100" required v-model="sets" placeholder="">Sets</b-input>
                </b-input-group> 
                </b-col>
            </b-row>
            <!-- Show reps / sets for CreateProgram -->
            <div v-if="!toSelect && setData != null">
                <label>Sets: {{setData.setRepetitions}}</label>
                <label>Reps: {{setData.repetitions}}</label>
            </div>
            <!-- Show reps / sets for CreateWorkout -->
            <div v-if="!toSelect && setData == null">
                <label>Sets: {{this.exercise.sets}}</label>
                <label>Reps: {{this.exercise.reps}}</label>
            </div>
        </b-container>
            
        <div>
            <b-button v-if="toSelect" type="submit" variant="danger" @click="addExerciseObj(exercise)">Select Exercise</b-button>
        </div>
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
        setData: Object
    },
    methods: {
        addExerciseObj: function(exercise) {
            exercise.sets =this.sets
            exercise.reps= this.reps
            this.$emit("clicked-exerciseCard", exercise)    
        },
    }
}
</script>

