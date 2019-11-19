<<<<<<< HEAD
<template>
  <div>

  <b-row no-gutters>
    <b-col cols="12" md="1" xl="1">
      <SideNavbar :parentmessage="parentmessage"/>
    </b-col>
    <b-col cols="12" md="10" xl="10">
      <router-view id="routerView"/>
    </b-col>
    <b-col cols="12" md="1" xl="1"></b-col>
  </b-row>



 <!--  <div class="row no-gutters">
    <div class="col-sm-12 col-md-4 col-xl-2"> -->

     <!--  <button @click="toggleSidebar()" class="btn btn-info">Send Child A Message</button> -->
     <!--  <SideNavbar :parentmessage="parentmessage"/> -->

   <!--  
    </div>
    <div class="col-sm-12 col-md-8 col-xl-9">
      <router-view />
    </div>
  </div> -->


  </div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'
export default {

    data () {
      return {
         parentmessage: ''
      }
    },
    components: {
        SideNavbar
    },
    methods: {

      toggleSidebar() {
        console.log("Hi from Dashboard")
        this.parentmessage = !this.parentmessage
      }
 

    }

      
}
</script>

<style>

#routerView {
  margin-top: 2%;
}

/* burger */

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform .6s cubic-bezier(.165,.84,.44,1);
}

.burger-bar {
  background-color: #130f40;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(.8);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active .burger-button {
  transform: rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: #fff;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg)
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg)
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
  #routerView {
    margin-top: 0%;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  #routerView {
  margin-top: 5%;
}
}
</style>
=======
<template>
<div class="content">

  <b-row no-gutters>
    <!-- Sidenavbar column -->
      <b-col cols="12" md="1" xl="1">
          <SideNavbar :parentmessage="parentmessage" />
      </b-col>

      <!-- main view grid for dashboard -->
      <b-col cols="12" md="10" xl="10">
          <!-- This is for the sidenavbar routing. -->
          <router-view id="routerView" />
      </b-col>
  </b-row>

</div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'

export default {

    data() {
        return {
            parentmessage: '',
            user: false,
            admin: false
        }
    },
    components: {
        SideNavbar
    },
    methods: {

        toggleSidebar() {
            console.log("Hi from Dashboard")
            this.parentmessage = !this.parentmessage
        }

    }

}
</script>

<style>
#routerView {
    margin-top: 2%;
}

/* burger */

.hidden {
    visibility: hidden;
}

button {
    cursor: pointer;
}

/* remove blue outline */
button:focus {
    outline: 0;
}

.burger-button {
    position: relative;
    height: 30px;
    width: 32px;
    display: block;
    z-index: 999;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    pointer-events: all;
    transition: transform .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar {
    background-color: #130f40;
    position: absolute;
    top: 50%;
    right: 6px;
    left: 6px;
    height: 2px;
    width: auto;
    margin-top: -1px;
    transition: transform .6s cubic-bezier(.165, .84, .44, 1), opacity .3s cubic-bezier(.165, .84, .44, 1), background-color .6s cubic-bezier(.165, .84, .44, 1);
}

.burger-bar--1 {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
}

.burger-bar--2 {
    transform-origin: 100% 50%;
    transform: scaleX(.8);
}

.burger-button:hover .burger-bar--2 {
    transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
    transform: scaleX(1);
}

.burger-bar--3 {
    transform: translateY(6px);
}

#burger.active .burger-button {
    transform: rotate(-180deg);
}

#burger.active .burger-bar {
    background-color: #fff;
}

#burger.active .burger-bar--1 {
    transform: rotate(45deg)
}

#burger.active .burger-bar--2 {
    opacity: 0;
}

#burger.active .burger-bar--3 {
    transform: rotate(-45deg)
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
    #routerView {
        margin-top: 0%;
    }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    #routerView {
        margin-top: 5%;
    }
}
</style>
>>>>>>> 49e9fde3fa5858da57ccebc94ec965d5cbc05e60
