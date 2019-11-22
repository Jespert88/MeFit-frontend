<template>
    <div class="content">
        <h3>If you have a question or just want to give us some feedback please send us an message</h3><br>
        <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
        <b-alert v-if="successMessage != ''" show variant="success" dismissible>{{successMessage}}</b-alert>
          <b-container>
          <b-form id="contactUs" @submit="onSubmit"> 
            <b-form-input v-model="form.name" placeholder="Name" required></b-form-input>
            <br>
            <b-form-input v-model="form.email" placeholder="Email" required></b-form-input>
            <br>
            <b-form-input v-model="form.city" placeholder="City"></b-form-input>
            <br>
            <b-form-textarea id="textarea" v-model="form.text" placeholder="Your message" rows="2" max-rows="10" required>
            </b-form-textarea>
            <br>
            <b-button type="submit" variant="dark" style="margin: 3px;">Send email</b-button>
          </b-form>
          </b-container>
        </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          city: "",
          text: ""
        },
        errorMessage: "",
        successMessage: ""
      }
    },
    // props: {
    //   sendMessage: {}
    // },
    methods: {
      onSubmit: function (event) {
        event.preventDefault();
        console.log(this.form.name + this.form.email + this.form.city + this.form.text)
            if (event) {
              this.successMessage = "Your message has succesfully been sent"
            } else if (event) {
              this.errormessage = "Something went wrong. Try again"
            } else if (event) {
              this.errormessage = "Try again"
            }
      }
    }
  }
</script>

<style>
h3 {
    text-align: center;
}
</style>