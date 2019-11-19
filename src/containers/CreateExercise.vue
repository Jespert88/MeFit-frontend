<<<<<<< HEAD
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

=======
<template>
    <div class="content">
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

          <button type="submit" class="submitBtn">Create</button>
        </b-form>
  </div>

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
                    .post("http://localhost:8080/addExercise", {
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
p {
    color: #fff;
    font-size: 20px;
}
#formDiv {
    margin: 1%;
    margin-right: 30%;
    margin-left: 30%;
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

>>>>>>> 49e9fde3fa5858da57ccebc94ec965d5cbc05e60
</style>