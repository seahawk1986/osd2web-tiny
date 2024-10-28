<template>
  <v-card
    :border="false"
    class="ma-0 pa-0"
    elevation="0"
    flat
    height="30vh"
    rounded="0"
    variant="flat"
    width="100%"
  >
    <v-card-title class="ma-0 pa-0 ga-0 text-h3">
      {{ starttime }}
      <v-divider opacity="0" :vertical="true" />
      {{ currentEventData.title }}
      <!-- ({{ currentEventData.starttime <= currentEventData.seen ? seen + '/' : '' }}{{ duration }}) -->
    </v-card-title>
    <v-card-text class="ma-0 pa-0 ga-0 text-h5">
      {{ currentEventData.shorttext }}
      <!-- <v-divider thickness="7" />
      {{ currentEventData.description }} -->
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

  import { EventInterface } from '@/stores/app'

  const props = defineProps<{
    currentEventData: EventInterface,
  }>()

  const starttime = computed(() => {
    const d = new Date(props.currentEventData.starttime * 1000)
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  })

  // function getDuration (timeDeltaSeconds: number): string {
  //   const hours = Math.trunc(timeDeltaSeconds / 3600).toString().padStart(2, '0')
  //   const minutes = Math.trunc(timeDeltaSeconds / 60).toString().padStart(2, '0')
  //   return `${hours}:${minutes}`
  // }

  // const seen = computed(() => {
  //   return getDuration(props.currentEventData.seen - props.currentEventData.starttime)
  // })

  // const duration = computed(() => {
  //   return getDuration(props.currentEventData.duration)
  // })
</script>
