
<template>
    
        <div class="content">
       <Loading v-if="loading"/>

        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>


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
                  
        
                <b-jumbotron v-if="chosedExerciseArray.length >0" id="selectedContainer" style="border: 1px solid ;    margin-bottom:10px" required>
                    <b-row  >
                        <b-col v-for="exercise in chosedExerciseArray" :key="exercise.id" class="col-lg-4" style="padding:10px;" >
                            <ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray" @clicked-exerciseCardRemove="removeFromExerciseArray" :toRemove="true"/>
                        </b-col>
                    </b-row>
                    <b-row >
                        <b-button class="mx-auto bg-info" type="submit" variant="secondary">Create Workout</b-button>
                    </b-row>
                </b-jumbotron >
            </b-form>
        </b-container >
           
            
        <b-container  >
        <b-row>
            <b-col v-for="exercise in exerciseArray" :key="exercise.id" class="col-lg-4"><ExerciseCard :exercise="exercise" @clicked-exerciseCard="addToExerciseArray"  :toSelect="true"/></b-col>
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
            name: "",
            type: "",
            profileId: localStorage.profileId,
            loading: false,
            errorMessage: "",
            successMessage: "",
            filter:''
        }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },

    mounted() {
       this.checkIfContributor()
    },
    methods: {
        checkIfContributor: function(){
        axios.get('https://me-fit.herokuapp.com/profile/'+this.profileId).then(response =>{
            if(response.data.role == 2){
                 this.getExercisesList()  
            }
            else if(response.data.role !=2 ){
            this.$router.push('/unauthorized')
            }
        }).catch(()=>{
            this.$router.push('/unauthorized')
        })
        },
        getExercisesList : function(){
        this.loading = true
        axios
            .get('https://me-fit.herokuapp.com/exercises')
            .then((response) => {
                this.loading = false
                this.errorMessage=""
                 if(response.status == 202) {
                        // success
                   this.exerciseArray = response.data.slice(0)
                   this.toSelectArray = response.data.slice(0)
                    } else if (response.status == 404) {
                        // not found
                        this.errorMessage = "Workouts not found"
                    } else if (response.status == 400) {
                        // bad request
                        this.errorMessage = "Bad request, try again"
                    } else {
                        // something went wrong
                        this.errorMessage = "Something went wrong, try again"
                    }
            })
            .catch(e => {
            this.errorMessage = e
            })
        },
        removeFromExerciseArray: function(exercise){
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
            this.chosedExerciseArray.length= 0
            this.setArray .length = 0
            this.errors = []
            this.name = " "
            this.type = " "
            this.profileId = this.$auth.profileId
            this.loading = false
            this.exerciseArray = this.toSelectArray.slice(0)
        },
        createWorkout: function(){
            event.preventDefault()
            this.loading = true
            axios
                .post('https://me-fit.herokuapp.com/addWorkout',{
                    name : this.name,
                    type : this.type,
                    exercises :this.chosedExerciseArray,
                    profileId : this.profileId
                })
                .then((results) => {
                    this.loading = false;
                    if (results.status == 201) {
                        this.successMessage = 'Workout Created successfully'
                    } else if (results.status == 400) {
                         this.errorMessage = "Status 400. Bad Request.."
                    } else if (results.status == 401) {
                         this.errorMessage = "Status 404. Unauthorized.."
                    }
                })
                .catch((e) => {
                    this.errorMessage = 'Something went wrong ' + e
                }).finally(() => {
                    this.resetValues()
                })
        }
    }
}
</script>
