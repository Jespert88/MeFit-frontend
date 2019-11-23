<template>

<div class="content">
    <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
    <b-alert v-if="successfulMessage != ''" show variant="success" dismissible> {{successfulMessage}}</b-alert>


 <Loading v-if="loading"/> 
   

  <b-container  v-if="!loading" style="paddin : 10px; margin-bottom:10px">

          <h2>Personal information</h2>
          <b-row>
            <b-col>
          <img :src="$auth.user.picture" fluid  class="rounded-circle img-fluid profile-picture" >
          <img v-if="$auth.isContributor" src="data:image/jpeg;base64,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" fluid  class="rounded-circle img-fluid profile-picture" >

            </b-col>
           
          </b-row>
            
            
      <b-form @submit="onSubmit" @reset="onReset" >
            <b-form-group id="input-group-1" label="Email address:" disabled>
              <b-form-input id="input-1"   v-model="form.email" type="email" ></b-form-input>
            </b-form-group>

            <b-row>
                <b-col>
                  <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.name" required ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group  label="Age" >
                    <b-form-input  v-model="form.age"  min="1" max="100" type="number"  required ></b-form-input>
                  </b-form-group>
                </b-col>
            </b-row>

            <b-form-group id="input-group-4" label="Fitness level:" label-for="input-4">
              <b-form-select id="input-4" v-model="form.fitnesslevel" :options="fitnesslevel" ></b-form-select>
            </b-form-group>


            <b-row>
              <b-col>
                <b-form-group id="input-group-6" label="Weight:" label-for="input-5">
                  <b-form-input id="input-5" v-model="form.weight" min="25" max="400" type="number"  required></b-form-input>
                </b-form-group> 
              </b-col>
              <b-col>
                <b-form-group id="input-group-5" label="Height:" label-for="input-6">
                  <b-form-input id="input-6" v-model="form.height" min="18" max="100" type="number"  required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

              <b-row>
                <b-col>
                  <b-form-group id="input-group-6" label="Street:" label-for="input-7">
                    <b-form-input id="input-7" v-model="form.street"  required></b-form-input>
                  </b-form-group> 
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group id="input-group-6" label="City:" label-for="input-8">
                    <b-form-input id="input-8" v-model="form.city"  required></b-form-input>
                  </b-form-group> 
                </b-col>
                <b-col>
                  <b-form-group id="input-group-5" label="Country:" label-for="input-9">
                    <b-form-input id="input-9" v-model="form.country" required></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group id="input-group-5" label="Postal Code:" label-for="input-10">
                    <b-form-input id="input-10" v-model="form.postalCode" required></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            

            <b-button type="submit" variant="dark" style="margin: 3px;">Save</b-button>
            <b-button type="reset" variant="danger" style="margin: 3px;">Reset</b-button>

            <b-button v-b-toggle.collapse-1 variant="dark" style="margin: 3px;">Edit profile picture</b-button>
            <b-button @click="submitContRequest" v-if="!$auth.isContributor && !$auth.isAdmin" variant="dark"> Submit a contributor request</b-button>
            <!-- <b-collapse id="collapse-1" class="mt-2">
              <b-card>
                <div v-if="!image">
                  <h4>Select an image</h4>
                  <input type="file" @change="onFileChange">
                  </div>
                  <div v-else>
                    <img :src="image" />
                    <button @click="removeImage">Remove image</button>
                  </div>
              </b-card>
            </b-collapse> -->
      </b-form>
  </b-container>
</div>
</template>

<script>
import Loading from '../components/Loading.vue'
import axios from 'axios'

export default {
  data() {
    return {
      profileId:'',
        userID : this.$auth.userId,
           errorMessage: "",
            successfulMessage: "",
        form: {
            email: '',
            name: '',
            fitnesslevel: 'Fit',
            image: '',
            weight : 0,
            height : 0,
            age : 0,
            street : '',
            city: '',
            country : "",
            postalCode : '',
      },
      loading :false,

      fitnesslevel: [{
        text: 'Select your fitnesslevel',
        value: null
      }, 'Newbie', 'Average', 'Fit', 'Professional'],
     
    }
  },

 mounted() {
   this.loading =true;
   axios.get('https://me-fit.herokuapp.com/profile/user/'+ this.$auth.user.sub.substring(6)).then(response =>{
      this.loading = false;
      if (response.status =="202"){
      this.errorMessage = ""
      this.profileId = response.data.profileId
      this.form.email = this.$auth.user.email
      this.form.name = this.$auth.user.nickname
      this.form.height = response.data.height
      this.form.weight = response.data.weight
      this.form.street = response.data.addressFk.street
      this.form.city = response.data.addressFk.city
      this.form.country = response.data.addressFk.country
      this.form.postalCode = response.data.addressFk.postalCode
      this.form.fitnesslevel = response.data.fitnessLevel
      this.form.age = response.data.age
      } else if(response.status =="400"){
          this.errorMessage = "Bad request"
      } else if(response.status == "404"){
          this.errorMessage = "404 Not found"
      } else if(response.status == "401"){
          this.errorMessage = "You are unauthorized to be here"
      }
   }).catch(error =>{
      this.errorMessage= "Something went wrong :" + error
   })
    },
  
  methods: {
    submitContRequest(){
      if(event)  event.preventDefault()
      this.successfulMessage = "Your request has been sent"

    },
    onSubmit: function() {
     event.preventDefault()
     this.loading = true;
     axios.patch('https://me-fit.herokuapp.com/profile/'+this.profileId, {
     height : this.form.height,
     weight : this.form.weight,
     age : this.form.age,
     fitnessLevel : this.form.fitnesslevel,
     street : this.form.street,
     city: this.form.city,
     country : this.form.country,
     postalCode : this.form.postalCode,
     userId : this.userID
    }).then(response => {
              console.log(response.data)

      this.loading=false
      this.errorMessage = "Your profile details has been succesfully updated"
      console.log(this.errorMessage)

    })
    },
    
    onReset(evt) {
      evt.preventDefault()
      // Reset form values
      this.form.name = ''
      this.form.fitnesslevel = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
      this.show = true
      })
    },

        // onFileChange() {
        //     var files = event.target.files || event.dataTransfer.files;
        //     if (!files.length)
        //         return;
        //     this.createImage(files[0]);
        // },

        // createImage(file) {
        //     this.image = new Image();
        //     var reader = new FileReader();
        //     var vm = this;

        //     reader.onload = () => {
        //         vm.image = event.target.result;
        //     };
        //     reader.readAsDataURL(file);
        // },

        // removeImage: function () {
        //     this.image = '';
        // }
    },
    components:{
      Loading
    }

    
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