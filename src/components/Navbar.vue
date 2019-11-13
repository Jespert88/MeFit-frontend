<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="navbar-brand" to="/">
           MeFit
        </router-link>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">

                <li class="nav-item" >
                    <router-link class="nav-link" to="/">
                        <button class="navBtns">Home</button>
                    </router-link>
                </li>

                <li class="nav-item" >
                    <router-link class="nav-link" to="/dashboard">
                        <button class="navBtns">Dashboard</button>
                    </router-link>
                </li>

                <li class="nav-item" >
                    <router-link class="nav-link" to="/profile">
                        <button class="navBtns">Profile</button>
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" to="/" @click.native="logout">
                        <button class="navBtns">Logout</button>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
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