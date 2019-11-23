<template>
    <div id="mySidenav" class="sidenav">
        <ul class="list-group">
            <li class="nav-item">
                <router-link class="nav-link" to="/profile">
                    <button class="sideNavBtns" >Profile</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/dashboard">
                    <button class="sideNavBtns" >User overview</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/setgoal">
                    <button class="sideNavBtns" >Set Goal</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/goalHistory">
                    <button class="sideNavBtns" >Goal Archive</button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && $auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createexercise">
                    <button class="sideNavBtns" >Create Exercise</button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && $auth.isContributor"  class="nav-item">
                <router-link class="nav-link" to="/createworkout">
                    <button class="sideNavBtns" >Create Workout</button>
                </router-link>
            </li>
            <li v-if="$auth.isAuthenticated && !$auth.loading && $auth.isContributor"  class="nav-item">
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
    width: 200px;
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
