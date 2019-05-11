<template>
  <div>
    <f7-card v-for="(call, idx) in calls" :key="idx">
      <!-- <f7-card-content v-if="call.CallStatus !== 'RESOLVED'" :padding="false"> -->
      <f7-card-content v-if="call.CallStatus.match(callPageType)" :padding="false">
        <div v-bind:class="getCallStatusColor(call)" :style="{height: '60px'}">
          <f7-card-header text-color="white" class="display-block">
            Call from {{ call.InitialInfo.Caller }}
            <br>
            <small :style="{opacity: 0.7}">{{ call.Timestamp }}</small>
          </f7-card-header>
          <!-- <f7-link
            card-close
            color="white"
            class="card-opened-fade-in"
            :style="{position: 'absolute', right: '15px', top: '15px'}"
            icon-f7="close_round_fill"
          ></f7-link>-->
        </div>
        <div class="card-content-padding">
          <p
            v-if="typeof call.Transcription !== 'undefined'"
          >Transcription (beta): {{ call.Transcription.TranscriptionText }}</p>
          <f7-link
            v-if="typeof call.VoiceMessage !== 'undefined'"
            :href="call.VoiceMessage.RecordingUrl"
            external
          >Click to listen to voicemail</f7-link>
          <p
            v-if="typeof call.CallerNumProvided !== 'undefined'"
          >Number provided to call back: {{ call.CallerNumProvided }}</p>
        </div>

        <f7-card-footer>
          <f7-link v-if="call.CallStatus.match('NEW')" @click="changeCallStatus(call, 'PENDING')">Mark as Pending</f7-link>
          <f7-link v-if="call.CallStatus.match('PENDING')" @click="changeCallStatus(call, 'RESOLVED')">Mark as Resolved</f7-link>
          <f7-link v-if="call.CallStatus.match('RESOLVED')" @click="changeCallStatus(call, 'DELETED')">Delete</f7-link>
        </f7-card-footer>
      </f7-card-content>
    </f7-card>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  name: "Calls",
  props: {
    // type, required and default are optional, you can reduce it to 'options: Object'
    callPageType: { type: String, required: false }
  },
  data() {
    return {
      title: "Calls Page",
      calls: [],
      CallerNumProvided: ""
    };
  },
  firestore() {
    return {
      calls: db.collection('calls').orderBy("Timestamp")
    };
  },
  methods: {
    getCallStatusColor(call) {
      return {
        "bg-color-red": call.CallStatus === "NEW",
        "bg-color-orange": call.CallStatus === "PENDING",
        "bg-color-green": call.CallStatus === "RESOLVED"
      };
    },
    changeCallStatus: function(call, toStatus) {
      console.log(call.id);
        db.collection('calls').doc(call.id).update({
          CallStatus:toStatus,
        })
    },
  }
};
</script>
