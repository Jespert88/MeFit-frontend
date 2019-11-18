<template>
<div>

    <!-- Admin / Contributor Dashboard -->
    <div v-if="admin">
        <b-row no-gutters>
          <!-- Sidenavbar column -->
            <b-col cols="12" md="1" xl="1">
                <SideNavbar :parentmessage="parentmessage" />
            </b-col>

            <!-- main view grid for dashboard -->
            <b-col cols="12" md="10" xl="10">
                <!-- This is for the sidenavbar routing. -->
                <h1> Admin dashboard view now showing</h1>
                <router-view id="routerView" />
            </b-col>
        </b-row>
    </div>

    <!-- User Dashboard -->
    <div v-if="user">
        <b-row no-gutters>
          <!-- Sidenavbar column -->
            <b-col cols="12" md="1" xl="1">
                <SideNavbar :parentmessage="parentmessage" />
            </b-col>

            <!-- main view grid for dashboard -->
            <b-col cols="12" md="10" xl="10">
                <!-- This is for the sidenavbar routing. -->
                <h1> User dashboard view now showing, remove this h1 later..</h1>
                <router-view id="routerView" />

                <!-- Full gridsystem for user overview in dashboard -->
                <b-col cols="12" md="12" xl="12">

                    <!-- Showing progress and calender -->
                    <b-row no-gutters>
                        <b-col cols="12" md="6" xl="6"><Progress /></b-col>
                        <b-col cols="12" md="6" xl="6"><Calender /></b-col>
                    </b-row>

                    <!-- Programs and Workouts will show here -->
                    <b-row no-gutters>
                        <b-col cols="12" md="12" xl="12">
                            <b-row no-gutters>

                                <b-col cols="12" md="6" xl="6">
                                    <div style="text-align:center;">
                                        <b-button v-b-toggle="'collapse-1'" class="m-1" variant="success">Show workouts</b-button>
                                    </div>
                                    <!-- Workouts -->
                                    <b-collapse id="collapse-1">
                                        <WorkoutCard />
                                    </b-collapse>
                                </b-col>

                                <b-col cols="12" md="6" xl="6">
                                    <div style="text-align:center;">
                                        <b-button v-b-toggle="'collapse-2'" class="m-1" variant="success">Show programs</b-button>
                                    </div>
                                    <!-- Programs -->
                                    <b-collapse id="collapse-2">
                                        <h1>Showing the current program for the user.</h1>
                                    </b-collapse>
                                </b-col>

                            </b-row>
                        </b-col>
                    </b-row>

                </b-col>
            </b-col>
            <b-col cols="12" md="1" xl="1"></b-col>
        </b-row>
    </div>

</div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'
import Calender from '../components/Calender.vue'
import Progress from '../components/Progress.vue'
import WorkoutCard from '../components/WorkoutCard.vue'

export default {

    data() {
        return {
            parentmessage: '',
            user: false,
            admin: false
        }
    },
    components: {
        SideNavbar,
        Calender,
        Progress,
        WorkoutCard

    },

    created: function() {
      this.user = true;
      this.admin = false;
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
