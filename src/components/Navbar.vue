<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">MeFit</b-navbar-brand>

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
.navbar {
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
}
.navBtns {
    border: 0;
    background-color: transparent;
    color: #fff;
}
.navbar-brand {
   padding: 5px;
   color: #fff;
   font-weight: bold;
}
.navbar-brand:hover {
   color: rgba(255, 255, 255, 0.555);
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
} 
</style>