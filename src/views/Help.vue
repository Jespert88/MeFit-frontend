<template>
  <div class="content">
    <div style="margin:5%">
    <ul class="list-unstyled">
        <h1 style="text-align:center">Common Questions</h1>
         <br><br>
        <b-media tag="li">
        <template v-slot:aside>
            <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
        </template>
        <h5 class="mt-0 mb-1" style="text-align:center">How to register?</h5>
        <p class="mb-0">
           On the Login page the user can choose to Log in or Sign up. If sign up is chosen, the application is requesting access to the users account via two way authentication.
        </p>
        </b-media>
        <br><br>
        <b-media tag="li" class="my-4">
        <template v-slot:aside>
        <b-img blank blank-color="#cba" width="64" alt="placeholder"></b-img>
        </template>

        <h5 class="mt-0 mb-1" style="text-align:center">How to set a goal?</h5>
        <p class="mb-0">
            On the Dashboard page, the user is able to set up weekly goals by click the ‘Set Goal’ button. 
            Or click the ‘Set Goal’-button in the sidebar. To add a goal, click the red button that says ‘Select Program’.
            Then click ‘Create Goal’.

        </p>
        </b-media>
         <br><br>
        <b-media tag="li">
        <template v-slot:aside>
            <b-img blank blank-color="#bac" width="64" alt="placeholder"></b-img>
        </template>
       
        <h5 class="mt-0 mb-1" style="text-align:center">How to change your profile information?</h5>
        <p class="mb-0">
            Now, when the user is logged in, the profile page is the first thing they will see. To the left there is a navbar where the user can navigate through the page by clicking the buttons; ‘Profile’, ‘Dashboard’, ‘Set Goal’, ‘Goal Archive’, ‘Exercises’, ‘Workouts’ and ‘Programs’.

On the Profile page it is possible for the user to fill in some personal information and change their profile picture. 
        </p>
        </b-media>

         <br><br>
        <b-media tag="li" class="my-4">
        <template v-slot:aside>
        <b-img blank blank-color="#cba" width="64" alt="placeholder"></b-img>
        </template>

        <h5 class="mt-0 mb-1" style="text-align:center">How to become a contributor?</h5>
        <p class="mb-0">
           The user can also send a request to the admin to become a contributor. You press on the button "Submit a contributor request" in your profile page

        </p>
        </b-media>
    </ul>
    </div>
</div>
</template>

<script>
export default {

}
</script>

