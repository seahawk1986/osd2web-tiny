<template>
  <v-container fluid>
    <v-col>
      <v-row class="d-flex justify-space-between align-center">
        <CurrentTime class="text-h3" />
        <div class="d-flex justify-center align-center">
          <v-icon color="grey-darken-3" icon="mdi-rewind" size="60" />
          <v-icon :color="props.isPlaying ? 'primary' : 'secondary'" :icon="props.isPlaying ? 'mdi-play' : 'mdi-pause'" size="60" />
          <v-icon color="grey-darken-3" icon="mdi-fast-forward" size="60" />
        </div>
        <v-badge :color="props.numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" :content="props.numPendingTimers" inline>
          <v-icon :color="props.numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" icon="mdi-timer-outline" size="60" />
        </v-badge>
        <v-badge color="warning" :content="props.numNewRecordings" inline>
          <v-icon :color="props.isRecording ? 'warning' : 'grey-darken-3'" icon="mdi-record-rec" size="60" />
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
</script>
