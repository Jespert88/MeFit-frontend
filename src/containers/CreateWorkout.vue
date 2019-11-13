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
                    <button>Create workout</button>
                </div>

                 <div id="cardGrid">
                 <!-- <ExerciseCard v-for="user in userArray" :key="user.id" :user="user" @clicked-exerciseCard="addToExerciseArray"/> -->
                <ExerciseCard v-for="exercise in chosedExerciseArray" :key="exercise.id" :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"/>
            </div>


                <div id="exerciseArrayDiv">
                    <div id="setBtnContainer" v-for="btns in setArray" :key="btns.id">
                        <!-- Subtraction button -->
                        <button class="setBtns" @click="minusSet">-</button>
                        <!-- Add button -->
                        <button class="setBtns" @click="addSet">+</button>
                    </div>
                    <!-- Display all of the selected object exercises with buttons for add how many sets -->
                </div>
            </div>
            <div id="cardGrid">
                 <!-- <ExerciseCard v-for="user in userArray" :key="user.id" :user="user" @clicked-exerciseCard="addToExerciseArray"/> -->
                <ExerciseCard v-for="exercise in exerciseArray" :key="exercise.id" :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"/>
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
      console.log(this.exerciseArray)
    axios.get('http://localhost:8080/exercises')
    .then(response => {
      // JSON responses are automatically parsed.
      this.exerciseArray = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
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
        addSet: function() {
            this.set += 1;
        },
        minusSet: function() {
            if(this.set <= 0) {
                this.set = 0;
            }
            else {
                this.set -= 1;
            }
        },
        addToExerciseArray: function(exercise) {
            event.preventDefault()
            /* Push every data you want to save to the array. */
            this.chosedExerciseArray.push(
                exercise.exerciseId
            )
            var pos = this.exerciseArray.indexOf(exercise)
            this.exerciseArray.splice(pos , 1)
            console.log(this.chosedExerciseArray);
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