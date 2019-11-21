<template>
    <div >
        <b-container>

        
        <div id="formDiv">
            <h3>Create a new exercise</h3>
            <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
            <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>


            <b-form id="createExercise" @submit="onSubmit">
                <b-form-group>
                    <b-form-input id="input-1"  type="text" required v-model="form.name"  placeholder="Enter Name"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text"  placeholder="Description" v-model="form.description" id="description" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text"  placeholder="Muscle group" v-model="form.muscleGroup" id="muscle group" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" placeholder="imageLink" v-model="form.image" id="imageLink" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" placeholder="videoLink" v-model="form.video" id="videoLink" required></b-form-input>
                </b-form-group>

          <b-button type="submit" variant="secondary"> Create Exercise</b-button>
        </b-form>
  </div>
</b-container>
</div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "CreateExercise",
        data() {
            return {
                form: {
                    name: "",
                    description: "",
                    muscleGroup: "",
                    image: "",
                    video: ""
                },
                errorMessage: "",
                successMessage: ""
            }
        },
        props: {
            exerciseCreated: {}
        },
        methods: {
            onSubmit: function(event) {
                event.preventDefault();
                axios
                    .post("https://me-fit.herokuapp.com/addExercise", {
                        name: this.form.name,
                        description: this.form.description,
                        targetMuscle: this.form.muscleGroup,
                        imageLink: this.form.image,
                        videoLink: this.form.video,
                    })
                    .then ((results) => {
                        if(results.status == 201) {
                            this.successMessage = "Exercise has been succesfully created"
                        } else if (results.status == 400) {
                            this.errorMessage = "Bad request, try again"
                        } else if (results.status == 401) {
                            this.errorMessage = "You have no permission to do so"
                        }
                    })
                    .catch ((e) => {
                        this.errorMessage = "Something wend wrong, try again." + e
                    })
                    .finally (() => {
                        this.form = {}
                    })
            }
        }
    }
</script>

<style scoped>
/* Desktop */


</style>