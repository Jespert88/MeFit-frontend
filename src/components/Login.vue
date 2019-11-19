<template>
<div>

 <div id="loginContainer">
    <form v-on:submit="userLoggedIn">
        <input type="email" class="inputStyle" placeholder="Enter email"  v-model="email" id="email" required>
        <input type="password" class="inputStyle" placeholder="Password"  v-model="password" id="password" required >
        <button type="submit" class="submitBtn">Login</button>
        <hr class="hrStyle">

        <router-link to="/register">
            <button class="submitBtn">Create a account</button>
        </router-link>
     </form> 
</div>

</div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            max: 20,
            min: 6
        }
    },
    props: {
        loggedIn: {}
    },
    methods: {
        userLoggedIn: function(event) {
            event.preventDefault();
            console.log(this.email + this.password);
            axios.post("Url here", {
                email: this.email,
                password: this.password
            })
            .then((results) => {
                if(results.status == 202) {
                    console.log("Status 202: Request accepted..");
                }
                else if (results.status == 400) {
                    console.log("Status 400: Bad request..");
                }
                else if (results.status == 404) {
                    console.log("Status 404: Not Found..");
                }
            }).catch((e) => {
                console.log('Exception: ', e)
            })
        }
    }
}
</script>

<style scoped>
/* Desktop */
  #loginContainer {
      margin-top: 10%;
      margin-right: 40%;
      margin-left: 40%;
      margin-bottom: 5%;
  }
/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
     #loginContainer {
      margin-top: 20%;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
  }
} 
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
     #loginContainer {
      margin-top: 20%;
      margin-right: 25%;
      margin-left: 25%;
      margin-bottom: 5%;
  }
} 
</style>