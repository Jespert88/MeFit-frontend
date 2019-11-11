<template>
  <div>

  <div class="row no-gutters">
    <div class="col-sm-12 col-md-4 col-xl-2">
      
      <button @click="sendMessage()" class="btn btn-info">Send Child A Message</button>
      <SideNavbar :parentmessage="parentmessage"/>
    
    </div>
    <div class="col-sm-12 col-md-8 col-xl-9">
      
   

      <router-view />
    </div>
  </div>


  </div>
</template>

<script>
import SideNavbar from '../components/SideNavbar.vue'
export default {
    data () {
      return {
         parentmessage: ''
      }
    },
    components: {
        SideNavbar
    },
    methods: {
      sendMessage() {
        console.log("parent function response")
        this.parentmessage = !this.parentmessage
      }
    }
    
}
</script>

<style>

</style>