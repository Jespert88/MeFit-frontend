<template>
  <div>
      <h2>Edit you personal information</h2>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <div id="editForm">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Change password:" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          placeholder="Change password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Fitness level:" label-for="input-3">
        <b-form-select
          id="input-4"
          v-model="form.fitnesslevel"
          :options="fitnesslevel"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Height:" label-for="input-2">
        <b-form-input
          id="input-5"
          v-model="form.height"
          :options="height"
          required
          placeholder="Height in cm"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Weight:" label-for="input-2">
        <b-form-input
          id="input-6"
          v-model="form.weight"
          :options="weight"
          required
          placeholder="Weight in kg"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">Save</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          fitnesslevel: null,
          checked: []
        },
        fitnesslevel: [{ text: 'Select your fitnesslevel', value: null }, 'Newbie', 'Average', 'Fit', 'Professional'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>
/* Desktop */
    #editForm {
        margin: 1%;
        margin-right: 37%;
        margin-left: 37%;
        margin-bottom: 5%;
        padding: 2%;
        background: rgba(0, 0, 0, 0.3);
        color: aliceblue;
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
    h2 {
        color: #3088a0;
        text-align: center;
    }
    .link {
        text-align: center;
        background-color: transparent;
        color: rgb(255, 255, 255);
    }
    .card {
        text-align: center;
        width: 240px;
        margin: 10px;
        background: rgba(0, 0, 0, 0.4);
    }

    button {
        margin: 3px;
    }

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {  
} 
</style>