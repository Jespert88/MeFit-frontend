<template>
  <div id="registerDiv">
    <!-- onkeypress="return /[a-å,ä,ö]/i.test(event.key)" this is a oneliner that makes the input only accepts alphabetic letters. -->
    <form id="createForm" v-on:submit="userLoggedIn">
        <input type="text" class="inputStyle" placeholder="Enter firstname"  v-model="firstname" id="firstname" required  onkeypress="return /[a-å,ä,ö]/i.test(event.key)" :maxlength="max">
        <input type="text" class="inputStyle" placeholder="Enter lastname"  v-model="lastname" id="lastname" required  onkeypress="return /[a-å,ä,ö]/i.test(event.key)">
        <input type="email" class="inputStyle" placeholder="Enter email"  v-model="email" id="email" required>
        <input type="password" class="inputStyle" placeholder="Password"  v-model="password" id="password" required  :maxlength="max" :minlength="min">
        <hr class="hrStyle">
        <button type="submit" class="submitBtn">Create a account</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Register",
    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            max: 20,
            min: 6
        }
    },

    methods: {
        userLoggedIn: function(event) {
            event.preventDefault();
            
            axios.post("Url here", {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            })
            .then((results) => {
                if(results.status == "200") {
                    console.log("200 all is okey");
                    /* If the user exsist get status code 200 and then the user will be sent to user dashboard page. */
                }
                else if (results.status == "400") {
                    console.log("400 bad request");
                    /* This needs to be for inputting like wrong password or email or only one of them. */
                }
                else if (results.status == "404") {
                    console.log("yo");
                }
            }).catch((e) => {
                console.log('Exception: ', e)
            })
        }
    }
}
</script>

<style>
 /* Desktop */
    #registerDiv {
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

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {

} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    
} 
</style>