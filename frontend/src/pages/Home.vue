<template>
  <div>
    <!-- <f7-navbar sliding title="Home"></f7-navbar> -->
    <f7-block-title>{{ title }}</f7-block-title>
    <f7-block inner>
      New calls are shown on the 'calls' page, and they are color coded based on their status:
      <p> Red = new call, Yellow = pending. </p>
    </f7-block>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Home'
    };
  }
};
</script>
