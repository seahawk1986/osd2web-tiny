// Utilities
import { defineStore } from 'pinia'

export interface ComponentInterface {
  description: string
  language: string
  stream: number
  type: number
}

export interface EventInterface {
  channelid: string
  components: ComponentInterface[]
  description: string
  duration: number
  endtime: number
  eventid: number
  hastimer: number
  isrunning: number
  parentalrating: number
  runnningstatus: number
  seen: number
  shorttext: string
  starttime: number
  timermatch: string
  title: string
  vps: number
}

export interface actualDataInterface {
  channel: {
    channelid: string
    channelname: string
    channelnumber: number
    provider: string
  }
  following: EventInterface
  present: EventInterface
  streaminfo: {
    dolbidigital: number
    encrypted: number
    multilang: number
    radio: number
    videoheight: number
    videowidth: number
    vtx: number
  }
}

export interface replayControlInterface {
  active: number
  current?: number
  forward?: number
  play?: number
  speed?: number
  total?: number
}

export interface ReplayInterface {
  active: number
  basename?: string
  event?: EventInterface
  filename?: string
  filesizemb?: number
  folder?: string
  hasmarks?: number
  images?: string[]
  info?: {
    aux: string
    channelid: string
    channelname: string
    description: string
    framespersecond: number
  }
  isedited?: number
  isnew?: number
  lengthinseconds?: number
  name?: string
  start?: number
  title?: string
}

export const useAppStore = defineStore('app', () => {
  const LiveTvData: Ref<actualDataInterface|null> = ref(null)
  const ReplayControl: Ref<replayControlInterface|null> = ref(null)
  const ReplayData: Ref<ReplayInterface|null> = ref(null)
  const CurrentView: Ref<string> = ref('actual')

  return {
    LiveTvData,
    ReplayControl,
    ReplayData,
    CurrentView,
  }
})