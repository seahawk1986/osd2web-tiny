<template>
  <v-app>
    <v-dialog
      v-model="isInitializing"
      fullscreen
    >
      <v-container
        class="fill-height ma-0 pa-0 ga-0"
        fluid
        no-gutters
      >
        <v-row
          align="center"
          justify="start"
          no-gutters
        >
          <v-col
            cols="12"
            md="4"
            no-gutters
            sm="8"
          >
            <v-sheet class="d-flex justify-center align-center ma-0 pa-0 ga-0" height="100vh" width="100vw">
              <v-container>
                <v-row align="center">
                  <v-col class="d-flex justify-center" cols="12">
                    <CurrentTime class="text-h1" />
                  </v-col>
                  <v-col class="d-flex justify-center text-h2" cols="12">
                    Waiting for osd2web plugin …
                  </v-col>
                  <v-col class="d-flex justify-center" cols="12">
                    <v-progress-circular color="primary" :indeterminate="true" size="64" />
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <v-main>
      <router-view />
    </v-main>
    <v-footer v-if="!isInitializing" height="14vh">
      <v-container v-if="!activeReplay" fluid>
        <v-col>
          <v-row class="d-flex justify-space-between align-center">
            <CurrentTime class="text-h3" />
            <v-icon :color="hasDolby ? 'warning' : 'grey-darken-3'" icon="mdi-audio-video" size="60" />
            <v-icon :color="hasMultiLang ? 'warning': 'grey-darken-3'" icon="mdi-soundbar" size="60" />
            <v-icon :color="hasTeletext ? 'warning' : 'grey-darken-3'" icon="mdi-text-box-outline" size="60" />
            <v-icon :color="isEncrypted ? 'warning' : 'grey-darken-3'" icon="mdi-key-outline" size="60" />
            <v-badge :color="numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" :content="numPendingTimers" inline>
              <v-icon :color="numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" icon="mdi-timer-outline" size="60" />
            </v-badge>
            <v-badge color="warning" :content="numNewRecordings" inline>
              <v-icon :color="isRecording ? 'warning' : 'grey-darken-3'" icon="mdi-record-rec" size="60" />
            </v-badge>
          </v-row>
        </v-col>
      </v-container>
      <v-container v-else fluid>
        <v-col>
          <v-row class="d-flex justify-space-between align-center">
            <CurrentTime class="text-h3" />
            <div class="d-flex justify-center align-center">
              <v-icon color="grey-darken-3" icon="mdi-rewind" size="60" />
              <v-icon :color="isPlaying ? 'primary' : 'secondary'" :icon="isPlaying ? 'mdi-play' : 'mdi-pause'" size="60" />
              <v-icon color="grey-darken-3" icon="mdi-fast-forward" size="60" />
            </div>
            <v-badge :color="numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" :content="numPendingTimers" inline>
              <v-icon :color="numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" icon="mdi-timer-outline" size="60" />
            </v-badge>
            <v-badge color="warning" :content="numNewRecordings" inline>
              <v-icon :color="isRecording ? 'warning' : 'grey-darken-3'" icon="mdi-record-rec" size="60" />
            </v-badge>
              <!-- {{ store.CurrentView }} -->
          </v-row>
        </v-col>
      </v-container>
    </v-footer>

  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  const store = useAppStore()

  const isPlaying = computed(() => {
    return store.ReplayControl?.play === 1
  })

  const hasDolby = computed(() => {
    return store.LiveTvData?.streaminfo.vtx === 1
  })

  const hasMultiLang = computed(() => {
    return store.LiveTvData?.streaminfo.dolbidigital === 1
  })

  const hasTeletext = computed(() => {
    return store.LiveTvData?.streaminfo.vtx === 1
  })

  const isEncrypted = computed(() => {
    return store.LiveTvData?.streaminfo.encrypted === 1
  })

  const isRecording = computed(() => {
    return false
  })

  const activeReplay = computed(() => {
    return store.ReplayControl?.active === 1
  })

  const isInitializing = computed(() => {
    return store.LiveTvData === null
  })

  const numNewRecordings = computed(() => {
    let counter: number = 0
    store.RecordingsData.forEach(recording => {
      recording.isnew === 1 && counter++
      console.log('counter has value: ', counter)
    })
    return counter
  })

  const numPendingTimers = computed(() => {
    let counter: number = 0
    store.TimerData.forEach(timer => {
      (timer.pending > 0 || timer.recording > 0) && counter++
    })
    return counter
  })
</script>
