<<<<<<< HEAD
<template>


        <div>
       <Loading v-if="loading"/>

        <div v-if="errors">
        <b-alert v-for="error in errors" :key="error" show variant="danger">{{error}}</b-alert>
        </div>

        <div  v-if="!loading">
            
        <b-container style="paddin : 10px; margin-bottom:10px">
                <b-form v-if="!loading" @submit="createWorkout">    
                        <h1 id="bodyTitle">Create your workout</h1>
                        <b-form-group>
                            <b-form-input  type="text" v-model="name" required></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input  type="text" v-model="type" required></b-form-input>
                        </b-form-group>
                  
        
        <b-container v-if="chosedExerciseArray.length >0" id="selectedContainer" style="border: 1px solid ;    margin-bottom:10px" required>
        <b-row align-h="start">
            <b-col v-for="exercise in chosedExerciseArray" :key="exercise.id" class="col-lg-2" style="padding:10px;" >
                <ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"/>
                <p>Reps :{{exercise.reps}}</p> 
                <p>Sets :{{exercise.sets}}</p> 
                <b-button type="submit" variant="secondary" @click="removeFromExercises(exercise)">Remove Exercise</b-button>
                </b-col>
        </b-row>
                </b-container >

           <b-button type="submit" variant="secondary">Create Workout</b-button>
             </b-form>
        </b-container >
           
            
        <b-container  >
        <b-row>
            <b-col v-for="exercise in exerciseArray" :key="exercise.id" class="col-lg-3" ><ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"/></b-col>
        </b-row>
        </b-container >
        </div>
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
        toSelectArray:[],
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
      this.toSelectArray = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    },
    props: {
        
    },
    methods: {
        removeFromExercises :function(exercise){
        exercise.toBeSelected= false
        exercise.toSelectReps = false
        exercise.toSelectSets = false
        exercise.toChooseReps = false
        exercise.reps =1
        exercise.sets= 1
          this.exerciseArray.push(
                exercise
            )

            var pos = this.chosedExerciseArray.indexOf(exercise)
            this.chosedExerciseArray.splice(pos , 1)
            console.log(this.exerciseArray
              );
          if (event)  event.preventDefault()

        },
        addToExerciseArray: function(exercise) {
        
        exercise.toBeSelected= true
        exercise.toSelectReps = true
        exercise.toSelectSets = true
        exercise.toChooseReps = true
            /* Push every data you want to save to the array. */
            this.chosedExerciseArray.push(
                exercise
            )

            var pos = this.exerciseArray.indexOf(exercise)
            this.exerciseArray.splice(pos , 1)
            console.log(this.chosedExerciseArray);
           if (event)  event.preventDefault()

        },
        resetValues : function(){
            console.log(this.toSelectArray)
            this.chosedExerciseArray= []
            this.setArray= []
            this.errors= []
            this.name= ""
            this.type= ""
            this.profileId =""
            this.loading = false
        },
         createWorkout : function(){
             event.preventDefault()
             this.loading= true
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
                }).finally(  ()=>{
                    this.chosedExerciseArray.forEach(Element =>{
                        this.removeFromExercises(Element)
                    })
                    this.resetValues()
                    })
        }
    },
    components: {
        ExerciseCard,
        Loading
    }
}
</script>

=======
<template>


        <div class="content">
       <Loading v-if="loading"/>

        <div v-if="errors">
        <b-alert v-for="error in errors" :key="error" show variant="danger">{{error}}</b-alert>
        </div>

        <div  v-if="!loading">
            
        <b-container style="paddin : 10px; margin-bottom:10px">
                <b-form v-if="!loading" @submit="createWorkout">    
                        <h1 id="bodyTitle">Create your workout</h1>
                        <b-form-group>
                            <b-form-input  type="text" v-model="name" required></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input  type="text" v-model="type" required></b-form-input>
                        </b-form-group>
                  
        
        <b-container v-if="chosedExerciseArray.length >0" id="selectedContainer" style="border: 1px solid ;    margin-bottom:10px" required>
        <b-row align-h="start">
            <b-col v-for="exercise in chosedExerciseArray" :key="exercise.id" class="col-lg-2" style="padding:10px;" >
                <ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"/>
                <b-button type="submit" variant="secondary" @click="removeFromExercises(exercise)">Remove Exercise</b-button>
                </b-col>
        </b-row>
                </b-container >

           <b-button type="submit" variant="secondary">Create Workout</b-button>
             </b-form>
        </b-container >
           
            
        <b-container  >
        <b-row>
            <b-col v-for="exercise in exerciseArray" :key="exercise.id" class="col-lg-3" ><ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray" :toSelect="true"/></b-col>
        </b-row>
        </b-container >
        </div>
  </div>

  
</template>

<script>
import ExerciseCard from '../components/ExerciseCard.vue'
import Loading from '../components/Loading.vue'
import axios from 'axios';

export default {
    components: {
        ExerciseCard,
        Loading
    },      
    data() {
        return {
            chosedExerciseArray: [],
            exerciseArray: [],
            toSelectArray:[],
            setArray: [],
            errors: [],
            name: "",
            type: "",
            profileId: "",
            loading: false,
        }
    },

    created() {
        this.loading = true
        axios
            .get('http://localhost:8080/exercises')
            .then((response) => {
                this.loading = false
                // JSON responses are automatically parsed.
                this.exerciseArray = response.data.slice(0)
                this.toSelectArray = response.data.slice(0)
            })
            .catch(e => {
              this.errors.push(e)
            })
    },
    methods: {
        removeFromExercises: function(exercise){
            exercise.reps = 1
            exercise.sets = 1
            this.exerciseArray.push(exercise)

            var pos = this.chosedExerciseArray.indexOf(exercise)
            this.chosedExerciseArray.splice(pos , 1)
            
            if (event) event.preventDefault()
        },
        addToExerciseArray: function(exercise) {
            /* Push every data you want to save to the array. */
            this.chosedExerciseArray.push(exercise)

            var pos = this.exerciseArray.indexOf(exercise)
            this.exerciseArray.splice(pos , 1)
            if (event) event.preventDefault()
        },
        resetValues: function(){
            this.chosedExerciseArray = []
            this.setArray = []
            this.errors = []
            this.name = ""
            this.type = ""
            this.profileId = ""
            this.loading = false

            this.chosedExerciseArray = 0
            this.exerciseArray = this.toSelectArray.slice(0)
        },
        createWorkout: function(){
            event.preventDefault()
            this.loading = true
            axios
                .post('http://localhost:8080/addWorkout',{
                    name : this.name,
                    type : this.type,
                    exercises :this.chosedExerciseArray
                })
                .then((results) => {
                    this.loading = false;
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
                }).finally(() => {
                    this.resetValues()
                })
        }
    }
}
</script>

>>>>>>> 49e9fde3fa5858da57ccebc94ec965d5cbc05e60
