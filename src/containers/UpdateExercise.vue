<template>
<div>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <b-row no-gutters>
    <b-col></b-col>

      <b-col cols="10" md="6" xl="4">
            <h1 class="updateExerciseTitle">Update exercise</h1>
            <b-form @submit="submitUpdate" id="updateExercise">
                <b-form-group>
                    <b-form-input id="input-1" type="text" v-model="name" :placeholder="name || 'name' " required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="description" id="description" :placeholder="description || 'description'" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="muscleGroup" id="muscle group" :placeholder="muscleGroup|| 'muscleGroup'"  required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="image" id="imageLink" :placeholder="image || 'image'" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input type="text" v-model="video" id="videoLink" :placeholder="video || 'video'" required></b-form-input>
                </b-form-group>
                <button class="updateBtn" type="submit" >Update exercise</button>
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
            video: "",
            error :"",
            loading : false,
        }
    },
    created(){
       this.fetchingData()
    },
    props: {
        
    },
    methods: {

        /* Get data from api when this container is created */
        fetchingData: function() {
            this.error = this.post = null
            this.loading = true
             axios.get("http://localhost:8080/exercises/1")
                .then((results) => {
                    this.loading = false
                    this.name= results.data.name
                    this.description=results.data.description
                    this.muscleGroup=results.data.targetMuscle
                    this.image = results.data.imageLink
                    this.video = results.data.videoLink          
                    if (results.status == 202) {
                        console.log("Status 202. Got data");
                    } else if (results.status == 400) {
                        console.log("Status 400. Unauthorized");
                    } else if (results.status == 401) {
                        console.log("Status 404. not found");
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
            axios.patch("http://localhost:8080/exercises/1", {
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
