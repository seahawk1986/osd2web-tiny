<template>
  <v-card
    v-if="store.DiashowData?.active === 1"
  >
    <v-card-title>
      {{ store.DiashowData?.title }}
    </v-card-title>
    <v-card-text class="ma-0 ga-0 pa-0">
      <v-img class="align-self-center" :src="`http://localhost:4444/${store.DiashowData?.filename}`" transition="v-slide-x" /> <!-- TODO: this needs to point to the osd2web port only if the skin is not serverd by osd2web -->
    </v-card-text>
  </v-card>
  <v-card
    v-else-if="store.ReplayControl?.active === 0"
    :border="false"
    class="ma-0 pa-0"
    elevation="0"
    height="85vh"
    rounded="0"
    variant="flat"
    width="100%"
  >
    <v-card-title v-if="store.LiveTvData" class="pa-2">
      <v-sheet class="pa-2 ma-2 text-h2">
        {{ store.LiveTvData.channel.channelnumber }}
        <v-divider :vertical="true" />
        {{ store.LiveTvData.channel.channelname }}
      </v-sheet>
      <v-progress-linear
        v-if="store.LiveTvData.present.starttime <= store.LiveTvData.present.seen"
        color="primary"
        height="20"
        :max="store.LiveTvData.present.duration"
        :model-value="(store.LiveTvData.present.endtime - store.LiveTvData.present.seen)"
      />
    </v-card-title>
    <v-card-text>
      <v-card
        v-if="store.LiveTvData"
        :border="false"
        class="ma-0 pa-0"
        elevation="0"
        rounded="0"
        variant="flat"
        width="100%"
      >
        <TvEvent :current-event-data="store.LiveTvData?.present" />
        <TvEvent :current-event-data="store.LiveTvData?.following" />

      </v-card>
    </v-card-text>
    <!-- TODO: add channellogo -->
  </v-card>
  <v-card
    v-else-if="store.ReplayControl?.active === 1"
    :border="false"
    class="ma-0 pa-0"
    elevation="0"
    height="85vh"
    rounded="0"
    variant="flat"
    width="100%"
  >
    <v-card-title class="pa-2">
      <v-sheet class="pa-2 ma-2 text-h2">
        {{ store.ReplayData?.basename }}
      </v-sheet>
      <v-progress-linear
        color="primary"
        height="20"
        :max="store.ReplayControl?.total"
        :model-value="store.ReplayControl?.current"
      />
    </v-card-title>
    <v-card-text class="text-h3 pa-2 ma-2" height="50vh">
      {{ store.ReplayData?.event?.shorttext }}
    </v-card-text>

    <v-card-text class="text-h5 pa-2 ma-2">
      <!-- {{ progress }}/{{ duration }} -->
      <div class="overflow-auto" height="50vh">
        {{ store.ReplayData?.info?.description }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import TvEvent from '@/components/TvEvent.vue'
  import { useAppStore } from '@/stores/app'
  const store = useAppStore()

  // function getDuration (timeDeltaSeconds: number): string {
  //   const hours = Math.trunc(timeDeltaSeconds / 3600)
  //   const hoursString = hours.toString().padStart(2, '0')
  //   const minutes = Math.trunc((timeDeltaSeconds - (3600 * hours)) / 60)
  //   const seconds = (timeDeltaSeconds % 60)
  //   const secondsString = seconds.toString().padStart(2, '0')
  //   const minutesString = minutes.toString().padStart(2, '0')
  //   return `${hoursString}:${minutesString}:${secondsString}`
  // }

  // const duration = computed(() => {
  //   if (store.ReplayControl?.total) {
  //     return getDuration(store.ReplayControl?.total)
  //   } else {
  //     return 'unknown'
  //   }
  // })

  // const progress = computed(() => {
  //   if (store.ReplayControl?.current) {
  //     return getDuration(store.ReplayControl.current)
  //   } else {
  //     return 'unknown'
  //   }
  // })
</script>

<style>

</style>
