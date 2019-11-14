


 <template>

  <b-card  
    bg-variant="dark"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
 >
    <b-card-text> {{ exercise.name }}</b-card-text>
    <b-card-text> {{ exercise.description }}</b-card-text>

    <b-card-text></b-card-text>
               <b-input-group v-if="!exercise.toSelectReps">
                 Reps : 
               <b-input  id="input-1"  type="number" required v-model="reps"  placeholder="">Repetions</b-input>
               </b-input-group>   
                <b-input-group v-if="!exercise.toSelectSets">
                 Sets : 
             <b-input  id="input-1"  type="number" required v-model="sets"  placeholder="">Sets</b-input>
               </b-input-group>
     <button  v-if ="!exercise.toBeSelected"  type="submit" class="submitBtn" @click="addExerciseObj(exercise)">Select Exercise</button>
     
   </b-card>


 
 </template> 


<script>
export default {
    name: "ExerciseCard",
    data() {

        return{
            reps: 0,
            sets:0,
        }
    },

    props: {
        exercise: {}
     
    },

    methods: {

        // /* For repetitions */
        // add: function() {
        //     this.repetitions += 1;
        // },
        // minus: function() {
        //     if(this.repetitions <= 0) {
        //         this.repetitions = 0;
        //         console.log(this.repetitions);
        //     }
        //     else {
        //         this.repetitions -= 1;
        //     }
        // },

         /* Add exercise to exerciseArray */
        addExerciseObj: function(exercise) {
            exercise.sets =this.sets
            exercise.reps= this.reps
            /* let result = this.exerciseArray.map(({ id }) => id) */
            this.$emit("clicked-exerciseCard", exercise)
            // pass a function to map
            /* const map1 = this.exerciseArray.map(x => x * 2);

            console.log(map1); */
        },
    }
}
</script>

