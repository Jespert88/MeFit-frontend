<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info" id="TopNavbar">
    <b-navbar-brand href="#" class=".navbar-brand">MeFit</b-navbar-brand>

    <!-- Top navbar toggle button -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <!-- Nav items collapse container -->
    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">
            <router-link class="nav-link" to="/">
                <button class="navBtns">Home</button>
            </router-link>
        </b-nav-item>
        <b-nav-item href="#">
            <router-link class="nav-link" to="/dashboard">
                <button class="navBtns">Dashboard</button>
            </router-link>
        </b-nav-item>
        <b-nav-item href="#">
            <router-link class="nav-link" to="/" @click.native="logout">
                <button class="navBtns">Logout</button>
            </router-link>
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</div>
</template>

<script>
    export default {
        name: 'NavBar',

        data () {
            return {
                
            }
        },

        methods: {
            
        }
    }
</script>

<style scoped>
/* Desktop */
#TopNavbar {
    margin: 0px !important;
    padding: 0px !important;
    background: rgba(0, 0, 0, 0.5) !important;
}
.navBtns {
    border: 0;
    background-color: transparent;
    color: #fff;
}
.navBtns:hover {
    color: #a06efd;
  text-shadow:0px 0px 5px #a06efd;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.navbar-brand {
   padding: 10px;
   color: #fff;
   font-weight: bold;
}


/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
    #TopNavbar {
        padding: 5px !important;
        background: rgba(0, 0, 0, 0.5) !important;
        text-align: center;
    }
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    #TopNavbar {
        padding: 5px !important;
        background: rgba(0, 0, 0, 0.5) !important;
        text-align: center;
    }
} 
</style>