<template>
<div>
    <b-row no-gutters>
      <b-col cols="12" md="8" xl="8" >
        <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
        <div id="descriptionContainer">
          <h5>Personal information</h5>
            <p>Name:</p>
            <p>Age:</p>
            <p>Height:</p>
            <p>Weight:</p>
            <p>Fitness level:</p>
            <p>Goal:</p>
        </div>
          <router-link class="link" to="/editprofilepicture">
            <button class="link">Edit profile picture</button>
          </router-link>

          <router-link class="link" to="/editprofile">
            <button class="link">Edit profile</button>
          </router-link>
        </b-card>
        <div id="contentDiv">
        <b-row cols="12" md="4" xl="4" no-gutters>
          <b-col cols="12" md="6" xl="6">
            <h4>Goals</h4>
            <p>Here should personal goals be displayed</p>
          </b-col>
          <b-col cols="12" md="6" xl="6">
            <h4>Personal workout program</h4>
            <p>Here should a personal workout program, based on workout cards, be displayed</p>
          </b-col>
        </b-row>
        </div>
      </b-col>
        <b-col cols="12" md="4" xl="4">
          <div id="progressDiv">
          <h4>Progress</h4><br>
          <p>Here should finished goals be displayed</p>
          </div>
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
#contentDiv, #progressDiv {
  background-color: rgba(0, 0, 0, 0.5);
  color: #3088a0;
  text-align: center;
}
p {
font-size: 16px;
}


/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>