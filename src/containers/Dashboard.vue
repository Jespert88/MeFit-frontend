<template>
  <div>

  <div class="row no-gutters">
    <div class="col-sm-12 col-md-4 col-xl-2">
      <SideNavbar />
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
    components: {
        SideNavbar
    }
}
</script>

<style>

</style>