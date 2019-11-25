<template>
    <div id="mySidenav" class="sidenav">
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
    </div>
</template>

<script>
export default {
    name: "SideNavbar"
}
</script>

<style>
/* Desktop CSS */
.list-group {
    list-style: none;
}
.sidenav {
    height: 100%;
    background:  #123e4b !important;
    padding-top: 8%;
    position: fixed;
    overflow-x: hidden;
    top: 0;
    left: 0;
    transition: 0.2s;
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
</style>
