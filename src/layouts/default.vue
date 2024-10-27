<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <v-footer>
      <CurrentTime class="text-h3" />
      <v-divider color="background" thickness="20" vertical />
      <div v-if="store.ReplayControl?.active === 0">
        <span>
          <!-- <v-img height="60" src="@/assets/dd.svg" /> -->
          <v-icon icom="mdi-volume-variant-off" size="60" />
          <v-icon icon="mdi-radio" size="60" />
          <v-icon icon="mdi-reorder-horizontal" size="60" />
          <v-icon icon="mdi-key" size="60" />
          <v-icon icon="mdi-record-rec" size="60" />
        </span>
      </div>
      <div v-else-if="store.ReplayControl?.active === 1">
        <v-icon color="grey-darken-3" icon="mdi-rewind" size="60" />
        <v-icon :icon="isPlaying ? 'mdi-play' : 'mdi-pause'" size="60" />
        <v-icon color="grey-darken-3" icon="mdi-fast-forward" size="60" />
      </div>
      <div v-else>
        Waiting for Plugin data...
        <v-progress-circular :indeterminate="true" size="64" />
      </div>
      <!-- {{ store.CurrentView }} -->
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  const store = useAppStore()

  const isPlaying = computed(() => {
    return store.ReplayControl?.play === 1
  })
</script>
