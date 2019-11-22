<template>
  <div class  ="content">
    <b-container fluid>
        <b-row >
          <b-col cols="2" xm="2" md="2" xl="2">
            <SideNavbar/>
          </b-col>
          <b-col cols="10" xm="10" md="10" xl="10">
            <router-view id="routerView"/>
          </b-col>
        </b-row>
    </b-container>
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
#routerView {
  margin-top: 2%;
}
</style>
