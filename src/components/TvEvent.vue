<template>
  <v-card
    :border="false"
    class="ma-0 pa-0 overflow-y-auto"
    elevation="0"
    flat
    height="30vh"
    rounded="0"
    variant="flat"
    width="100%"
  >
    <v-banner class="ma-0 pa-0 ga-0 text-display-medium" sticky>
      {{ starttime }}
      <v-divider opacity="0" thickness="25" :vertical="true" />
      {{ currentEventData.title }}
    </v-banner>
    <v-card-text class="text-display-small hidden-sm-and-down">
      <v-sheet
        v-if="
          currentEventData.shorttext?.length > 0 &&
          currentEventData.description.length > 0
        "
        class="ma-0 pa-0 ga-0 text-h5 overflow-y-auto"
        height="100%"
      >
        <!-- both shorttext and description -->
        {{ currentEventData.shorttext }} <br />
        <div class="hidden-sm-and-down">
          {{ currentEventData.description }}
        </div>
      </v-sheet>
      <v-sheet
        v-else-if="
          currentEventData.shorttext?.length > 0 &&
          currentEventData.description.length === 0
        "
        class="ma-0 pa-0 ga-0 text-display-medium"
        height="100%"
      >
        <!-- only shorttext, no description -->
        {{ currentEventData.shorttext }}
      </v-sheet>
      <v-sheet
        v-else
        class="ma-0 pa-0 ga-0 overflow-y-auto hidden-sm-and-down"
        height="100%"
      >
        <!-- not shorttext, only description -->
        {{ currentEventData.description }}
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type EventInterface } from "@/stores/app";

const props = defineProps<{
  currentEventData: EventInterface;
}>();

const starttime = computed(() => {
  const d = new Date(props.currentEventData.starttime * 1000);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
});

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
