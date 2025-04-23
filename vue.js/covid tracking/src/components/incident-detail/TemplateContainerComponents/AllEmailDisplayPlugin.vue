<template>
  <div class="row">
    <div class="col">
      <email-display
        :send-type="$t('toField')"
        :contact="primaryContact"
      ></email-display>
    </div>
    <div class="col">
      <email-display
        v-for="cc in carbonCopies"
        :key="cc.id"
        :send-type="$t('ccField')"
        :contact="cc"
      ></email-display>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import EmailDisplay from './EmailDisplay.vue'

export default {
  name: 'AllEmailDisplayPlugin',
  components: {
    EmailDisplay,
  },
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
  setup(props) {
    const primaryContact = computed(() => {
      return props.context.primaryContact
    })

    const carbonCopies = computed(() => {
      return props.context.carbonCopies
    })

    return {
      primaryContact,
      carbonCopies,
    }
  },
}
/*
  <q-item>
    <q-list bordered dense padding separator>
      <email-display
        :send-type="$t('toField')"
        :contact="primaryContact"
      ></email-display>
      <email-display
        v-for="cc in carbonCopies"
        :key="cc.id"
        :send-type="$t('ccField')"
        :contact="cc"
      ></email-display>
    </q-list>
  </q-item>
*/
</script>

<style></style>
