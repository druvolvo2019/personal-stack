<template>
  <q-card-section>
    <q-card flat bordered class="q-pa-md q-gutter-sm">
      <div>
        <q-input
          v-model="notes"
          :label="$t('notes')"
          outlined
          type="textarea"
        />
      </div>
      <div>
        <q-btn
          class="bg-positive"
          @click="sendEmail(true)"
          :disable="!notesEmpty"
          >{{ $t('sendEmailWithNotes') }}</q-btn
        ><q-btn class="bg-negative text-white" @click="sendEmail(false)">{{
          $t('sendEmailWithoutNotes')
        }}</q-btn>
      </div>
    </q-card>
  </q-card-section>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'SendEmailPlugin',
  emits: ['sendEmail'],
  props: {
    context: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const notes = ref('')
    const notesEmpty = computed(() => {
      return notes.value !== ''
    })
    const sendEmail = (withNotes) => {
      const result = {
        context: props.context,
        withNotes,
        notes: notes.value,
      }
      emit('sendEmail', result)
    }
    return {
      sendEmail,
      notes,
      notesEmpty,
    }
  },
}
</script>

<style></style>
