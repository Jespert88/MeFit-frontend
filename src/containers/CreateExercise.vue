<template>
<div>
  <div id="formDiv">
      <h3>Create a new exercise</h3>
      <b-form id="createExercise" @submit="onSubmit">
            <b-form-group>
          <b-form-input id="input-1"  type="text" required v-model="name"  placeholder="Enter Name"></b-form-input>
          </b-form-group>
           <b-form-group>
          <b-form-input type="text"  placeholder="Description" v-model="description" id="description" required></b-form-input>
         </b-form-group>
           <b-form-group>
          <b-form-input type="text"  placeholder="Muscle group" v-model="muscleGroup" id="muscle group" required></b-form-input>
          </b-form-group>
           <b-form-group>
          <b-form-input type="text" placeholder="imageLink" v-model="image" id="imageLink" required></b-form-input>
          </b-form-group>
           <b-form-group>
          <b-form-input type="text" placeholder="videoLink" v-model="video" id="videoLink" required></b-form-input>
  </b-form-group>

          <button type="submit" class="submitBtn">Create</button>
      </b-form>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Create Exercise",
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
        exerciseCreated: {}
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault();
            console.log('sending data to database');
            axios.post("http://localhost:8080/addExercise", {
                name: this.name,
                description: this.description,
                targetMuscle: this.muscleGroup,
                imageLink: this.image,
                videoLink: this.video,
            })
            .then ((results) => {
                console.log('done nd result is ' + results)
                if(results.status == 201) {
                    console.log("Status 200. This works!");
                } else if (results.status == 400) {
                    console.log("Status 400. BAD!");
                } else if (results.status == 401) {
                    console.log("Status 404. Whata!");
                }
            })
            .catch ((e) => {
                console.log("Exception: ",  e)
            })
        }
    }
}
</script>

<style scoped>
/* Desktop */
    p {
        color: #fff;
        font-size: 20px;
    }
    #formDiv {
        margin: 1%;
        margin-right: 37%;
        margin-left: 37%;
        margin-bottom: 5%;
        padding: 2%;
        background: rgba(0, 0, 0, 0.3);
    }

    h3, h5 {
        color: #3088a0;
        text-align: center;
    }
    .link {
        text-align: center;
        background-color: transparent;
        color: rgb(255, 255, 255);
    }

</style>