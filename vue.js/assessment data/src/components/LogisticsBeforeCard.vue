<template>
  <div class="col-xs-12 col-sm-6 col-md-6">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">Before the Assessment</div>
      <q-card-section>
          <div class="text-bold q-pt-sm">Team Meeting Location</div>
          <div>{{ school.logistics.whereToMeetTeam }}</div>
          <div class="text-bold q-pt-sm">Parking Location</div>
          <div>{{ school.logistics.schoolDirection }}</div>
          <div class="text-bold q-pt-sm">Special School Check-in Protocols</div>
          <div>{{ school.logistics.checkinProtocols }}</div>
          <div class="text-bold q-pt-sm">First Floor Or Elevator</div>
          <div>{{ school.logistics.firstFloorOrElevator }}</div>
          <div class="text-bold q-pt-sm">Unloading Testing Equipment Location</div>
          <div>{{ school.logistics.placeToUnloadEquipment }}</div>
           <div class="text-bold q-pt-sm">School Coordinator Location</div>
          <div>{{ school.logistics.whereToMeet }}</div>
          <div class="text-bold q-pt-sm">School Closings/Delays</div>
          <div>{{ school.logistics.announcedMethod }}</div>
          <div class="text-bold q-pt-sm">Recent Traumatic Events</div>
          <div>{{ school.logistics.traumaticEvent }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      required: true
    },
  },
}
</script>