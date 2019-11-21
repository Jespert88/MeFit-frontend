<template>

<div class="content">
 <Loading v-if="loading"/> 
   
  <b-container  v-if="!loading" style="paddin : 10px; margin-bottom:10px">

          <h2>Personal information</h2>
          <img :src="$auth.user.picture" fluid  class="rounded-circle img-fluid profile-picture" >
          
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
        form: {
            email: '',
            name: '',
            fitnesslevel: null,
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

 created() {
   this.loading =true;
   axios.get('https://me-fit.herokuapp.com/profile/user/'+ this.$auth.user.sub.substring(6)).then(response =>{
     console.log(response.data)
      this.loading = false;
      this.profileId = response.data.profileId
      this.form.email = this.$auth.user.email
      this.form.name = this.$auth.user.nickname
      this.form.height = response.data.height
      this.form.weight = response.data.weight
      this.form.fitnesslevel = response.data.fitnesslevel
      this.form.age = response.data.age
   })
    },
  
  methods: {
    onSubmit: function() {
      event.preventDefault()
      console.log(this.profileId)
      console.log(this.userID)  

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
      this.loading=false
        console.log(response)
    })
    },
    
    onReset(evt) {
      evt.preventDefault()
      // Reset form values
      this.form.email = 
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