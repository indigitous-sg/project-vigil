<template>
  <f7-page>
    <f7-navbar title="Project Vigil" sliding></f7-navbar>

    <!-- <f7-block-title>Calls</f7-block-title> -->

    <!-- iOS TabBar has icons, Material TabBar does not -->
    <f7-toolbar tabbar toolbar-bottom :labels="isiOS">
      <f7-link :icon-f7="isiOS ? 'home' : ''" text="Home" tab-link="#home" active></f7-link>
      <f7-link :icon-f7="isiOS ? 'calls' : ''" text="Calls" tab-link="#calls"></f7-link>
      <f7-link :icon-f7="isiOS ? 'archive' : ''" text="Archive" tab-link="#archive"></f7-link>
    </f7-toolbar>

    <f7-tabs>
      <f7-tab id="home" tab-active>
        <home-page v-on:sendNotificationToParent="onChildClick"/>
      </f7-tab>
      <f7-tab id="calls">
        <calls-page :callPageType="unresolvedCalls"/>
      </f7-tab>
      <f7-tab id="archive">
        <calls-page :callPageType="resolvedCalls"/>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
import Home from "./Home";
import Calls from "./Calls";
import { db } from "../main";

export default {
  name: "Tabs",
  components: {
    "home-page": Home,
    "calls-page": Calls,
  },
  computed: {
    isiOS() {
      return this.$theme.ios;
    },
    isMaterial() {
      return this.$theme.material;
    }
  },
  data() {
    return {
      isBottom: true,
      resolvedCalls: "RESOLVED",
      unresolvedCalls: "^(NEW|PENDING)$",
      showNotifications: true
    };
  },
  methods: {
    onChildClick(value) {
      this.showNotifications = value;
    },
    // Try creating notification, this is done at the app level and listens for new call
    showNotificationFull: function () {
      const self = this;

      // Create toast
      if (!self.notificationFull) {
        self.notificationFull = self.$f7.notification.create({
          icon: '<i class="icon icon-f7"></i>',
          title: "New Call",
          titleRightText: "now",
          subtitle: "Notification",
          text: "New call received!",
          closeTimeout: 3000
        });
      }

      // Open it
      if (this.showNotifications) {
        self.notificationFull.open();
      }
    }
  },
  mounted() {
    db.collection("calls").where("CallStatus", "==", "NEW").onSnapshot(snap => {
      snap.docChanges().forEach(change => {
        console.log(change);
        if (change.type === "added") {
          console.log("New call added!", change.doc.data());
          this.showNotificationFull();
        }
      });
    });
  }
};
</script>
