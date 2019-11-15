<template>
<div>

     <!-- User not logged in -->
  <b-navbar toggleable="lg" type="dark" variant="dark" id="navBar" >
    <b-navbar-brand href="#" class=".navbar-brand">MeFit</b-navbar-brand>
    <!-- Top navbar toggle button -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <!-- Nav items collapse container -->
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->

      <b-navbar-nav class="ml-auto" v-if="!$auth.isAuthenticated && !$auth.loading">
        <!-- User not logged in links -->
            <router-link class="nav-link" to="/"> Home </router-link>
            <router-link class="nav-link" to="/about"> About </router-link>
            <router-link class="nav-link" to="/contactus"> Contact us </router-link>
            <router-link class="nav-link" to="#" @click.native="login"> Login </router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="$auth.isAuthenticated && !$auth.loading">
         <!-- User logged in links -->
        <b-nav-item-dropdown text="User" right  class="nav-link" v-if="loggedIn" style="margin: 0 !important; padding: 0 !important;">
            <b-dropdown-item>
                <router-link class="drop-link" to="/dashboard"> Dashboard </router-link>
            </b-dropdown-item>
            <b-dropdown-item class="drop-link"> 
              <router-link class="drop-link" to="#" @click.prevent="logout"> Logout </router-link>
            </b-dropdown-item>
        </b-nav-item-dropdown>
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
.navbar-brand {
   padding: 10px;
   color: #fff;
   font-weight: bold;
}
.nav-link {
    color: #fff !important;
}
/* Dropdown Links */
.drop-links {
    color: #000 !important;
}


/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
    #TopNavbar {
        padding: 10px !important;
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