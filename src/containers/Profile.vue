<template>
<div>
    <b-row no-gutters>
        <b-col cols="12" md="8" xl="8">
            <b-card>
                <div>

                    <h2>Personal information</h2>
                    <img src="../assets/logo.png" fluid alt="Responsive image">
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                            <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Email"></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
                            <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Change password:" label-for="input-2">
                            <b-form-input id="input-3" v-model="form.password" required placeholder="Change password"></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Fitness level:" label-for="input-3">
                            <b-form-select id="input-4" v-model="form.fitnesslevel" :options="fitnesslevel" required></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-5" label="Height:" label-for="input-2">
                            <b-form-input id="input-5" v-model="form.height" :options="height" required placeholder="Height in cm"></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-6" label="Weight:" label-for="input-2">
                            <b-form-input id="input-6" v-model="form.weight" :options="weight" required placeholder="Weight in kg"></b-form-input>
                        </b-form-group>

                        <b-button type="submit" variant="dark" style="margin: 3px;">Save</b-button>
                        <b-button type="reset" variant="danger" style="margin: 3px;">Reset</b-button>

                        <b-button v-b-toggle.collapse-1 variant="dark" style="margin: 3px;">Edit profile picture</b-button>
                        <b-collapse id="collapse-1" class="mt-2">
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
export default {
    data() {
        return {
            form: {
                email: '',
                name: '',
                fitnesslevel: null,
                image: ''
            },
            fitnesslevel: [{
                text: 'Select your fitnesslevel',
                value: null
            }, 'Newbie', 'Average', 'Fit', 'Professional'],
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
            // Reset form values
            this.form.email = ''
            this.form.name = ''
            this.form.fitnesslevel = null
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },

        // onFileChange(evt) {
        //     var files = evt.target.files || evt.dataTransfer.files;
        //     if (!files.length)
        //         return;
        //     this.createImage(files[0]);
        // },

        // createImage(file) {
        //     this.image = new Image();
        //     var reader = new FileReader();
        //     var vm = this;

        //     reader.onload = (evt) => {
        //         vm.image = evt.target.result;
        //     };
        //     reader.readAsDataURL(file);
        // },

        // removeImage: function (evt) {
        //     this.image = '';
        // }
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
