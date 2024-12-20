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

export interface RecordingInterface {
  basename: string
  event: EventInterface
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

export interface TimerInterface {
  aux: string
  channel: {
    channelid: string
    channelname: string
    chanelnumber: number
    provider: string
  }
  day: number
  event: EventInterface
  expired: number
  file: string
  firstday: number
  flags: number
  id: number
  invpsmargin: number
  pending: number
  recording: number
  remote: string
  starttime: number
  stoptime: number
  weekdays: number
}

export interface CustomDataInterface {
  [key: string]: {
    color: string
    name: string
    value: string
    vcolor: string
  } []
}

export interface DiashowInterface {
  active: number
  title?: string
  filename?: string
  width?: number
  height?: number
  orientation?: number
  landscape?: number
}

export interface CommandInterface {
  [name: string]: {
    color: string
    command: string
  }
}

export interface SkinstateInterface {
  active: number
  // TODO: add optional entries
}

export const useAppStore = defineStore('app', () => {
  const CommandData: Ref<CommandInterface|null> = ref({})
  const CustomData: Ref<CustomDataInterface|null> = ref(null)
  const DiashowData: Ref<DiashowInterface|null> = ref(null)
  const LiveTvData: Ref<actualDataInterface|null> = ref(null)
  const ReplayControl: Ref<replayControlInterface|null> = ref(null)
  const ReplayData: Ref<ReplayInterface|null> = ref(null)
  const RecordingsData: Ref<RecordingInterface[]> = ref([])
  const SkinStateData: Ref<SkinstateInterface|null> = ref(null)
  const TimerData: Ref<TimerInterface[]> = ref([])
  const CurrentView: Ref<string> = ref('actual')

  return {
    CommandData,
    CustomData,
    DiashowData,
    LiveTvData,
    ReplayControl,
    ReplayData,
    RecordingsData,
    SkinStateData,
    TimerData,
    CurrentView,
  }
})
