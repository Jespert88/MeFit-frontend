<template>
<div class="content">
  <b-row no-gutters>
    <b-col cols="12" md="8" xl="8">
      <b-card>
        <div>
          <p>{{$auth.user}}</p>
          <h2>Personal information</h2>
          <img src="../assets/logo.png" fluid>
          
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
              <b-form-input id="input-1" v-model="form.email" type="email" required ></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-2" label="Name:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Change password:" label-for="input-3">
              <b-form-input id="input-3" v-model="form.password" type="password" required placeholder="Change password"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Fitness level:" label-for="input-4">
              <b-form-select id="input-4" v-model="form.fitnesslevel" :options="fitnesslevel" required></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-5" label="Height:" label-for="input-5">
              <b-form-input id="input-5" v-model="form.height" required placeholder="Height in cm"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-6" label="Weight:" label-for="input-6">
              <b-form-input id="input-6" v-model="form.weight" required placeholder="Weight in kg"></b-form-input>
            </b-form-group>
            
            <b-button type="submit" variant="dark" style="margin: 3px;">Save</b-button>
            <b-button type="reset" variant="danger" style="margin: 3px;">Reset</b-button>

            <b-button v-b-toggle.collapse-1 variant="dark" style="margin: 3px;">Edit profile picture</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              <b-card>
                <div v-if="!file">
                  <h4>Select an image</h4>
                  <input type="file" v-on:change="handleFileUpload()"/>
                  <button v-on:click="submitFile()">Upload</button>
                  </div>
                  <div v-else>
                    <img :src="file"/>
                    <button @click="removeImage">Remove image</button>
                  </div>
              </b-card>
            </b-collapse>
          </b-form>
        </div>
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
import axios from 'axios'

export default {
  data() {
    return {
      userID : this.$auth.user.sub,
      form: {
        email: '',
        name: '',
        fitnesslevel: null,
        height: '',
        weight: '',
        file: ''
      },
      fitnesslevel: [{
        text: 'Select your fitnesslevel',
        value: null
      }, 'Newbie', 'Average', 'Fit', 'Professional'],
      show: true,
     
    }
  },
 created() {
  
   axios.get('https://me-fit.herokuapp.com/profile/user/'+this.userID).then(response =>{
      console.log(response.data)
      this.form.email = this.$auth.user.email
      this.form.name = this.$auth.user.nickname
      this.form.height = response.data.height
      this.form.weight = response.data.weight
      this.form.fitnesslevel.value = response.data.fitnesslevel

   })
    },
  
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    
    onReset(evt) {
      evt.preventDefault()
      // Reset form values
      this.form.email = ''
      this.form.name = ''
      this.form.fitnesslevel = null
      this.form.height = ''
      this.form.weight = ''
      // this.form.file = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
      this.show = true
      })
    },

    onChange(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
      // The file's text will be printed here
      console.log(e.target.result)
    };
    reader.readAsText(file);
    }
    },

    submitFile(evt) {
      evt.preventDefault()
      let formData = new FormData();
      formData.append('file', this.file);

      axios.post('/single-file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function(){
        console.log('works!');
      })
      .catch(function(){
        console.log('fails');
      });
      },
      
      handleFileUpload(evt) {
        evt.preventDefault()
      this.file = this.$refs.file.files[0];
      },
      
      // removeImage: function (e) {
      // this.file = '';
      // }
    }
</script>

<style scoped>
/* Desktop */

p {
    font-size: 16px;
    color: aliceblue;
}

h2 {
    color: #3088a0;
    text-align: center;
}

img {
    width: 20%;
    margin: auto;
    margin-bottom: 10px;
}

#descriptionContainer>p {
    color: black;
    font-size: 14px;
}

#contentDiv,
#progressDiv {
    background-color: rgba(0, 0, 0, 0.5);
    color: #3088a0;
    text-align: center;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>