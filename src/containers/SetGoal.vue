<template>
<div>
    <Loading v-if="loading"/>
    

    <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
    <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>

    <div v-if="!loading && !hasGoal">

        <h2 class="text-center">Set Goal</h2>
        <b-container >
            <b-form @submit="formSubmit">
                <b-form-group label="Goal name:">
                    <b-form-input v-model="form.name" required placeholder="Goal Name"></b-form-input>
                </b-form-group>
                <b-form-group label="Select Start Date:">
                    <Datepicker  v-on:selected="highlightFrom" :disabled-dates="disabledDates"></Datepicker>
                </b-form-group>

                <!-- <Datepicker :inline="true" :highlighted="highlighted"></Datepicker> -->
                
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
        </b-container>



        <b-card no-body class="full-width" style="min-width:25rem">
            <b-tabs pills card fill> 
                <b-tab title="Programs">
                    <!-- <b-form @submit="searchProgram">
                        <div class="d-flex justify-content-center">
                            <b-form-group label="Search for program">
                                <b-input v-model="search.program"></b-input>
                            </b-form-group>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b-button type="submit" variant="dark" style="margin: 3px;">Search</b-button>
                        </div>
                    </b-form> -->
                    <b-row no-gutters>
                        <b-col cols="12" sm="12" md="12" xl="6" class="d-flex justify-content-center" v-for="program in programArr" :key="program.programId">
                            <ProgramCard :program="program" :goal="false" @clicked-exerciseCard="addToExerciseArray" :toSelectProgram="true" :toViewAndUpdate="false" />
                        </b-col>
                        <!-- Goal does not have programs -->
                        <div v-if="programArr.length == 0">
                            <h2>There is no programs for this goal</h2>
                        </div>
                    </b-row>
                </b-tab>
                <b-tab title="Workouts">
                    <!-- <b-form @submit="searchWorkout">
                        <div class="d-flex justify-content-center">
                            <b-form-group label="Search for program">
                                <b-input v-model="search.workout"></b-input>
                            </b-form-group>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b-button type="submit" variant="dark" style="margin: 3px;">Search</b-button>
                        </div>
                        New Date()
                    </b-form> -->
                    <b-row no-gutters>
                        <b-col cols="12" sm="12" md="6" xl="4" class="d-flex justify-content-center" v-for="workout in workoutArr" :key="workout.workoutId">
                            <WorkoutCard :workout="workout"  @clicked-workoutCard="addToWorkoutListToSend" :toSelect="true" :toUpdate="true"/>
                        </b-col>
                        <!-- Goal does not have workouts -->
                        <div v-if="workoutArr.length == 0">
                            <h2>There is no workouts for this goal</h2>
                        </div>
                    </b-row>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</div>
</template>

