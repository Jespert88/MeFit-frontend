<template>
  
         <!-- <p class="loading-text">{{text}}</p>
        <div class="loading-circle"></div>

        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner> 
         -->
                          

    <div class="loading-screen">
        <b-containe center>
            <b-col>
                <b-row>
                    <p class="loading-text">Loading</p>
                </b-row>
                <b-row>
                    <div class="loading-circle"></div>
                </b-row>
            </b-col>
        </b-containe>
        </div>
</template>    


<script>
export default {
  data() {
    return {
      text: 'Loading',
      dark: false,
      classes: null,
      loading: false,
      background: null,
      customLoader: null
    }
  },
  computed:{
    bc(){
      return this.background || (this.dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)')
    }
  },
}
</script>
<style scoped>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-circle {
  text-align: right;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid transparent;
  border-left-color: #ababab;
  animation: circleanimation .45s linear infinite
  
}
.loading-text {
  margin-top: 15px;
  font-size: 12px;
  text-align: center;
}
@keyframes circleanimation {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
