<template>
  <div class="content">
      <div id="textareaOne">
          Welcome to <br>
      <img src="../assets/rsz_mefitlogo.png"><br><br>
      </div>
      <hr id="hrOne">
      <hr id="hrTwo">
      <div id="textareaTwo">
          <div id="border">
        An application that will help you to keep an eye on your personal workout-process.<br>
        With our special design you can customize your own workout-programs and follow the
        progress towards your own personal goal.<br><br>
        Join us today!
          </div>
      </div>
      <hr id="hrTwo">
      <hr id="hrOne">
  </div>
</template>

<script>
export default {

}
</script>

<style>
#textareaOne {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
}

#textareaTwo {
    text-align: center;
    font-size: 18px;
}

#hrOne {
    width: 80%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

#hrTwo {
    width: 60%;
    border: 0;
    height: 0.5px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

#border {
    margin-top: 5px;
    margin-left: 80px;
    margin-right: 80px;
    padding: 30px;
}
</style>