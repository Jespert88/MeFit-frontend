<template>
<div>

  <b-navbar toggleable="lg" type="dark" variant="dark" id="navBar">
    <!-- Logo -->
    <b-navbar-brand to="/home" class=".navbar-brand">
      <img src= '../assets/rsz_mefitlogo.png' alt="Kitten" id="logo"  >
    </b-navbar-brand>

    <!-- Top navbar toggle button -->
    <b-navbar-toggle target="nav-collapse" id="toggleBtn"></b-navbar-toggle>
    <!-- Nav items collapse container -->
    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" >
        <!-- User not logged in links -->
        <router-link class="nav-link" to="/home"> Home </router-link>
          <router-link class="nav-link" to="/about"> About </router-link>
          <router-link class="nav-link" to="/contactus"> Contact us </router-link>
              <router-link class="nav-link" to="/help"> Help </router-link>

              <b-nav-item-dropdown v-if="loggedIn && !$auth.loading"  text="User" right  class="nav-link" no-caret style="margin: 0 !important; padding: 0 !important;">
                    <template v-slot:button-content>
                      <img :src="$auth.user.picture"  fluid  class="rounded-circle img-fluid profile-picture" id="logo" >
                    </template>
                    <b-dropdown-item>
                        <router-link class="drop-link" to="/dashboard"> Dashboard </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="drop-link"> 
                      <router-link class="drop-link" to="" @click.native="logout"> Logout </router-link>
                    </b-dropdown-item>
              </b-nav-item-dropdown>
            <router-link  v-if="!loggedIn" class="nav-link" to="" @click.native="login"> Login </router-link>
      </b-navbar-nav>


    </b-collapse>
  </b-navbar>

</div>
</template>

<script>
export default {
 data() {
        return {
            loggedIn : false
        }
    },
   name: "NavBar",
   created (){
     this.checkIfLoggedIn()
   },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    checkIfLoggedIn (){
      if(localStorage.profileId){
        this.loggedIn = true
      }else{
        this.loggedIn = false
      }
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>

/* Desktop */
#navBar {
    margin: 0px !important;
    z-index: 1;
    background-color: #123e4b !important;
    max-height: 80%;
}
 #logo {
  padding: 5px;
  max-height: 45px !important;
  max-width: 150px !important;
} 
.nav-link {
    color: #fff !important;
    padding-top: 7%; 
}
.nav-link:hover {
    color: #79f1f1 !important;
}
/* Dropdown Links */
.drop-links {
    color: #000 !important;
} 
</style>