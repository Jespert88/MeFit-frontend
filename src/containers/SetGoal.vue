<template>
    <div class="content">
        <b-form  @submit="onSubmit" @reset="onReset" v-if="show">
            <h2>Goals</h2>
            <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input id="input-1" v-model="form.name" required placeholder="Name of goal"></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label-for="input-2">
                <b-form-input id="input-2" v-model="form.musclegroup" required placeholder="Muscle Group"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label-for="input-3">
                <b-form-input id="input-3" v-model="form.startdate" required placeholder="Start date"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label-for="input-4">
                <b-form-input id="input-4" v-model="form.enddate" required placeholder="End date"></b-form-input>
            </b-form-group>
            <b-jumbotron container-fluid v-if="chosedProgrmas.length > 0 || workoutListToSend.length > 0 " border-variant ="dark">
                    <b-row>
                        <b-col v-for="program in chosedProgrmas" :key="program.id" class="col-lg-6" style="padding:10px;" >
                            <ProgramCard :program="program" :goal="false" :toRemove="true" @clickedToRemove="removeFromPrograms"  @clicked-exerciseCard="addToExerciseArray" :toSelectProgram="false" :toViewAndUpdate="false" />
                        </b-col>
                        <b-col v-for="workout in workoutListToSend" :key="workout.id" class="col-lg-4" style="padding:10px;" >
                            <WorkoutCard :workout="workout" :toRemove="true" @clicked-RemoveWorkoutCard="removeFromWorkoutList" @clicked-workoutCard="addToWorkoutListToSend" :toUpdate="true"/>
                        </b-col>
                    </b-row>
                    <b-row >
                        <b-button class="mx-auto bg-info" type="submit" variant="secondary">Create Goal</b-button>
                    </b-row>
                </b-jumbotron>
        </b-form>
  
        <b-row >
            <b-col cols="10" xm="10" md="10" xl="6" v-for="program in programArr" :key="program.id">
            <ProgramCard :program="program" :goal="false" @clicked-exerciseCard="addToExerciseArray" :toSelectProgram="true" :toViewAndUpdate="false" />
            </b-col>
        </b-row>
        
        <b-row >
            <b-col v-for="workout in workoutArr" :key="workout.id" cols="10" xm="10" md="7" xl="4" >
                <WorkoutCard :workout="workout"  @clicked-workoutCard="addToWorkoutListToSend" :toSelect="true" :toUpdate="true"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'
import WorkoutCard from '../components/WorkoutCard'
import ProgramCard from '../components/ProgramCard'

export default {
    name: "SetGoal",
    components: {
        WorkoutCard,
        ProgramCard
    },
    data() {
        return {
            form: {
                name: '',
                musclegroup: '',
                startdate: '',
                enddate: ''
            },
            workoutListToSend: [],
            chosedProgrmas: [],
            workoutArr: [],
            programArr: [],
            show: true
        }
    },
    methods: {
        onSubmit(event) {
            axios.post('https://me-fit.herokuapp.com/addGoal', {

            })
            console.log('submit')
            event.preventDefault()
            alert(JSON.stringify(this.chosedProgrmas))
        },
          addToWorkoutListToSend: function(workout) {
            // add to workout list to send and remove it from available list
            if (event) {
                event.preventDefault()
            }
            this.workoutListToSend.push(workout)
            let pos = this.workoutArr.indexOf(workout)
            this.workoutArr.splice(pos , 1)
        },
         addToExerciseArray: function(program) {
             console.log(program)
            /* Push every data you want to save to the array. */
            
             this.chosedProgrmas.push(program)
             var pos = this.programArr.indexOf(program)
              console.log(pos)
             this.programArr.splice(pos , 1)
             if (event) event.preventDefault()
        },
           removeFromWorkoutList: function(workout){
            // remove from workout list to send
            if (event) {
                event.preventDefault()
            }
            let pos = this.workoutListToSend.indexOf(workout)
            this.workoutListToSend.splice(pos , 1)

            this.workoutArr.push(workout)
        },
        onReset(event) {
            event.preventDefault()
            this.form.name = ''
            this.form.musclegroup = ''
            this.form.startdate = ''
            this.form.enddate =''

            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
         removeFromPrograms: function(program){

            this.programArr.push(program)
            var pos = this.chosedProgrmas.indexOf(program)
            this.chosedProgrmas.splice(pos , 1)
            
            if (event) event.preventDefault()
        },
    },
    created (){
        console.log("inne")
         Promise.all([axios.get('https://me-fit.herokuapp.com/workout'), 
            axios.get('https://me-fit.herokuapp.com/program')]).then( response => {
              this.workoutArr=  response[0].data
              this.programArr = response[1].data
            }).catch()
    }
}

</script>
