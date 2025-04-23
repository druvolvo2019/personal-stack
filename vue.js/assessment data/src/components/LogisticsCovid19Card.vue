<template>
  <div class="col-xs-12 col-sm-6 col-md-6">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">COVID-19 Policies</div>
      <q-card-section>
        <div class="text-bold q-pt-sm">School Specific COVID Protocols</div>
        <div>{{ school.logistics.covidSchoolProtocols }}</div>

        <div class="text-bold q-pt-sm">Vaccination Requirements</div>
        <div>{{ school.logistics.covidNeedVaccinated }}</div>

        <div class="text-bold q-pt-sm">Negative Test Requirements</div>
        <div>{{ school.logistics.covidRequiredTestNegative }}</div>

        <div class="text-bold q-pt-sm">Handling Visibly Ill Students</div>
        <div>{{ school.logistics.covidHowToHandleSickStudents }}</div>

        <div class="text-bold q-pt-sm">Mask Requirements For Staff</div>
        <div>{{ school.logistics.covidStaffWearMasks }}</div>

        <div class="text-bold q-pt-sm">Mask Requirement For Students</div>
        <div>{{ school.logistics.covidStudentWearMasks }}</div>

        <div class="text-bold q-pt-sm">Social Distancing Requirements</div>
        <div>{{ school.logistics.covidSocialDistancing }}</div>

        <div class="text-bold q-pt-sm">Protocols For Answering Questions</div>
        <div>{{ school.logistics.covidAnswerQuestionProtocols }}</div>

        <!-- div class="text-bold q-pt-sm">Sanitizing</div>
        <div>{{ school.logistics.covidSanitizing }}</div -->
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
