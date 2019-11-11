<template>
<div>
  <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</div>
  <!-- <div id="loginDiv">
    
    <form id="loginForm" v-on:submit="userLoggedIn">
        <input type="email" class="inputStyle" placeholder="Enter email"  v-model="email" id="email" required>
        <input type="password" class="inputStyle" placeholder="Password"  v-model="password" id="password" required >
        <button type="submit" class="submitBtn">Login</button>
        <hr class="hrStyle">

        <router-link to="/register">
            <button class="submitBtn">Create a account</button>
        </router-link>
         <button type="submit" class="submitBtn">Create a account</button> -->
    <!-- </form> -->


    <!-- <p v-bind:class="{ userLoggedIn }">
        Welcome {{this.email + this.password}}
    </p> -->
  <!-- </div> -->
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
                if(results.status == 201) {
                    console.log("201 all is okey");
                    /* If the user exsist get status code 200 and then the user will be sent to user dashboard page. */
                }
                else if (results.status == 400) {
                    console.log("400 bad request");
                    /* This needs to be for inputting like wrong password or email or only one of them. */
                }
                else if (results.status == 404) {
                    console.log("yo");
                }
            }).catch((e) => {
                console.log('Exception: ', e)
                /* if(results.email != email) {
                    alert("Wrong email, try again")
                }
                else if(resluts.password != password) {
                    alert("Wrong password, try again")
                } */
            })
        }
    }
}
</script>

<style>
/* Desktop */
    p {
        color: #fff;
        font-size: 20px;
    }
    #loginDiv {
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
