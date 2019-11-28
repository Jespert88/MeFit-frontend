<template>
<div class="content">
    <b-alert v-if="errorMessage != ''" show variant="danger" dismissible>{{errorMessage}}</b-alert>
    <b-alert v-if="successfulMessage != ''" show variant="success" dismissible> {{successfulMessage}}</b-alert>

    <Loading v-if="loading"/>    
    <b-container  v-if="!loading" style="paddin : 10px; margin-bottom:10px">
        <h2>Personal information</h2>
        <b-row>
            <b-col>
                <img :src="profileImage ? profileImage : $auth.user.picture" fluid  class="rounded-circle img-fluid profile-picture" style="max-width:18%">
                <img v-if="$auth.isContributor" src="https://firebasestorage.googleapis.com/v0/b/me-fit-49bd9.appspot.com/o/adminStamp.jpg?alt=media&token=3e14207f-661f-4b5e-84b5-236f1f4b568b" fluid  class="rounded-circle img-fluid profile-picture" style="float:right"  >
            </b-col>
        </b-row>
            
        <b-form @submit="onSubmit">
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
                    <b-form-input  v-model="form.age"  min="0" max="100" type="number"  required ></b-form-input>
                  </b-form-group>
                </b-col>
            </b-row>

            <b-form-group id="input-group-4" label="Fitness level:" label-for="input-4">
              <b-form-select id="input-4" v-model="form.fitnesslevel" :options="fitnesslevel" ></b-form-select>
            </b-form-group>


            <b-row>
              <b-col>
                <b-form-group id="input-group-6" label="Weight:" label-for="input-5">
                  <b-form-input id="input-5" v-model="form.weight" min="0" max="400" type="number"  required></b-form-input>
                </b-form-group> 
              </b-col>
              <b-col>
                <b-form-group id="input-group-5" label="Height:" label-for="input-6">
                  <b-form-input id="input-6" v-model="form.height" min="0" max="300" type="number"  required></b-form-input>
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
            

            <b-button type="submit" variant="dark" style="margin: 3px;"><label for="">Save</label></b-button>

            <b-button variant="dark" style="margin: 3px;">
                <b-form-file no-drop accept="image/*" id="img" style="display:none;" v-on:change="onFileChange"/>
                <label for="img">Edit profile picture</label>
            </b-button>
            <b-button @click="submitContRequest" v-if="!$auth.isContributor && !$auth.isAdmin" variant="dark"> <label for="">Submit a contributor request</label> </b-button>

        </b-form>
    </b-container>
</div>
</template>

<script>
import Loading from '../components/Loading.vue'
import axios from 'axios'

export default {
    components:{
        Loading
    },
    data() {
        return {
            profileId: "",
            userID : this.$auth.userId,
            errorMessage: "",
            successfulMessage: "",
            form: {
                email: '',
                name: '',
                fitnesslevel: 'Fit',
                weight : 0,
                height : 0,
                age : 0,
                street : '',
                city: '',
                country : "",
                postalCode : '',
            },
            loading :false,
            profileImage: "",

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
                this.form.email = this.$auth.user.email
                this.form.name = this.$auth.user.nickname

                this.profileId = response.data.profileId
                this.form.height = response.data.height
                this.form.weight = response.data.weight
                this.form.fitnesslevel = response.data.fitnessLevel
                this.form.age = response.data.age
                this.profileImage = response.data.profileImage
                if(response.data.addressFk != null) {
                    this.form.street = response.data.addressFk.street
                    this.form.city = response.data.addressFk.city
                    this.form.country = response.data.addressFk.country
                    this.form.postalCode = response.data.addressFk.postalCode
                }
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
            }).then(() => {
                this.loading=false
                this.errorMessage = "Your profile details has been succesfully updated"
            })
        },
        onFileChange: function(chosenFile) {
            const tempFile = chosenFile.target.files[0]
            // 4MB
            if(tempFile.size > 4000000) {
                // error, image is to large
                this.errorMessage = "Image is to large"
            } else {
                this.errorMessage = ""
                this.loading = true
                let formData = new FormData()
                formData.append("file", tempFile)
                axios
                    .patch("https://me-fit.herokuapp.com/profile/" + this.profileId + "/image",
                        formData,
                        { headers: { 'Content-Type': 'multipart/form-data' } }
                    )
                    .then((response) => {
                        if(response.status == 204) {
                            this.loading = false
                            this.profileImage = URL.createObjectURL(tempFile)
                            this.successfulMessage = "Profile has been succesfully updated"
                        } 
                    })
                    .catch((e) => {
                        this.loading = false
                        this.errorMessage = "Something went wrong, try again: " + e
                    })
            }   
        },
    }    
}
</script>



