<template>
  <div>
    
      <f7-card expandable v-for="(call, idx) in calls" :key="idx" >
        <f7-card-content :padding="false">
        <div v-bind:class="getCallStatus(call)" :style="{height: '60px'}">
          <f7-card-header text-color="white" class="display-block">
            Call from {{ call.InitialInfo.Caller }}
            <br />
            <small :style="{opacity: 0.7}"> {{ call.Timestamp }}</small>
          </f7-card-header>
          <f7-link card-close color="white" class="card-opened-fade-in" :style="{position: 'absolute', right: '15px', top: '15px'}" icon-f7="close_round_fill"></f7-link>
        </div>
        <div class="card-content-padding">
          <p v-if="typeof call.Transcription !== 'undefined'"> Transcription (beta): {{ call.Transcription.TranscriptionText }} </p>
          <f7-link v-if="typeof call.VoiceMessage !== 'undefined'" :href=call.VoiceMessage.RecordingUrl external> Click to listen to voicemail </f7-link>
          <p v-if="typeof call.CallerNumProvided !== 'undefined'"> Call back at: {{ call.CallerNumProvided }} </p>
        </div>
        </f7-card-content>
      </f7-card>
  </div>

</template>

<script>

  import { db } from '../main'

  export default {
    name: 'Calls',
    data () {
      return {
        title: 'Calls Page', 
        calls: [],
        CallerNumProvided: ''
      };
    },
    methods: {
      getCallStatus(call){
        return {
          'bg-color-red' : call.CallStatus === 'NEW',
          'bg-color-orange' : call.CallStatus === 'PENDING'
        }
      }
    },
    firestore () {
      return {
        calls: db.collection('calls')
      }
    }
  };
</script>
