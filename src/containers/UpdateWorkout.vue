
<template>


        <div class="content">
       <Loading v-if="loading"/>
       <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
       <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

        <div  v-if="!loading">
        <b-container style="paddin : 10px; margin-bottom:10px">
                <b-form v-if="!loading" @submit="updateWorkout">    
                        <h1 id="bodyTitle">Update your workout</h1>
                        <b-form-group>
                            <b-form-input  type="text" v-model="name" required></b-form-input>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input  type="text" v-model="type" required></b-form-input>
                        </b-form-group>
           <b-jumbotron v-if="chosedExerciseArray.length >0" id="selectedContainer" style="border: 1px solid ;    margin-bottom:10px" required>
                    <b-row  >
                        <b-col v-for="exercise in chosedExerciseArray" :key="exercise.id" class="col-lg-4" style="padding:10px;" >
                            <ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray" @clicked-exerciseCardRemove="removeFromExercises" :toRemove="true"/>
                        </b-col>
                    </b-row>
                    <b-row >
                        <b-button class="mx-auto bg-info" type="submit" variant="secondary">Update Workout</b-button>
                    </b-row>
                </b-jumbotron >         
    
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
  
data() {
    return {
        chosedExerciseArray: [],
        exerciseArray: [],
        toSelectArray:[],
        setArray: [],
        errors: [],
        name: "",
        type: "",
        profileId :localStorage.profileId,
        loading : false,
        workoutId :"",
        successMessage :"",
        errorMessage : ""
    }
  },
  created() {
    // if(!this.$auth.isContributor){
    //     this.$router.push('/unauthorized')
    // } else{  

  
    // }
    this.checkIfContributor()
    },
    props: {
        sentId : Number,
    },
    methods: {
        checkIfContributor: function(){
        axios.get('https://me-fit.herokuapp.com/profile/'+this.profileId).then(response =>{
            if(response.data.role == 2){
                if(this.sentId == undefined){
                this.$router.push('/viewworkouts')
                } else {
                this.fetchData()
                }          
            }
            else if(response.data.role !=2 ){
            this.$router.push('/unauthorized')
            }
        }).catch(()=>{
            this.$router.push('/unauthorized')
        })
        },
        fetchData : function(){
        this.loading= true
        Promise.all([axios.get('https://me-fit.herokuapp.com/workout/'+this.sentId), 
            axios.get('https://me-fit.herokuapp.com/exercises')]).then( response => {
            this.loading= false
            this.workoutId = response[0].data.workoutId
            this.name = response[0].data.name
            this.type=response[0].data.type
            response[0].data.set.forEach(Element => {   
            let exercise = Element.exerciseFk
            exercise.toBeSelected= true
            exercise.toSelectReps = true
            exercise.toSelectSets = true
            exercise.toChooseReps = true
            exercise.sets = Element.setRepetitions
            exercise.reps = Element.repetitions
            this.chosedExerciseArray.push(exercise)  
            })

            this.exerciseArray = response[1].data
            }).catch()
        },
        removeFromExercises :function(exercise){
        exercise.toBeSelected= false

          this.exerciseArray.push(exercise)

            var pos = this.chosedExerciseArray.indexOf(exercise)
            this.chosedExerciseArray.splice(pos , 1)
            
            if (event) event.preventDefault()

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
           if (event)  event.preventDefault()

        },
        resetValues : function(){
            this.chosedExerciseArray= []
            this.setArray= []
            this.errors= []
            this.name= ""
            this.type= ""
            this.profileId =""
            this.loading = false
        },
         updateWorkout : function(){
             event.preventDefault()
             this.loading= true
            axios.patch('https://me-fit.herokuapp.com/workout/'+ this.workoutId,{
                name : this.name,
                type : this.type,
                exercises :this.chosedExerciseArray,
                profileId : this.profileId
            }).then((results) => {
                    this.loading=false;
                    if (results.status == 204) {
                        this.successMessage ="Wokrout has been successfully updated"
                    } else if (results.status == 400) {
                        this.errorMessage = "Status 400. Bad Request.."
                    } else if (results.status == 401) {
                        this.errorMessage = "Status 404. Not Found.."
                    }
                })
                .catch((e) => {
                    this.loading = false;
                    if(e.response.status== 409){
                    this.errorMessage = 'This workout is used. You cannot edit it'
                    }else{
                    this.errorMessage = "Something went wroing: "+ e
                    }
                }).finally()
        }
    },
    components: {
        ExerciseCard,
        Loading
    }
}
</script>

