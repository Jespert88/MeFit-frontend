<template>
  <div>

    <div v-if="parentmessage" class="card-text alert alert-warning" v-html="parentmessage"></div>

    <!-- SIDENAVBAR -->
    <aside v-if="parentmessage" v-bind="hej()">
      <div class="container-fluid" id="main">
          <div class="row row-offcanvas row-offcanvas-left">
              <div class="col-md-12 col-lg-12 sidebar-offcanvas bg-light pl-0" id="sidebar" role="navigation">
                  <ul class="nav flex-column sticky-top pl-0 pt-5 mt-3">
                      <li class="nav-item" >
                          <router-link class="nav-link" to="/profile">
                              <button class="sideNavBtns">Profile</button>
                          </router-link>
                      </li>
                      <li class="nav-item" >
                          <router-link class="nav-link" to="/createexercise">
                              <button class="sideNavBtns">Create Exercise</button>
                          </router-link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </aside>

  
  </div>
</template>

<script>
export default {

 
  props: 
    ['parentmessage'],
  
  methods: {
    hej: function() {
      console.log("hej")
    }
  }

}
</script>

<style>

/* Desktop CSS */
#sidebar {
    height: 100vh;
    background-color: rgb(130, 216, 128) !important;
}
.sideNavBtns {
    text-align: center;
    border: 0;
    width: 100%;
    padding: 5px;
    background-color: rgb(69, 109, 68);
    color: #fff;
}
.sideNavBtns:hover {
    background-color: rgb(107, 161, 106);
}

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
  .row-offcanvas-left .sidebar-offcanvas {
    left: -100%;
  }
  .row-offcanvas-left.active {
    left: 100%;
    margin-left: -6px;
  }

  .sidebar-offcanvas {
    width: 45%;
  }
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  .row-offcanvas {
        position: relative;
        -webkit-transition: all 0.25s ease-out;
        -moz-transition: all 0.25s ease-out;
        transition: all 0.25s ease-out;
    }

    .row-offcanvas-left .sidebar-offcanvas {
        left: -33%;
    }

    .row-offcanvas-left.active {
        left: 33%;
        margin-left: -6px;
    }

    .sidebar-offcanvas {
        position: absolute;
        top: 0;
        width: 33%;
        height: 100%;
    }
} 
</style>