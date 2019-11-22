<template>
  <div class="content">
      <div id="imgContainer">
          <h4>ABOUT US AND OUR MISSION</h4>
      <img src="../assets/gollum.jpg" style="width: 200px; height: 135px;">
      <img src="../assets/gandalf.jpg" style="width: 200px; height: 135px;">
      <img src="../assets/leia.jpg" style="width: 200px; height: 135px;">
      <img src="../assets/yoda.jpg" style="width: 200px; height: 135px;">
      </div>
      <div id="textContainer">
          <p>We’re on a mission to make the world a significantly healthier place<br>
              by creating a long-lasting,multi-generational impact. This means we’re<br>
              striving to make fitness and nutrition simple, enjoyable, and flexible<br>
              for individuals, their families, and future generations.*</p><br>
              <hr id="hrTwo">
      </div>
      
      <div id="projectInfo">
          <p>Sworkit is a premium digital health and fitness company founded in 2012.<br>
              We provide workouts, customizable plans, and resources that allow people<br>
              to adopt and maintain healthy habits for life. With a custom combination<br>
              of strength, cardio, yoga, and stretching workouts, we make it simple for<br>
              millions of people to get in the best shape of their lives and stay in<br>
              the best shape of their lives anytime, anywhere.*
              <br><br><br>
              (* SHAMELESSLY STOLEN FROM https://sworkit.com/about-us )</p><br><br>
              <hr id="hrThree">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
img {
    padding: 2px;
}
#imgContainer {
    padding: 2px;
    margin: auto;
    text-align: center;
}
#imgContainer > p {
    color: black;
    text-align: center;
    font-weight: bold;
}
#textContainer, #projectInfo {
    text-align: center;
    font-size: 15px;
    margin-top: 5px;
    margin: auto;
    padding: 30px;
}
#contactInfo {
    border: 1px;
    border-color: black;
    float: left;
    margin-left: 5%;
}
</style>