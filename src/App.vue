<<<<<<< HEAD
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
}

=======
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content{
    flex: 1;
}

>>>>>>> 49e9fde3fa5858da57ccebc94ec965d5cbc05e60
</style>