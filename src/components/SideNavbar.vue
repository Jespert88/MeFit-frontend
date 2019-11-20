<template>
<div>

    <!-- Sidebar Toggler button -->
    <button id="openSidenav" @click="openNav()"> &#9776; </button>
   
   <!-- Sidenavbar -->
    <div id="mySidenav" class="sidenav">
        <button class="closebtn" @click="closeNav()"> &times; </button>
        <ul class="list-group">
            <li class="nav-item">
                <router-link class="nav-link" to="/profile">
                    <button class="sideNavBtns" @click="closeNav()">Profile</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/useroverview">
                    <button class="sideNavBtns" @click="closeNav()">User overview</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/createexercise">
                    <button class="sideNavBtns" @click="closeNav()">Create Exercise</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/createworkout">
                    <button class="sideNavBtns" @click="closeNav()">Create Workout</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/createprogram">
                    <button class="sideNavBtns" @click="closeNav()">Create Program</button>
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
        openNav: function () {
            document.getElementById("mySidenav").style.width = "300px";
        },

        closeNav: function () {
            document.getElementById("mySidenav").style.width = "0px";
        }
    }
}
</script>

<style>
/* Desktop CSS */
.sidenav {
    height: 100%;
    width: 0;
    background: #326b7c;
    overflow-x: hidden;
    padding-top: 50px;
    position: fixed;
    z-index: 1;
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
#openSidenav {
    margin: 5%;
    height: 40px;
    width: 40px;
    border: 0;
    color: #fff;
    background: rgba(0, 0, 0, 0.5)
}
.closebtn {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 30px;
    border: 0;
    margin: 10px;
    background: transparent;
    color: #fff;
}
/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {

}
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {

}
</style>
