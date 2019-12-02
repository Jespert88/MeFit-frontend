<template>
    <div id="app">
            <Navbar />
            <router-view />
            <Footer/>       
    </div>
</template>

<script>
     
    import Navbar from './components/Navbar.vue'
    import Footer from './components/Footer.vue'
   
    export default {
      name: 'app',
      components: {
        Navbar,
        Footer
    },

    data() {
        return {
            
        }
    },

    methods: {
       
    } 
}
</script>

<style>
#app{
     min-height: 100vh;
}

.content {
        flex :1; 
        padding-bottom: 5%;
     }
</style>