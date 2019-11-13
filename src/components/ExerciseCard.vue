<template>
<div>

  <div id="CardBody">
    <img src="https://source.unsplash.com/random/400x200" class="img-fluid">
     <!-- <img :src="getImgUrl(pic)" v-bind:alt="pic"> -->
    <h1 class="cardTitle">{{ exercise.name }}</h1>
    <hr class="hrStyle">

    <div class="descDiv">
        <div id="repContainer">
            <p>Total repetitions: {{ exercise.description }}</p>
            <p>Total repetitions: {{ exercise.imageLink }}</p>
            <!-- <p>Total repetitions: {{ exercise.targetMuscle }}</p>
            <p>Total repetitions: {{ exercise.videoLink }}</p> -->
            <b-input-group v-if="!exercise.toSelectReps">
                Reps : 
              <b-input  id="input-1"  type="number" required v-model="reps"  placeholder="">Repetions</b-input>
              </b-input-group>   
               <b-input-group v-if="!exercise.toSelectSets">
                Sets : 
            <b-input  id="input-1"  type="number" required v-model="sets"  placeholder="">Sets</b-input>
              </b-input-group>
            <!-- <b-input v-if="!exercise.toSelectReps" id="input-1"  type="number" required v-model="reps"  placeholder="">Repetions</b-input> -->
            <!-- <b-input v-if="!exercise.toSelectSets" id="input-1"  type="number" required v-model="sets"  placeholder="">Sets</b-input> -->


        </div>
    </div>
    <button  v-if ="!exercise.toBeSelected"  type="submit" class="submitBtn" @click="addExerciseObj(exercise)">Select Exercise</button>
    <!-- <button class="subminBtn" @click="addExerciseObj(exercise)">Select Exercise</button> -->
  </div>

</div>
</template>

<script>

export default {
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

        removeExerciseObj: function() {
        }
    }
}
</script>

<style scoped>

#CardBody {
    margin: 10px;
    height: auto;
    width: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: rgba(20,69,79,1);
}
.cardTitle {
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    padding: 5px;
}
.descDiv {
    height: auto;
    width: auto;
    padding: 5px;
    /* background-color: green; */
}
#repContainer {
    text-align: center;
    color: #fff;
    /* background-color: blue; */
}
.repBtns {
    border: 0;
    margin: 5px;
    width: 50px;
    background-color: green;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {

} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {

} 
</style>