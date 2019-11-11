<template>
  <div>
    <div id="imgContainer">
      <div class="mt-4">
        <h5>Personal information</h5>
        <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
        <div id="descriptionContainer">
            <p>Name:</p>
            <p>Age:</p>
            <p>Height:</p>
            <p>Weight:</p>
            <p>Goal:</p>
        </div>
        </b-card>
        <b-container class="bv-example-row">
          <div id="profileContent">
            <b-row align-h="around">
              <b-col cols="4"><h5>Goals this week</h5><br><p>random content</p></b-col>
              <b-col cols="4"><h5>Personal workout program</h5><br><p>random content</p></b-col>
            </b-row>
          <hr>
        <b-row align-h="around">
          <b-col cols="4"><h5>Progress</h5><br><p>random content</p></b-col>
          <b-col cols="4"><h5>Finished goals</h5><br><p>random content</p></b-col>
        </b-row>
      </div>
    </b-container>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#imgContainer {
  margin-left: 3%;
  margin-top: 2%;
  width: flex;
  margin-right: 50%;
}

#descriptionContainer {
  width: flex;
  height: flex;
  float: right;
  margin-right: 55%;
  padding: 0.5%;
}

#descriptionContainer > p {
  color: black;
  font-size: 15px;
}

#profileContent {
  margin-top: 10%;
  background: rgba(157, 211, 228, 0.3);
  color: rgb(203, 213, 221);
  font-size: 15px;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
} 

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
} 
</style>