<template>
  <div>
    <div id="formDiv">
      <h3>Edit profile</h3>
      <form id="editProfile" v-on:submit="profileEdited">
          <input type="text" class="inputStyle" placeholder="Name" v-model="Name" id="name" required>
          <input type="text" class="inputStyle" placeholder="Age" v-model="Age" id="age" required>
          <input type="text" class="inputStyle" placeholder="Height" v-model="Height" id="height">
          <input type="text" class="inputStyle" placeholder="Weight" v-model="Weight" id="Weight">
          <input type="text" class="inputStyle" placeholder="Fitness level" v-model="FitnessLvl" id="fitnesslevel" required>
          <input type="text" class="inputStyle" placeholder="Goal" v-model="Height" id="goal">
          <button type="submit" class="submitBtn">Edit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Edit Profile",
    data() {
        return {
            name: "",
            age: "",
            height: "",
            weight: "",
            fitnesslevel: "",
            goal: ""
        }
    },
    props: {
        editProfile: {}
    },
    methods: {
        newEdit: function(event) {
            event.preventDefault();
            console.log(this.name + this.age + this.height +  this.weight + this.fitnesslevel + this.goal);
            axios.post("Url here", {
                name: this.name,
                age: this.age,
                height: this.height,
                weight: this.weight,
                fitnesslevel: this.fitnesslevel,
                goal: this.goal
            })
            .then ((results) => {
                if(results.status == 200) {
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
    .inputStyle {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 10px;
        width: 100%;
    }
    .submitBtn {
        width: 100%;
        border: 0;
        margin-top: 8px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        font-size: 18px;
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
    .card {
        text-align: center;
        width: 240px;
        margin: 10px;
        background: rgba(0, 0, 0, 0.4);
    }

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {  
} 
</style>