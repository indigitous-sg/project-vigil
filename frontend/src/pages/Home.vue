<template>
  <div>
    <!-- <f7-navbar sliding title="Home"></f7-navbar> -->
    <f7-block-title>{{ title }}</f7-block-title>
    <f7-block inner>
      <p>CALLS tab shows 'new' and 'pending' calls. </p>
      <p>ARCHIVE tab shows calls that have been attended to.</p>
    </f7-block>

    <f7-block-title>Settings</f7-block-title>
    <f7-block inner>
      <f7-list>
        <f7-list-item>
          <span>Notifications</span>
          <f7-toggle color="green" :checked="notificationToggle" @toggle:change="notificationState"></f7-toggle>
        </f7-list-item>
      </f7-list>
    </f7-block>
  </div>
</template>

<style>
p  {
  /* font-family: "Verdana"; */
  font-size: 120%;
}
</style>

<script>
export default {
  name: "Home",
  methods: {
    notificationState (toggle) {
      this.$emit('sendNotificationToParent', toggle)
    }
  },
  data() {
    return {
      title: "Home",
      notificationToggle: true
    };
  }
};
</script>
