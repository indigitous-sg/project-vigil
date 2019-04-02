<template>

  <f7-page>
    
    

    <f7-navbar title="Project Vigil" sliding>
    
    </f7-navbar>

    <f7-block>
      <f7-list>
      <f7-list-item>
        <span>Notifications</span>
        <f7-toggle checked color="green"></f7-toggle>
      </f7-list-item>
      </f7-list>
    </f7-block>

    <!-- <f7-block-title>Calls</f7-block-title> -->
    
    <!-- iOS TabBar has icons, Material TabBar does not -->
    <f7-toolbar tabbar toolbar-bottom :labels="isiOS">
        <f7-link :icon-f7="isiOS ? 'home' : ''" text="Home" tab-link="#home" active></f7-link>
        <f7-link :icon-f7="isiOS ? 'calls' : ''" text="Calls" tab-link="#calls"></f7-link>
        <f7-link :icon-f7="isiOS ? 'archive' : ''" text="Archive" tab-link="#archive"></f7-link>
    </f7-toolbar>

    <f7-tabs>
      <f7-tab id="home" tab-active>
        <home-page />
      </f7-tab>
      <f7-tab id="calls">
        <calls-page />
      </f7-tab>
      <f7-tab id="archive">
        <archive-page />
      </f7-tab>
    </f7-tabs>

  </f7-page>
</template>

<script>
import Home from './Home';
import Calls from './Calls';
import Archive from './Archive';

export default {
  name: 'Tabs',
  components: {
    'home-page': Home,
    'calls-page': Calls,
    'archive-page': Archive
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
    }
  }
};
</script>
