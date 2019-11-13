<template>
<div>

    <b-row no-gutters>
    <b-col></b-col>

      <b-col cols="10" md="6" xl="4">
            <h1 class="updateExerciseTitle">Update exercise</h1>
            <b-form id="updateExercise">
                <b-form-group>
                    <b-form-input id="input-1" type="text" v-model="name" :placeholder="name" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="description" id="description" :placeholder="description" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="muscleGroup" id="muscle group" :placeholder="muscleGroup" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="image" id="imageLink" :placeholder="image" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="video" id="videoLink" :placeholder="video" required></b-form-input>
                </b-form-group>
                <button class="updateBtn" @click="submitUpdate()">Update exercise</button>
            </b-form>
      </b-col>

      <b-col></b-col>
    </b-row>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "UpdateExercise",
    data() {
        return {
            name: "",
            description: "",
            muscleGroup: "",
            image: "",
            video: ""
        }
    },
    props: {
        
    },
    methods: {

        /* Get data from api when this container is created */
        created: function() {
            console.log("Got data from api..")
             axios.get("http://localhost:8080/exercises/1", {
                    name: this.name,
                    description: this.description,
                    targetMuscle: this.muscleGroup,
                    imageLink: this.image,
                    videoLink: this.video,
                })
                .then((results) => {
                    console.log(results)
                    console.log('done nd result is ' + results)
                    if (results.status == 201) {
                        console.log("Status 201. Got data");
                    } else if (results.status == 400) {
                        console.log("Status 400. Something went wrong..");
                    } else if (results.status == 401) {
                        console.log("Status 404. Something went wrong..");
                    }
                })
                .catch((e) => {
                    console.log("Exception: ", e)
                })
        },

        /* Submit the updated data */
        submitUpdate: function (event) {
            event.preventDefault();
            console.log('sending data to database');
            axios.post("End point url here!/exercises/1", {
                    name: this.name,
                    description: this.description,
                    targetMuscle: this.muscleGroup,
                    imageLink: this.image,
                    videoLink: this.video,
                })
                .then((results) => {
                    console.log(results)
                    if (results.status == 201) {
                        console.log("Status 201. This works!");
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
    }
}
</script>

<style scoped>
/* Desktop CSS */
.updateExerciseTitle {
    margin-top: 10%;
    padding: 5px;
    text-align: center;
    color: #fff;
}
.updateBtn {
    width: 100%;
    border: 0;
    padding: 10px;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {

}
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {

}
</style>
