<template>
  <v-sheet>
    {{ currentTimeString }}
  </v-sheet>
</template>

<script setup lang="ts">
  import { useDate } from 'vuetify'

  const date = useDate()

  const currentTime = ref(new Date())
  const updateCurrentTime = () => {
    currentTime.value = new Date()
  }
  const updateTimeInterval = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval)
  })

  const currentTimeString = computed(() => {
    return date.format(currentTime.value, 'fullTime24h')
    // const hours = currentTime.value.getHours().toString().padStart(2, '0')
    // const minutes = currentTime.value.getMinutes().toString().padStart(2, '0')
    // const seconds = currentTime.value.getSeconds().toString().padStart(2, '0')
    // return `${hours}:${minutes}:${seconds}`
  })
</script>
