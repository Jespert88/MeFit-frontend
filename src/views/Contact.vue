<template>
    <div id="content">
        <h4>If you have a question or just want to give us some feedback<br>
            please send us an message</h4>
        <div id="contactForm">
            <b-form-input v-model="name" placeholder="Name" required></b-form-input>
            <!-- <div class="mt-2">Value: {{ name }}</div> -->
            <br>
            <b-form-input v-model="email" placeholder="Email" required></b-form-input>
            <!-- <div class="mt-2">Value: {{ email }}</div> -->
            <br>
            <b-form-input v-model="city" placeholder="City"></b-form-input>
            <!-- <div class="mt-2">Value: {{ city }}</div> -->
            <br>
            <b-form-textarea id="textarea" v-model="text" placeholder="Your message" rows="2" max-rows="10" required>
            </b-form-textarea>
            <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
            <br>
            <b-button type="submit" variant="dark" style="margin: 3px;">Send email</b-button>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>

<style>
#contactForm {
    width: 50%;
    margin: auto;
    padding: 3px;
    margin-top: 5px;
}
h4 {
    text-align: center;
}
</style>