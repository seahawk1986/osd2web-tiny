<template>
  <v-app>
    <router-view />
    <!-- <v-main> -->
    <!-- </v-main> -->
    <!-- {{ curView }} -->
  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import WebSocketClient from '@/websocket'
  const store = useAppStore()

  // const LOGOUT = {
  //   event: 'logout',
  //   object: {},
  // }

  const isActive: Ref<boolean|null> = ref(null)
  const isOnlyView: Ref<boolean> = ref(true)
  const tftPrio: Ref<string|null> = ref(null)
  const ErrorMessage: Ref<string|null> = ref(null)

  interface roleChangeInterface {
    role: string
    havelogos: number
  }

  interface curViewInterface {
    curview?: string
  }

  // interface skinStateInterface {
  //   attached: number
  // }

  interface DataMessage {
    event: string
    object: any
  }

  let wsConnection: WebSocketClient

  onMounted(() => {
    try {
      wsConnection = new WebSocketClient({
        url: `ws://${location.hostname}:4444`, // 'ws://' + location.host, // TODO: use location based url
        protocol: 'osd2vdr',
        autoReconnectInterval: 10000,
        onopen: () => {
          if (isActive.value === null) { // Dann wurde es beim Schliessen auf null gesetzt
            wsConnection.send({
              event: 'login',
              object: {
                type: (isOnlyView.value ? 1 : 0),
                tftprio: (tftPrio.value ? parseInt(tftPrio.value[1], 10) : 100),
              },
            })
          }
        },
        onclose: () => {
          isActive.value = null // auf null setzten, dass ein neues login aufgerufen wird
        },
        onmessage: msg => {
          try {
            const data: DataMessage = JSON.parse(msg.data.replace())
            // console.log('got data: ', data)
            switch (data.event) {
              case 'rolechange':
                {
                  const rcd: roleChangeInterface = data.object
                  isActive.value = rcd.role === 'active'
                }
                break
              case 'curView':
                {
                  const cvd: curViewInterface = data.object
                  store.CurrentView = cvd.curview || 'actual'
                }
                break
              case 'skinstate':
                console.log('got skinstate: ', data.object)
                store.SkinStateData = data.object
                break
              case 'commands':
                console.log('got commands: ', data.object)
                store.CommandData = data.object
                break

              case 'timers':
                // console.log('got timers: ', data.object)
                store.TimerData = data.object
                break
              case 'recordings':
                // console.log('got recordings: ', data.object)
                store.RecordingsData = data.object
                break
              case 'diashow':
                console.log('got diashow: ', data.object)
                store.DiashowData = data.object
                break
              case 'replay':
                // console.log('got replay: ', data.object)
                store.ReplayData = data.object
                break
              case 'replaycontrol':
                // console.log('got replaycontrol: ', data.object)
                store.ReplayControl = data.object
                break
              case 'actual':
                // console.log('got actual (current tv): ', data.object)
                store.LiveTvData = data.object
                break
              case 'customdata':
                console.log('got customdata: ', data.object)
                store.CustomData = data.object
                break
              default:
                console.log('Warning: unknown event type: ', data.event)
            }
            // this.$emit(data.value.event, data.value.object)
          } catch (e) {
            console.log(e)
          }
        },
      })
    } catch {
      ErrorMessage.value = 'Your browser does not suport Websockets!'
    }
  })
//
</script>
