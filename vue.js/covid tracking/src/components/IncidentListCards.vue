<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="incidentContact in paginatedContacts"
      :key="incidentContact.fldincidentid"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 flex"
    >
      <IncidentCard
        :incidentContact="incidentContact"
        @selectIncidentCard="selectIncidentCard"
      ></IncidentCard>
    </div>
    <div
      v-if="showPagination"
      class="q-pa-lg flex flex-center"
      style="width: 100%"
    >
      <q-pagination
        v-model="current"
        :max="pages"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
        boundary-numbers
        :max-pages="6"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import IncidentCard from './IncidentCard.vue'

export default {
  name: 'IncidentListCards',
  components: {
    IncidentCard,
  },
  props: {
    incidentContacts: {
      type: Array,
      required: true,
    },
    cardsPerPage: {
      type: Number,
      default: 12,
    },
  },
  emits: ['setAdminTab', 'selectIncidentCard'],
  setup(props, { emit }) {
    const setAdminTab = (tabName) => {
      emit('setAdminTab', tabName)
    }
    const selectIncidentCard = (incidentContact) => {
      emit('selectIncidentCard', incidentContact)
    }

    const current = ref(1)

    const paginatedContacts = computed(() => {
      const startIndex = (current.value - 1) * props.cardsPerPage
      const endIndex = startIndex + props.cardsPerPage
      return props.incidentContacts.slice(startIndex, endIndex)
    })

    const pages = computed(() => {
      return Math.ceil(props.incidentContacts.length / props.cardsPerPage)
    })

    const showPagination = computed(() => {
      return props.incidentContacts.length > props.cardsPerPage
    })

    setAdminTab('user')

    return {
      selectIncidentCard,
      setAdminTab,
      current,
      paginatedContacts,
      pages,
      showPagination,
    }
  },
}
</script>

<style lang="scss" scoped>
.my-selectable-card {
  width: 100%;
}

.my-selectable-card:hover {
  background-color: lighten(#26a69a, 50);
  border-width: 1px;
  border-color: #1976d2;
}
.wordbreak {
  background-color: white;
}
</style>
