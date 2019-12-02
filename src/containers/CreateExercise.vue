<template>
    <div class="content">
        <h3>Create a new exercise</h3>
        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>
        <b-container>
        <b-form @submit="onSubmit">
            <b-form-group label="Name*">
                <b-form-input id="input-1"  type="text" required v-model="form.name"  placeholder="Enter Name"></b-form-input>
            </b-form-group>
            <b-form-group label="Description*">
                <b-form-input type="text"  placeholder="Description" v-model="form.description" id="description" required></b-form-input>
            </b-form-group>
            <b-form-group label="Muscle group*">
                <b-form-input type="text"  placeholder="Muscle group" v-model="form.muscleGroup" id="muscle group" required></b-form-input>
            </b-form-group>

            <b-form-group label="Choose an image*">
                <b-form-file
                    v-model="file"
                    v-on:change="onFileChange"
                    placeholder="Choose an image..."
                    no-drop
                    accept="image/*"
                    required
                ></b-form-file>
            </b-form-group>

            <div class="mt-3">
                <img v-if="filePreview" height="300" width="300" :src="filePreview" />
            </div>

            <b-button type="submit" variant="secondary"> Create Exercise</b-button>
        </b-form>
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
                    muscleGroup: ""
                },
                file: null,
                filePreview: null,
                errorMessage: "",
                successMessage: ""
            }
        },
        created(){
            this.checkIfContributor()

    
        },
        props: {
            exerciseCreated: {}
        },
        methods: {
     checkIfContributor: function(){
        axios.get('https://me-fit.herokuapp.com/profile/'+ localStorage.profileId).then(response =>{
             if(response.data.role !=2 ){
            this.$router.push('/unauthorized')
            }
        }).catch(()=>{
            this.$router.push('/unauthorized')
        })
        },
            onSubmit: function(event) {
                event.preventDefault();
                let formData = new FormData()
                formData.append("file", this.file)
                formData.append("exercise", JSON.stringify({
                        name: this.form.name,
                        description: this.form.description,
                        targetMuscle: this.form.muscleGroup
                    }))
                axios
                    .post("https://me-fit.herokuapp.com/addExercise",
                        formData,
                        { headers: { 'Content-Type': 'multipart/form-data' } }
                    )
                    .then ((results) => {
                        if(results.status == 201) {
                            this.successMessage = "Exercise has been succesfully created"
                        } 
                    })
                    .catch ((e) => {
                        this.errorMessage = "Something went wrong, try again: " + e
                    })
                    .finally (() => {
                        // reset values
                        this.form = {}
                        this.file = null
                        this.filePreview = null
                     })
            },
            onFileChange: function(chosenFile) {
                const tempFile = chosenFile.target.files[0]
                // 4MB
                if(tempFile.size > 4000000) {
                    // error, image is to large
                    this.errorMessage = "Image is to large"
                    // without this, this.file is undefined
                    this.$nextTick(() => {
                        this.file = null
                        this.filePreview = null
                    })
                } else {
                    this.errorMessage = ""
                    this.filePreview = URL.createObjectURL(tempFile)
                }   
            }
        }
    }
</script>

<style scoped>
/* Desktop */


</style>