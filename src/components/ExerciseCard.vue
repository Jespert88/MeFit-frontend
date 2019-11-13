<template>
<div>

    <!-- <div v-if="loading" class="loading">
        Loading...
    </div> -->


    <b-row no-gutters>
        <b-col style="background-color:red;"></b-col>
        <b-col cols="12" md="8" xl="3" style="background-color:green;">
            <b-card 
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
                
                <!-- <b-card-text style="color: #000;">
                    Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. 
                    Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och 
                    blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden,
                    utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet
                    i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker.
                </b-card-text> -->

                <b-card-text style="color: #000;">
                    Name
                </b-card-text>
                <b-card-text style="color: #000;">
                    description
                </b-card-text>
                <b-card-text style="color: #000;">
                    targetMuscleGroup
                </b-card-text>
                <b-card-text style="color: #000;">
                    Video here
                </b-card-text>


                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </b-col>
        <b-col style="background-color:blue;"></b-col>
    </b-row>

    <!--  <div id="CardBody">
    <img src="https://source.unsplash.com/random/400x200" class="img-fluid"> -->
    <!-- <img :src="getImgUrl(pic)" v-bind:alt="pic"> -->
    <!--  <h1 class="cardTitle">{{ exercise.name }}</h1>
    <hr class="hrStyle">

    <div class="descDiv">
        <div id="repContainer">
            <p>Total repetitions: {{ exercise.description }}</p>
            <p>Total repetitions: {{ exercise.imageLink }}</p> -->
    <!-- <p>Total repetitions: {{ exercise.targetMuscle }}</p>
            <p>Total repetitions: {{ exercise.videoLink }}</p> -->
    <!--   <div v-if ="!exercise.toChooseReps" id="repBtnContainer"> -->
    <!-- Subtraction button -->
    <!--    <button class="repBtns" @click="minus"> - </button> -->
    <!-- <button class="repBtns" v-on:click="repetitions -= 1">-</button> -->
    <!-- Add button -->
    <!--  <button class="repBtns" @click="add"> + </button> -->
    <!--  </div>
        </div>
    </div> -->
    <!--  <button  v-if ="!exercise.toBeSelected"  type="submit" class="submitBtn" @click="addExerciseObj(exercise)">Select Exercise</button> -->
    <!-- <button class="subminBtn" @click="addExerciseObj(exercise)">Select Exercise</button> -->
    <!-- </div> -->

</div>
</template>

<script>
export default {
    data() {
        return {
            repetitions: 0,
            /* loading : false, */
        }
    },

    props: {
        exercise: {},

    },

    methods: {

        /* For repetitions */
        add: function () {
            this.repetitions += 1;
        },
        minus: function () {
            if (this.repetitions <= 0) {
                this.repetitions = 0;
                console.log(this.repetitions);
            } else {
                this.repetitions -= 1;
            }
        },

        /* Add exercise to exerciseArray */
        addExerciseObj: function (exercise) {
            /* let result = this.exerciseArray.map(({ id }) => id) */
            this.$emit("clicked-exerciseCard", exercise)
            // pass a function to map
            /* const map1 = this.exerciseArray.map(x => x * 2);

            console.log(map1); */
        },

    }
}
</script>

<style scoped>
/* Desktop CSS */

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>
