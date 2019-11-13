<template>
<div>
    <b-row no-gutters>
      <b-col cols="12" md="8" xl="8" style="background-color: pink;">
        <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
        <div id="descriptionContainer">
          <h5>Personal information</h5>
            <p>Name:</p>
            <p>Age:</p>
            <p>Height:</p>
            <p>Weight:</p>
            <p>Goal:</p>
        </div>
        <li class="nav-item" >
          <router-link class="nav-link" to="/editprofile">
            <button class="navBtns">Edit profile</button>
          </router-link>
        </li>
        </b-card>
        <b-row cols="12" md="4" xl="4" no-gutters>
          <b-col cols="12" md="6" xl="6" style="background-color: orange;">
            <p>goals</p>
          </b-col>
          <b-col cols="12" md="6" xl="6" style="background-color: red;">
            <p>personal workout program</p>
          </b-col>
        </b-row>
      </b-col>
        <b-col cols="12" md="4" xl="4" style="background-color: purple; height: flex;">
          <h5>Progress</h5><br>
          <p>random content</p>
        </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
}
</script>

<style>
/* Desktop */
#descriptionContainer > p {
  color: black;
  font-size: 14px;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>