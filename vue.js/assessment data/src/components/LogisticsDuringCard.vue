<template>
  <div class="col-xs-12 col-sm-6 col-md-6">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">During the Assessment</div>
      <q-card-section>
        <div class="text-bold q-pt-sm">Cell Phone Policy</div>
        <div>{{ school.logistics.cellPhonePolicy }}</div>
        <div class="text-bold q-pt-sm">Emergency Contact</div>
        <div>{{ school.logistics.howContactSchool }}</div>
        <div class="text-bold q-pt-sm">Possible Interruptions</div>
        <div>{{ school.logistics.scheduleEvents }}</div>
        <div class="text-bold q-pt-sm">Protocol for Emergency Situations</div>
        <div>{{ school.logistics.emergencyProtocolsProc }}</div>
        <div class="text-bold q-pt-sm">Restroom Breaks</div>
        <div>{{ school.logistics.restroomBreak }}</div>
        <div class="text-bold q-pt-sm">
          School Staff in Room / Handling Disruptive Students
        </div>
        <div>{{ school.logistics.teacherInRoom }}</div>
        <!-- div class="text-bold q-pt-sm">Certificates of Community Service</div>
          <div>{{ school.logistics.enpCommunityService }}</div -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      required: true,
    },
  },
}
</script>
