<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Main View -->
    <f7-view url="/" :main="true"></f7-view>
  </f7-app>
</template>

<script>
import routes from "./routes";
import { db } from "./main";

export default {
  data() {
    return {
      f7params: {
        theme: "auto",
        routes,
        id: "io.framework7.testapp"
      },
    };
  },
  name: "App",
  methods: {
    handleBackButton() {
      // NOTE: The back button will behave differently depending on circumstance
      // If the side panel is open, close it
      if (document.querySelector(".panel-left.panel-active")) {
        // This will do nothing when the split-view is open
        return this.$f7.panel.close();
      }
      // Close modals
      // @TODO How to handle modals we shouldn't close like a login-screen?
      if (document.querySelector(".modal-in")) {
        return this.$f7.popover.close();
      }
      // If we have a back button, we want it to go back
      if (this.$f7.views.main.router.history.length > 1) {
        return this.$f7.views.main.router.back();
      }
      // Default to closing the app
      return window.navigator.app.exitApp();
    },
  },
  computed: {
    isiOS() {
      return this.$theme.ios;
    }
  },
  created() {
    document.addEventListener("backbutton", this.handleBackButton);
    document.addEventListener("deviceready", function(){

    var storeToken  = (token) => {
      const createdAt = new Date();
      db.collection('registration_tokens').add({
        token, createdAt
      })
    }

    // Adding code to get FCM token based on https://docs.monaca.io/en/tutorials/firebase/
    window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
        console.log('Got Token: ' + token);
        storeToken(token);
    }, function(error) {
        console.error(error);
    });

    // Get notified when a token is refreshed
    window.FirebasePlugin.onTokenRefresh(function(token) {
        // save this server-side and use it to push notifications to this device
        console.log("Refresh to get new token: " + token);
        storeToken(token);
    }, function(error) {
        alert(error);
    });

    // // Get notified when the user opens a notification
    // window.FirebasePlugin.onNotificationOpen(function(notification) {
    //     console.log(JSON.stringify(notification));
    //     alert("The notification is open!");
    // }, function(error) {
    //     console.error(error);
    // });    
}, false);
  },
};
</script>