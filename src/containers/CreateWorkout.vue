<template>
  <div>
    <form>
            <div id="workoutContainer">
                <h1 id="bodyTitle">Create your workout</h1>
                <h1 id="workoutTitle">{{name}}</h1>
                <h1 id="workoutType">{{type}}</h1>
                <div id="inputContainer">
                    <input type="text" class="inputStyle" placeholder="Enter name of workout"  
                        v-model="name"  
                        required  
                        onkeypress="return /[a-å,ä,ö]/i.test(event.key)"
                    >
                    <input type="text" class="inputStyle" placeholder="Enter type / muscelgroup"  
                        v-model="type"  
                        required  
                        onkeypress="return /[a-å,ä,ö]/i.test(event.key)"
                    >
                    <button @click="createWorkout">Create workout</button>
                </div>

                 <div id="cardGrid">
                <ExerciseCard v-for="exercise in chosedExerciseArray" :key="exercise.id" :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"/>

            </div>


                <div id="exerciseArrayDiv">
                    <div id="repBtnContainer" v-for="btns in setArray" :key="btns.id">
                        <!-- Subtraction button -->
                        <button class="setBtns" v-on:click-exerciseCard="minusRep">-</button>
                        <!-- Add button -->
                        <button class="setBtns" v-on:click-exerciseCard="addRep">+</button>
                    </div>
                    <!-- Display all of the selected object exercises with buttons for add how many sets -->
                </div>
            </div>
            <div id="cardGrid">
                <ExerciseCard v-for="exercise in exerciseArray" :key="exercise.id" :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"></ExerciseCard>
            </div>
    </form>
  </div>
</template>

<script>
import ExerciseCard from '../components/ExerciseCard.vue'
import axios from 'axios';

export default {
  
data() {
    return {
        chosedExerciseArray: [],
        exerciseArray: [],
        setArray: [],
        errors: [],
        name: "",
        type: "",
    }
  },

  created() {
    axios.get('http://localhost:8080/exercises')
    .then(response => {
      // JSON responses are automatically parsed.
      this.exerciseArray = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
   

    // this.exerciseArray.forEach(exercise => {
      
    // })
    /* async / await version (created() becomes async created())
    
    try {
      const response = await axios.get('https://api.exchangeratesapi.io/latest)
      this.posts = response.data
    } catch (e) {
      this.errors.push(e)
    } */
    },

    props: {
        
    },
    methods: {

         /* For set */
        addRep: function(event) {
            event.preventDefault()
            this.set += 1;
        },
        minusRep: function(event) {
            if(this.set <= 0) {
                this.set = 0;
            }
            else {
                this.set -= 1;
            }
             event.preventDefault()
        },
        addToExerciseArray: function(exercise) {
        exercise.toBeSelected= true
        exercise.toChooseReps = true
            /* Push every data you want to save to the array. */
            this.chosedExerciseArray.push(
                exercise
            )
            var pos = this.exerciseArray.indexOf(exercise)
            this.exerciseArray.splice(pos , 1)
            console.log(this.chosedExerciseArray[0]);
            event.preventDefault()

        }
        , createWorkout : function(){
            axios.post('http://localhost:8080/addWorkout',{
                name : this.name,
                type : this.type,


            })

        }
    },
    components: {
        ExerciseCard
    }
}
</script>

<style scoped>
/* Desktop */
#createWorkout {
        margin: 10%;
        margin-right: 37%;
        margin-left: 37%;
        margin-bottom: 5%;
        padding: 2%;
        background: rgba(0, 0, 0, 0.3);
    }

/* Desktop CSS */
#bodyTitle {
    text-align: center;
    
    padding: 20px;
}

#workoutContainer {
    margin: 5%;
    padding: 3%;
    background-color: #fff;
}
#workoutTitle {
    text-align: center;
    padding: 5px;
}
#workoutType {
    text-align: center;
}

#exerciseArrayDiv {
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

#cardGrid {
    background-color: #f2f2f2;
    margin: 5%;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}


#setBtns {
    border: 0;
    margin: 5px;
    width: 50px;
    background-color: green;
}

#repContainer {
    text-align: center;
}

#repBtnContainer {
    text-align: center;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
  #cardGrid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  #cardGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
} 
</style>