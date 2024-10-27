<template>
  <v-card>
    {{ store.LiveTvData?.channel.channelnumber }} {{ store.LiveTvData?.channel.channelname }}
    <!-- ({{ store.LiveTvData?.channel.provider }}) -->
    <!-- TODO: add channellogo -->
  </v-card>

  <v-card>
    {{ store.LiveTvData?.present.title }}
  </v-card>

  <v-card>
    {{ store.LiveTvData?.following.title }}
  </v-card>

</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
//
</script>
