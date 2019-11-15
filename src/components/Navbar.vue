<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="dark" id="TopNavbar">
    <b-navbar-brand href="#" class=".navbar-brand">MeFit</b-navbar-brand>

    <!-- Top navbar toggle button -->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <!-- Nav items collapse container -->
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item>
            <router-link class="nav-link" to="/"> Home </router-link>
        </b-nav-item>
        <b-nav-item> 
            <router-link class="nav-link" to="/dashboard"> Dashboard </router-link>
        </b-nav-item>

        <button   v-if="!$auth.isAuthenticated && !$auth.loading"  @click="login">Log in</button>
        <!-- Dropdown menu -->
        <b-nav-item-dropdown v-if="$auth.isAuthenticated && !$auth.loading" text="User" right  class="nav-link">
            <b-dropdown-item>
                <router-link class="drop-link" to="/dashboard"> Dashboard </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
                <button  @click.prevent="logout" class="navBtns">Logout</button>
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