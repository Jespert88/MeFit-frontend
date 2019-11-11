<template>
  <div>
      <form id="createWorkout">

        <input type="file" id="fileInput" name="fileInput" />

        <input type="text" class="inputStyle" placeholder="Enter name of workout"  
            v-model="name"  
            required  
            onkeypress="return /[a-å,ä,ö]/i.test(event.key)"
            :maxlength="max" :minlength="min"
        >
        <input type="text" class="inputStyle" placeholder="Enter type"  
            v-model="type"  
            required  
            onkeypress="return /[a-å,ä,ö]/i.test(event.key)"
            :maxlength="max" :minlength="min"
        >

        <div id="repContainer">
            <p>Total repetitions: {{ repetitions }}</p>

            <div id="repBtnContainer">
                <!-- Add button -->
                <button v-on:click="repetitions += 1">+</button>
                <!-- Subtraction button -->
                <button v-on:click="repetitions -= 1">-</button>
            </div>
        </div>

        


        <hr class="hrStyle">
        <button type="submit" class="submitBtn">Create a account</button>
    </form>
  </div>
</template>

<script>
export default {
     name: "Register",

    data() {
        return {
            name: "",
            type: "",
            completed: false,
            repetitions: 1,
            minRep: 1,
            max: 20,
            min: 6
        }
    },
    methods: {

    }
}
</script>

<style scoped>
/* Desktop */
#createWorkout {
        margin: 10%;
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

    .hrStyle {
        background-color: #000;
        box-shadow: 1px 1px 1px #fff;
        opacity: 0.2;
    }

    #repContainer {
        text-align: center;
    }
    #repBtnContainer {
        text-align: center;
    }

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {

} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    
} 
</style>