<script>
    import axios from 'axios'
    import Loading from '../components/Loading'
    import WorkoutCard from '../components/WorkoutCard'
    import ProgramCard from '../components/ProgramCard'
    import Datepicker from 'vuejs-datepicker'

    export default {
        name: "SetGoal",
        components: {
            Datepicker,
            WorkoutCard,
            ProgramCard,
            Loading
        },
        data() {
            return {
                form: {
                    name: "",
                    startDate: "",
                    endDate: ""
                },
                search: {
                    program: "",
                    workout: ""
                },
                highlighted: {
                    from: "",
                    to: ""
                },
                disabledDates: {
                    to: new Date()
                },
                originalWorkoutList: [],
                originalProgramList: [],
                workoutListToSend: [],
                chosedProgrmas: [],
                workoutArr: [],
                programArr: [],
                loading: "",
                errorMessage: "",
                successMessage: "",
                profileId : localStorage.profileId,
                fitnessLevel :'',
                hasGoal : ''
            }
        },
        mounted() {
            this.checkIfUserHasGoal()
            
        },
        methods: {
            // submit form and send to api
            formSubmit: function(event) {
            this.errorMessage = ''
            this.successMessage = ''
            if(this.fitnessLevel =='Newbie' && (this.workoutListToSend.length> 3 || this.chosedProgrmas.length >1)){
                this.errorMessage=  'Too many workouts.. Remeber you still a Newbie'
            }else if (this.fitnessLevel =='Average' && (this.workoutListToSend.length> 6 || this.chosedProgrmas.length >1)){
                this.errorMessage= 'Too many workouts.. Remeber you still a Average '
            }else if (this.fitnessLevel =='Fit' && (this.workoutListToSend.length>9 || this.chosedProgrmas.length >1)){
                this.errorMessage = 'Too many workouts.. Remeber you are not profiessional yet'
            }else if (this.fitnessLevel =='Professional' && (this.workoutListToSend.length>9 || this.chosedProgrmas.length >3)){
                this.errorMessage = 'Too many workouts'
            }else{
                axios.post('https://me-fit.herokuapp.com/addGoal', {
                    endDate : this.form.endDate[0]+'/'+this.form.endDate[1]+'/'+this.form.endDate[2],
                    name : this.form.name,
                    startDate :this.form.startDate[0]+'/'+this.form.startDate[1]+'/'+this.form.startDate[2],
                    profileId : this.profileId,
                    workoutList : this.workoutListToSend,
                    programList : this.chosedProgrmas
                }).then(respose => {
                    if(respose.status == "201"){
                        this.successMessage = "succesfully created"
                    }
                }).catch(e =>{
                    this.errorMessage = "Something went wrong" + e
                }).then(()=>{
                    this.resetValues()
                    this.hasGoal =true 
                    // this.errorMessage = 'You already have a goal.. Try again after you completed it'
                    }
                )
                event.preventDefault()
            }
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
                /* Push every data you want to save to the array. */
                console.log(program)
                this.chosedProgrmas.push(program)
                var pos = this.programArr.indexOf(program)
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
            removeFromPrograms: function(program){

                this.programArr.push(program)
                var pos = this.chosedProgrmas.indexOf(program)
                this.chosedProgrmas.splice(pos , 1)
                
                if (event) event.preventDefault()
            },
            // highlight calendar dates
            highlightFrom: function(val) {
                this.highlighted.from = new Date(val);
                // automatically adds 6 days (7 in total)
                this.highlighted.to = new Date(new Date(val).getTime() + 10080*60000)
                this.form.startDate = this.highlighted.from.toISOString().split('T')[0].split('-').reverse()
                this.form.endDate = this.highlighted.to.toISOString().split('T')[0].split('-').reverse()
            },
            getFitnessLevel : function(){
                axios.get('https://me-fit.herokuapp.com/profile/'+ this.profileId)
                .then(respose =>{
                    this.fitnessLevel = respose.data.fitnessLevel
                })
            },

            // retrieve initial workout list
            retrieveWorkouts: function() {
                this.loading = true
                axios
                    .get('https://me-fit.herokuapp.com/workout')
                    .then(response => {
                        this.loading = false
                        this.errorMessage = ""
                        if(response.status == 202) {
                            // success
                            this.workoutArr = response.data.slice(0)
                            this.originalWorkoutList = response.data.slice(0)
                        } 
                    })
                    .catch(e => {
                        this.loading = false
                        this.errorMessage = "Something went wrong, try again: " + e
                    })
            },
            // retrieve initial program list
            retrievePrograms: function() {
                this.loading = true
                axios
                    .get('https://me-fit.herokuapp.com/program')
                    .then(response => {
                        this.loading = false
                        this.errorMessage = ""
                        if(response.status == 202) {
                            // success
                            this.programArr = response.data.slice(0)
                            this.originalProgramList = response.data.slice(0)
                        } 
                    })
                    .catch(e => {
                        this.loading = false
                        this.errorMessage = "Something went wrong, try again: " + e
                    })
            },
            checkIfUserHasGoal : function(){
                axios
                .get('https://me-fit.herokuapp.com/goal/status/user/'+this.profileId)
                .then((response) => {
                    if (response.status == '202') {
                        if(response.data.length > 0 ){
                            this.hasGoal = true 
                            this.errorMessage = 'You already have a goal.. Try again after you completed it'
                        }else{
                            this.getFitnessLevel()
                            this.retrieveWorkouts()
                            this.retrievePrograms()
                        }
                    }
                })
                .catch(() => {
                
                })
            },
            // handle search workout
            searchWorkout: function() {

            },
            // handle search program
            searchProgram: function() {

            },
            resetValues : function(){
            this.form = {}
            this.profileId = this.$auth.profileId
            this.loading = false
            this.workoutListToSend.length = 0
            this.chosedProgrmas.length = 0
            this.workoutArr = this.originalWorkoutList.splice(0)
            this.programArr = this.originalProgramList.slice(0)
            }
        }
    }
</script>

<style scoped>
.full-width {
    width: inherit;
}
</style>
