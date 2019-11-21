<template>
<div>

    <!-- Sidebar Toggler button -->
    <!-- <button id="openSidenav" @click="openNav()"> &#9776; </button> -->
   
   <!-- Sidenavbar -->
    <div id="mySidenav" class="sidenav">
        <!-- <button class="closebtn" > &times; </button> -->
        <ul class="list-group">
            <li class="nav-item">
                <router-link class="nav-link" to="/profile">
                    <button class="sideNavBtns" >Profile</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/useroverview">
                    <button class="sideNavBtns" >User overview</button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && !$auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createexercise">
                    <button class="sideNavBtns" >Create Exercise</button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && !$auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createworkout">
                    <button class="sideNavBtns" >Create Workout</button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && !$auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createprogram">
                    <button class="sideNavBtns" >Create Program</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/viewexercises">
                    <button class="sideNavBtns" >Exercises</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/viewworkouts">
                    <button class="sideNavBtns" >Workouts</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/viewprograms">
                    <button class="sideNavBtns" >Programs</button>
                </router-link>
            </li>
        </ul>
    </div>

</div>
</template>

<script>
export default {
    name: "SideNavbar",
    props: ['parentmessage'],

    methods: {
    }
}
</script>

<style>
/* Desktop CSS */
.sidenav {
    height: 100%;
    background:  #123e4b !important;
    padding-top: 8%;
    position: fixed;
    overflow-x: hidden;
    /* z-index: -1; */
    top: 0;
    left: 0;
    transition: 0.2s;
    width: 300px;
}
/* Sidenavbar ul container */
.sideNavBtns {
    margin-top: 10px;
    padding: 5px;
    width: 100%;
    border: 0;
    border-radius: 5px;
}
.sideNavBtns:hover {
    color: #fff;
    background: rgba(0, 0, 0, 0.5)
}


/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
.sidenav {
    height: 100%;
    background:  #123e4b !important;
    padding-top: 8%;
    position: fixed;
    overflow-x: hidden;
    z-index: 1;
    top: 0;
    left: 0;
    transition: 0.2s;
    width: 130px;
}
}
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {

}
</style>
