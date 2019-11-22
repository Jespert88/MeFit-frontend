<template>
  <div class ="content">
    <b-container  fluid>
        <b-row  >
          <b-col cols="2" xm="2" md="2" xl="2" >
            <SideNavbar :parentmessage="parentmessage"/>
          </b-col>
          <b-col cols="10" xm="10" md="10" xl="10" >
            <router-view id="routerView"/>
          </b-col>
        </b-row>
    </b-container>


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
