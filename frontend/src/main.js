/* eslint-disable no-unused-vars */
// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js';

// Import App Component
import App from './app';

// Import Firestore Stuff
//import VueFire from 'vuefire'
//import Vuefire from '../node_modules/vuefire/dist/vuefire'
import {firestorePlugin} from 'vuefire'

import firebase from 'firebase/app'
import 'firebase/firestore'

// Import Firestore credentials
import firebaseConfig from './components/firebaseConfig'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const baseApp = new Vue({
  el: '#app',
  template: '<app/>',
  // Register App Component
  components: {
    app: App
  }
});

// Init Firestore
//Vue.use(VueFire)
Vue.use(firestorePlugin)

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()