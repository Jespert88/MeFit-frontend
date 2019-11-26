<template>
    <div >
        <b-container>

        
        <div>
            <h3>Create a new exercise</h3>
            <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
            <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>


            <b-form @submit="onSubmit">
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

                <b-form-file
                    v-model="file"
                    v-on:change="onFileChange"
                    placeholder="Choose an image..."
                    no-drop
                    accept="image/*"
                    required
                ></b-form-file>

                <div class="mt-3">
                    <img v-if="filePreview" height="300" width="300" :src="filePreview" />
                </div>

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
                file: null,
                filePreview: null,
                errorMessage: "",
                successMessage: ""
            }
        },
        created(){
            if(!this.$auth.isContributor){
                this.$router.push('/unauthorized')
            }
        },
        props: {
            exerciseCreated: {}
        },
        methods: {
            onSubmit: function(event) {
                event.preventDefault();
                this.uploadFile()

                // axios
                //     .post("https://me-fit.herokuapp.com/addExercise", {
                //         name: this.form.name,
                //         description: this.form.description,
                //         targetMuscle: this.form.muscleGroup,
                //         imageLink: this.form.image,
                //         videoLink: this.form.video,
                //     })
                //     .then ((results) => {
                //         if(results.status == 201) {
                //             this.successMessage = "Exercise has been succesfully created"
                //         } else if (results.status == 400) {
                //             this.errorMessage = "Bad request, try again"
                //         } else if (results.status == 401) {
                //             this.errorMessage = "You have no permission to do so"
                //         }
                //     })
                //     .catch ((e) => {
                //         this.errorMessage = "Something wend wrong, try again." + e
                //     })
                //     .finally (() => {
                //         this.form = {}
                //      })
            },
            onFileChange: function(chosenFile) {
                const file = chosenFile.target.files[0]
                // 4MB
                if(file.size > 4000000) {
                    // error, image is to large
                }
                this.filePreview = URL.createObjectURL(file)
            },
            uploadFile: function() {
                console.log(this.file)
                let formData = new FormData()
                formData.append("file", this.file)
                axios
                    //.post("https://me-fit.herokuapp.com/upload",
                        .post("http://localhost:8080/upload",
                        formData,
                        {   
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    .then((response) => {
                        console.log("response: " + response.status)
                    })
                    .catch((e) => {
                        console.log("problem: " + e.response.status)
                        console.log("problem: " + e.response.data)
                    })
            }
        }
    }
</script>

<style scoped>
/* Desktop */


</style>