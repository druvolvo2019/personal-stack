<template>
  <div>
    <q-card v-if="shouldShow" flat bordered class="q-mt-md q-pa-md">
      <div class="text-h6">{{ $t('closeContactBtn') }}</div>
      <div>
        {{ $t('toggleContactCompleted') }}
        <div>
          <q-toggle
            :modelValue="contactCompleted"
            @update:modelValue="onUserSelectContactCompleted"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CloseContactToggle',
  props: {
    shouldShow: {
      type: Boolean,
      default: true,
    },
    contactCompleted: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['contactCompletedToggle'],
  setup(props, { emit }) {
    const onUserSelectContactCompleted = (v) => {
      // if (props.contactCompleted !== v) {
      const result = {
        closed: v,
      }
      emit('contactCompletedToggle', result)
    }
    // }
    return {
      onUserSelectContactCompleted,
    }
  },
}
</script>

<style></style>
