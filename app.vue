<template>
  <div>
    <button @click="openPopup">Open Popup</button>
  </div>
</template>

<script>

export default {
  methods: {
    openPopup() {
      
      // Replace with your URL
      let url = `https://connect.smartcar.com/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=read_vehicle_info&redirect_uri=${process.env.REDIRECT_URI}/.netlify/functions/oauth-callback`;
      let windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
      window.open(url, '_blank', windowFeatures);
    }
  }
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
