<template>
<div id="exerciseCardContainer">


    <!-- <div v-if="loading" class="loading">
        Loading...
    </div> -->

    <b-card title="Exercise name here" img-src="https://picsum.photos/300/300/?image=10" img-alt="Image" img-top>
        <b-card-text style="color: #000;">
        Type here
        </b-card-text>
    </b-card>

</div>
</template>

<script>
export default {
    name: "ExerciseCard",
    data() {
        return {
            /* loading : false, */
            repetitions: 0,
        }
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
#cardButtonWrapper {
    border: 0;
    background-color: transparent;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>
