<template>
  <div>
    <!-- Styled -->
    <div id="pictureForm">
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

    <!-- Plain mode -->
    <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
    <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file: null,
        file2: null
      }
    }
  }
</script>

<style scoped>
/* Desktop */
    #pictureForm {
        margin: 1%;
        margin-right: 37%;
        margin-left: 37%;
        margin-bottom: 5%;
        padding: 2%;
        background: rgba(0, 0, 0, 0.3);
        color: aliceblue;
    }
    .inputStyle {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 10px;
        width: 100%;
    }
    .submitBtn {
        width: 100%;
        border: 0;
        margin-top: 8px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        font-size: 18px;
    }
    h2 {
        color: #3088a0;
        text-align: center;
    }
    .link {
        text-align: center;
        background-color: transparent;
        color: rgb(255, 255, 255);
    }
    .card {
        text-align: center;
        width: 240px;
        margin: 10px;
        background: rgba(0, 0, 0, 0.4);
    }

    button {
        margin: 3px;
    }

/* Mobile */
@media (min-width: 360px) and (max-width: 600px) {
} 
    
/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {  
} 
</style>