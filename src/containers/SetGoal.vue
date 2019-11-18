<template>
<div>
  <b-row no-gutters>
    <b-col cols="12" md="8" xl="8">
      <b-card>
          <h2>Goals</h2>
          <div id="formGoal">
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group id="input-group-1" label-for="input-1">
                      <b-form-input id="input-1" v-model="form.name" required placeholder="Name of goal"></b-form-input>
                  </b-form-group>
                  
                  <b-form-group id="input-group-2" label-for="input-2">
                      <b-form-input id="input-2" v-model="form.musclegroup" required placeholder="Muscle Group"></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-3" label-for="input-3">
                      <b-form-input id="input-3" v-model="form.startdate" required placeholder="Start date"></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-4" label-for="input-4">
                      <b-form-input id="input-4" v-model="form.enddate" required placeholder="End date"></b-form-input>
                  </b-form-group>
                  
                  <b-button type="submit" variant="dark" style="margin: 3px;">Save</b-button>
                  <b-button type="reset" variant="danger" style="margin: 3px;">Reset</b-button>
              </b-form>
          </div>
      </b-card>

      <div id="contentDiv">
        <b-row cols="12" md="4" xl="4" no-gutters>
          <b-col cols="12" md="6" xl="6">
            <h4>Progress</h4>
            <p>Here should personal goals be displayed</p>
          </b-col>
          <b-col cols="12" md="6" xl="6">
            <h4>Workout</h4>
            <p>Here should a personal workout program, based on workout cards, be displayed</p>
          </b-col>
        </b-row>
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
                name: '',
                musclegroup: '',
                startdate: '',
                enddate: ''
            },
            show: true
        }
    },
            methods: {
                onSubmit(event) {
                    event.preventDefault()
                    alert(JSON.stringify(this.form))
                },
                onReset(event) {
                    event.preventDefault()
                    this.form.name = ''
                    this.form.musclegroup = ''

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

p {
    font-size: 16px;
    color: aliceblue;
}

h2 {
    color: #3088a0;
    text-align: center;
}

#contentDiv,
#formGoal {
    background-color: rgba(0, 0, 0, 0.5);
    color: #3088a0;
    text-align: center;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {}
</style>