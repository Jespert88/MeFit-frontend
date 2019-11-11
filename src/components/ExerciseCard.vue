<template>
<div>

  <div id="CardBody">
    <img src="https://source.unsplash.com/random/400x200" class="img-fluid">
     <!-- <img :src="getImgUrl(pic)" v-bind:alt="pic"> -->
    <h1 class="cardTitle">{{ user.name }}</h1>
    <hr class="hrStyle">

    <div class="descDiv">
        <div id="repContainer">
            <p>Total repetitions: {{ repetitions }}</p>
            <div id="repBtnContainer">
                <!-- Subtraction button -->
                <button class="repBtns" @click="minus"> - </button>
                <!-- <button class="repBtns" v-on:click="repetitions -= 1">-</button> -->
                <!-- Add button -->
                <button class="repBtns" @click="add"> + </button>
            </div>
        </div>
    </div>
    <button type="submit" class="submitBtn" @click="addExerciseObj(user)">Select Exercise</button>
    <!-- <button class="subminBtn" @click="addExerciseObj(exercise)">Select Exercise</button> -->
  </div>

</div>
</template>

<script>

export default {
    data() {
        return{
            repetitions: 0
        }
    },

    props: {
        user: {}
    },

    methods: {

        /* For repetitions */
        add: function() {
            this.repetitions += 1;
        },
        minus: function() {
            if(this.repetitions <= 0) {
                this.repetitions = 0;
                console.log(this.repetitions);
            }
            else {
                this.repetitions -= 1;
            }
        },
        
         /* Add exercise to exerciseArray */
        addExerciseObj: function(user) {
            /* let result = this.exerciseArray.map(({ id }) => id) */
            this.$emit("clicked-exerciseCard", user)
            // pass a function to map
            /* const map1 = this.exerciseArray.map(x => x * 2);

            console.log(map1); */
        },

        removeExerciseObj: function() {
        }
    }
}
</script>

<style scoped>

#CardBody {
    margin: 10px;
    height: auto;
    width: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: rgba(20,69,79,1);
}
.cardTitle {
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    padding: 5px;
}
.descDiv {
    height: auto;
    width: auto;
    padding: 5px;
    /* background-color: green; */
}
#repContainer {
    text-align: center;
    color: #fff;
    /* background-color: blue; */
}
.repBtns {
    border: 0;
    margin: 5px;
    width: 50px;
    background-color: green;
}



/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {

} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {

} 
</style>
