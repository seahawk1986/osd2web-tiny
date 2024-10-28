<template>
  <v-container fluid>
    <v-col>
      <v-row class="d-flex justify-space-between align-center">
        <CurrentTime class="text-h3" />
        <v-icon :color="hasDolby ? 'warning' : 'grey-darken-3'" icon="mdi-audio-video" size="60" />
        <v-icon :color="hasMultiLang ? 'warning': 'grey-darken-3'" icon="mdi-soundbar" size="60" />
        <v-icon :color="hasTeletext ? 'warning' : 'grey-darken-3'" icon="mdi-text-box-outline" size="60" />
        <v-icon :color="isEncrypted ? 'warning' : 'grey-darken-3'" icon="mdi-key-outline" size="60" />
        <v-badge :color="props.numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" :content="props.numPendingTimers" inline>
          <v-icon :color="props.numPendingTimers > 0 ? 'warning' : 'grey-darken-3'" icon="mdi-timer-outline" size="60" />
        </v-badge>
        <v-badge color="warning" :content="props.numNewRecordings" inline>
          <v-icon :color="props.isRecording ? 'warning' : 'grey-darken-3'" icon="mdi-record-rec" size="60" />
        </v-badge>
      </v-row>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'
  const store = useAppStore()

  const props = defineProps<{
    isRecording: boolean,
    numNewRecordings: number,
    numPendingTimers: number,
  }>()

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
</script>
