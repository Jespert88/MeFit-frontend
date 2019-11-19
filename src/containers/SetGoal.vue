<template>
<div>
<div id="formGoal">
  <b-row no-gutters>
    <b-col cols="12" md="12" xl="12">
      <b-card>
          <h2>Goals</h2>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
                  
                  <b-button type="submit" variant="dark" style="margin: 3px;">Save</b-button>
                  <b-button type="reset" variant="danger" style="margin: 3px;">Reset</b-button>
              </b-form>
          </b-card>
      </b-col>
  </b-row>
</div>

<div id="contentDiv">
    <b-row cols="12" md="12" xl="12" no-gutters>
        <b-col v-for="program in programArr.slice(0,1)" :key="program.programId">
            <!-- Loop program cards -->
        <ProgramCard :program="program"/>
        </b-col>
        
        <b-col v-for="workout in workoutArr.slice(0,1)" :key="workout.workoutId">
            <!-- Loop workout cards -->
        <WorkoutCard :workout="workout"/>
        </b-col>
    </b-row>
</div>
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
            workoutArr: [],
            programArr: [],
            show: true
        }
    },
            methods: {
                onSubmit(event) {
                    event.preventDefault()
                    alert(JSON.stringify(this.form))
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
            },
                created: function(){
                    console.log("inne")
                    axios.get("https://me-fit.herokuapp.com/workout")
                    .then(response => {
                        this.workoutArr = response.data
                        this.programArr = response.data
                        console.log(this.workoutArr);

                        console.log('The result is ' + response)
                        if(response.status == 201) {
                        console.log("Status 201. This works!");
                        } else if (response.status == 400) {
                        console.log("Status 400. Too BAD!");
                        } else if (response.status == 404) {
                        console.log("Status 404. Whata! ò_ó ");
                        }
                        console.log("efter")
                    })
                    .catch ((e) => {
                        console.log("Exception: ",  e)
                        })
                }
}
</script>

<style scoped>
/* Desktop */

p {
    font-size: 16px;
    color: aliceblue;
}

h2 {
    color: #3088a0;
    text-align: center;
}

#formGoal {
    color: #3088a0;
    margin-top: 3%;
    margin-right: 10%;
    margin-left: 10%;
    margin-bottom: 5%;
}

#contentDiv {
    color: #3088a0;
    margin-top: 3%;
    margin-right: 20%;
    margin-left: 20%;
    margin-bottom: 5%; 

}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>