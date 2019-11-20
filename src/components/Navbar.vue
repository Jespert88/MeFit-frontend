<template>
<div>

  <b-navbar toggleable="lg" type="dark" variant="dark" id="navBar">
    <!-- Logo -->
    <b-navbar-brand href="/" class=".navbar-brand">
      <img src= '../assets/rsz_22logo.png' alt="Kitten" id="logo">
    </b-navbar-brand>

    <!-- Top navbar toggle button -->
    <b-navbar-toggle target="nav-collapse" id="toggleBtn"></b-navbar-toggle>
    <!-- Nav items collapse container -->
    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="!$auth.isAuthenticated && !$auth.loading">
        <!-- User not logged in links -->
            <router-link class="nav-link" to="/"> Home </router-link>
            <router-link class="nav-link" to="/about"> About </router-link>
            <router-link class="nav-link" to="/contactus"> Contact us </router-link>
            <router-link class="nav-link" to="" @click.native="login"> Login </router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="$auth.isAuthenticated && !$auth.loading">
         <!-- User logged in links -->
        <b-nav-item-dropdown text="User" right  class="nav-link" style="margin: 0 !important; padding: 0 !important;">
            <b-dropdown-item>
                <router-link class="drop-link" to="/dashboard"> Dashboard </router-link>
            </b-dropdown-item>
            <b-dropdown-item class="drop-link"> 
              <router-link class="drop-link" to="" @click.native="logout"> Logout </router-link>
            </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
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
    background-color: #123e4b !important;
}
#logo {
  padding: 5px;
  max-width: 100px !important;
}
.nav-link {
    color: #fff !important;
}
.nav-link:hover {
    color: #79f1f1 !important;
    text-shadow: 1px 1px 10px #27809b
}
/* Dropdown Links */
.drop-links {
    color: #000 !important;
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
    #navBar {
        padding: 10px !important;
        background: rgba(0, 0, 0, 0.5) !important;
        text-align: center;
    }
    #toggleBtn {
      padding: 5px;
    }
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
    #navBar {
        padding: 10px !important;
        background: rgba(0, 0, 0, 0.5) !important;
        text-align: center;
    }
    #toggleBtn {
      padding: 5px;
    }
} 
</style>