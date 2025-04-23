<template>
  <q-card flat bordered class="q-pa-md">
    <div>Call picked up by {{ context.primaryContact.title }}?</div>
    <div class="row q-gutter-md q-mt-xs">
      <q-btn @click="onClick('PHONE_CONTACT')">Yes</q-btn>
      <q-btn @click="onClick('VOICEMAIL')">No, Leave Voicemail</q-btn>
      <q-btn @click="onClick('WRONG_NUMBER')">No, Wrong Number</q-btn>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'PhoneReachedPlugin',
  emits: ['call-handled'],
  props: {
    context: {
      type: Object,
      required: true,
    },
    scriptLine: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {
      onClick(event) {
        emit('call-handled', { event, contact: props.context.primaryContact })
      },
    }
  },
}
</script>

<style></style>
