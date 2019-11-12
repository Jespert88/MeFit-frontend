<template>
<div>

    <button id="openSidenav" @click="openNav()"> &#9776; open </button>
   <!--  <span style="font-size:30px;cursor:pointer" @click="openNav()">&#9776; open</span> -->

    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>

        <ul>
            <li class="nav-item">
                <router-link class="nav-link" to="/profile">
                    <button class="sideNavBtns">Profile</button>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/createexercise">
                    <button class="sideNavBtns">Create Exercise</button>
                </router-link>
            </li>
        </ul>
    </div>

    <!-- <div v-if="parentmessage" class="card-text alert alert-warning" v-html="parentmessage"></div> -->

    <!-- SIDENAVBAR -->
    <!-- <aside v-if="parentmessage" v-bind="hej()" id="mySidenav" class="sidenav">
        <div class="container-fluid" id="main">
            <div class="row row-offcanvas row-offcanvas-left">
                <div class="col-md-12 col-lg-12 sidebar-offcanvas bg-light pl-0" id="sidebar" role="navigation">
                    <ul class="nav flex-column sticky-top pl-0 pt-5 mt-3">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/profile">
                                <button class="sideNavBtns">Profile</button>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/createexercise">
                                <button class="sideNavBtns">Create Exercise</button>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside> -->

</div>
</template>

<script>
export default {

    props: ['parentmessage'],

    methods: {
        
        openNav: function () {
            document.getElementById("mySidenav").style.width = "250px";
        },

        closeNav: function () {
            document.getElementById("mySidenav").style.width = "0px";
        }

    }

}
</script>

<style>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}
.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}
.sidenav a:hover {
    color: #f1f1f1;
}


#openSidenav {
  border: 0;
  color: #fff;
  padding: 5px;
  width: 100px;
  background: rgba(0, 0, 0, 0.5)
}
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}

/* Desktop CSS */
/* #sidebar {
    height: 100vh;
    background-color: rgb(130, 216, 128) !important;
}
.sideNavBtns {
    text-align: center;
    border: 0;
    width: 100%;
    padding: 5px;
    background-color: rgb(69, 109, 68);
    color: #fff;
}
.sideNavBtns:hover {
    background-color: rgb(107, 161, 106);
} */

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
    /* .row-offcanvas-left .sidebar-offcanvas {
    left: -100%;
  }
  .row-offcanvas-left.active {
    left: 100%;
    margin-left: -6px;
  }

  .sidebar-offcanvas {
    width: 45%;
  } */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    /* .row-offcanvas {
        position: relative;
        -webkit-transition: all 0.25s ease-out;
        -moz-transition: all 0.25s ease-out;
        transition: all 0.25s ease-out;
    }

    .row-offcanvas-left .sidebar-offcanvas {
        left: -33%;
    }

    .row-offcanvas-left.active {
        left: 33%;
        margin-left: -6px;
    }

    .sidebar-offcanvas {
        position: absolute;
        top: 0;
        width: 33%;
        height: 100%;
    } */
}
</style>
