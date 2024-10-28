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
      <LiveTvFooter
        v-if="!activeReplay"
        :is-recording="isRecording"
        :num-new-recordings="numNewRecordings"
        :num-pending-timers="numPendingTimers"
      />
      <ReplayFooter
        v-else
        :is-playing="isPlaying"
        :is-recording="isRecording"
        :num-new-recordings="numNewRecordings"
        :num-pending-timers="numPendingTimers"
      />
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  const store = useAppStore()

  const isPlaying = computed(() => {
    return store.ReplayControl?.play === 1
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
