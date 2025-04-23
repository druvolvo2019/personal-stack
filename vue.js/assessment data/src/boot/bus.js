import Vue from 'vue'

const bus = new Vue()

// original export default bus

export default async ({ Vue }) => {
    Vue.prototype.$bus = bus
  }
  