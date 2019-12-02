<template>
<div id="mySidenav" class="sidenav">

  <b-navbar toggleable="lg" type="dark" variant="dark" id="SideNavbar">

    <!-- Top navbar toggle button -->
    <b-navbar-toggle target="nav-collapse1" id="toggleBtn"></b-navbar-toggle>
    <!-- Nav items collapse container -->
    <b-collapse id="nav-collapse1" is-nav>

      <b-navbar-nav class="ml-auto" >
           <ul class="list-group">
            <li class="nav-item">
                <router-link class="nav-link" to="/profile">
                    <b-button class="sideNavBtns" variant="outline-light" >Profile</b-button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/dashboard">
                     <b-button class="sideNavBtns" variant="outline-light" >Dashboard</b-button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/setgoal">
                    <b-button class="sideNavBtns" variant="outline-light" >Set Goal</b-button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/goalHistory">
                    <b-button class="sideNavBtns" variant="outline-light" >Goal Archive</b-button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && $auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createexercise">
                    <b-button class="sideNavBtns" variant="outline-light" >Create Exercise</b-button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && $auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createworkout">
                    <b-button class="sideNavBtns" variant="outline-light" >Create Workout</b-button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && $auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createprogram">
                    <b-button class="sideNavBtns" variant="outline-light" >Create Program</b-button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/viewexercises">
                    <b-button class="sideNavBtns" variant="outline-light" >Exercises</b-button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/viewworkouts">
                    <b-button class="sideNavBtns" variant="outline-light" >Workouts</b-button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/viewprograms">
                    <b-button class="sideNavBtns" variant="outline-light" >Programs</b-button>
                </router-link>
            </li>
        </ul>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

    

<script>
export default {
    name: "SideNavbar"
}
</script>

<style>
/* Desktop CSS */
#SideNavbar {
    margin: 0px !important;
    z-index: 1;
    background-color: #123e4b !important;
    max-height: 80%;
}
.list-group {
    list-style: none;
}
.sidenav {
    height: 100%;
    background:  #123e4b !important;
    padding-top: 8%;
    overflow-x: hidden;
    top: 0;
    left: 0;
    transition: 0.2s;
    min-width: 15%;
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

.nav-link {
    color: #fff !important;
    padding-top: 7%; 
}

/* Dropdown Links */

</style>
