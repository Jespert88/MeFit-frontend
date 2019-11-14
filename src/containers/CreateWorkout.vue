<template>


<div>
       <Loading v-if="!loading"/>

        <div v-if="errors">
        <b-alert v-for="error in errors" :key="error" show variant="danger">{{error}}</b-alert>
        </div>
      
    <form v-if="loading">
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
            </div>
            <div id="cardGrid">
                <ExerciseCard v-for="exercise in exerciseArray" :key="exercise.id" :exercise="exercise"  @clicked-exerciseCard="addToExerciseArray"></ExerciseCard>
            </div>
    </form>
  </div>
</template>

<script>
import ExerciseCard from '../components/ExerciseCard.vue'
import Loading from '../components/Loading.vue'
import axios from 'axios';

export default {
  
data() {
    return {
        chosedExerciseArray: [],
        exerciseArray: [],
        chosedExercisesIds:[],
        setArray: [],
        errors: [],
        name: "",
        type: "",
        profileId :"",
        loading : false,
    }
  },

  created() {
    this.loading= true
    axios.get('http://localhost:8080/exercises')
    .then(response => {
        this.loading= false
      // JSON responses are automatically parsed.
      this.exerciseArray = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    },

    props: {
        
    },
    methods: {

        addToExerciseArray: function(exercise) {
        
        exercise.toBeSelected= true
        exercise.toSelectReps = true
        exercise.toSelectSets = true
        exercise.toChooseReps = true
            /* Push every data you want to save to the array. */
            this.chosedExerciseArray.push(
                exercise
            )

            this.chosedExercisesIds.push(
                exercise.exerciseId
            )

            var pos = this.exerciseArray.indexOf(exercise)
            this.exerciseArray.splice(pos , 1)
            console.log(this.chosedExerciseArray);
            event.preventDefault()

        },
         createWorkout : function(){
             this.loading= true
            event.preventDefault()
            console.log(this.chosedExerciseArray)
            axios.post('http://localhost:8080/addWorkout',{
                name : this.name,
                type : this.type,
                exercises :this.chosedExerciseArray
            }).then((results) => {
                    this.loading=false;
                    console.log(results)
                    if (results.status == 201) {
                        console.log("Status 201. Created!");
                    } else if (results.status == 400) {
                        console.log("Status 400. Bad Request..");
                    } else if (results.status == 401) {
                        console.log("Status 404. Not Found..");
                    }
                })
                .catch((e) => {
                    console.log("Exception: ", e)
                })

        }
    },
    components: {
        ExerciseCard,
        Loading
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