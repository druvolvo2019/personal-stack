import TemplateFn from './baseTemplate'
import LunchTimesCard from '../components/LunchTimesCard.vue' //'../components/LunchTimesCard.vue'

export default {
  title: 'Application/LunchTimesCard',
  component: LunchTimesCard
}

const Template = TemplateFn({
  components: { LunchTimesCard },
  template: `
  <div style="width: 500px;">
     <lunch-times-card 
     :lunchtimes="lunchtimes"
     /> 
  </div>
 `
})

export const NoData = Template({
  lunchtimes: []
})

export const OneLunch = Template({
  lunchtimes: [{ startTime: '11:30AM', endTime: '12:15PM' }]
})

export const TwoLunches = Template({
  lunchtimes: [
    { startTime: '11:30AM', endTime: '12:15PM' },
    { startTime: '12:15PM', endTime: '12:45PM' }
  ]
})

export const ThreeLunches = Template({
  lunchtimes: [
    { startTime: '11:30AM', endTime: '12:00PM' },
    { startTime: '12:00PM', endTime: '12:30PM' },
    { startTime: '12:30PM', endTime: '1:00PM' }
  ]
})

export const FourLunches = Template({
  lunchtimes: [
    { startTime: '11:30AM', endTime: '11:50AM' },
    { startTime: '11:50AM', endTime: '12:10PM' },
    { startTime: '12:10PM', endTime: '12:30PM' },
    { startTime: '12:30PM', endTime: '12:50PM' }
  ]
})

export const FiveLunches = Template({
  lunchtimes: [
    { startTime: '11:30AM', endTime: '11:50AM' },
    { startTime: '11:50AM', endTime: '12:10PM' },
    { startTime: '12:10PM', endTime: '12:30PM' },
    { startTime: '12:30PM', endTime: '12:50PM' },
    { startTime: '12:50PM', endTime: '1:10PM' }
  ]
})

export const MissingTimes = Template({
  lunchtimes: [
    { startTime: '11:30AM', endTime: '11:50AM' },
    { startTime: '', endTime: '12:10PM' },
    { startTime: '12:10PM', endTime: '' },
    { startTime: '12:30PM', endTime: '12:50PM' }
  ]
})
