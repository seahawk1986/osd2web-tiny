<template>
  <v-container fluid>
    <v-col>
      <v-row class="d-flex justify-space-between align-center">
        <CurrentTime class="text-h3" />
        <div class="d-flex justify-center align-center">
          <v-icon :color="rewindReplayColor" icon="mdi-rewind" size="60" />
          <v-icon :color="playReplayColor" :icon="props.isPlaying ? 'mdi-play' : 'mdi-pause'" size="60" />
          <v-icon :color="forwardReplayColor" icon="mdi-fast-forward" size="60" />
        </div>
        <v-badge :color="props.numPendingTimers > 0 ? 'warning' : inactiveColor" :content="props.numPendingTimers" inline>
          <v-icon :color="props.numPendingTimers > 0 ? 'warning' : inactiveColor" icon="mdi-timer-outline" size="60" />
        </v-badge>
        <v-badge color="warning" :content="props.numNewRecordings" inline>
          <v-icon :color="props.isRecording ? 'warning' : inactiveColor" icon="mdi-record-rec" size="60" />
        </v-badge>
        <!-- {{ store.CurrentView }} -->
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'
  const store = useAppStore()

  const props = defineProps<{
    isPlaying: boolean,
    isRecording: boolean,
    numNewRecordings: number,
    numPendingTimers: number,
  }>()

  const inactiveColor = 'grey-darken-3'

  const playReplayColor = computed(() => {
    const isPlaying = store.ReplayControl?.play
    const isNormalSpeed = store.ReplayControl?.speed === -1
    if (!isNormalSpeed) {
      return 'grey-darken-3'
    } else if (!isPlaying) {
      return 'secondary'
    }
    return 'primary'
  })

  const forwardReplayColor = computed(() => {
    const isPlaying = store.ReplayControl?.play
    const speed = store.ReplayControl?.speed
    const isForward = store.ReplayControl?.forward === 1
    if (isPlaying && isForward) {
      // fast forward
      switch (speed) {
        case -1:
          return 'grey-darken-3'
        case 1:
          return 'secondary'
        case 2:
          return 'primary-darken-1'
        case 3:
          return 'primary'
      }
    }
    return 'grey-darken-3'
  })

  const rewindReplayColor = computed(() => {
    const isPlaying = store.ReplayControl?.play
    const speed = store.ReplayControl?.speed
    const isBackward = store.ReplayControl?.forward === 0
    if (!isPlaying && isBackward) {
      switch (speed) {
        case -1:
          return 'grey-darken-3'
        case 1:
          return 'secondary'
        case 2:
          return 'primary-darken-1'
        case 3:
          return 'primary'
      }
    }
    return 'grey-darken-3'
  })
</script>
