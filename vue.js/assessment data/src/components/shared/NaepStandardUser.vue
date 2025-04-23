<template>
  <q-item>
    <q-item-section avatar>
      <q-icon :class="iconClass" :name="displayIcon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <span name="displayName"> {{ displayName }}</span
        >,
        <span name="displayPhone">{{ displayPhone }}</span>
      </q-item-label>
      <q-item-label name="title" caption>
        {{ title }}
      </q-item-label>
      <q-item-label
        v-if="someAreNull"
        name="someAreNullFlag"
        caption
        class="warning"
      >
        {{ someAreNullMessage }}
      </q-item-label>
    </q-item-section>
    <q-item-section v-if="editable" side>
      <q-icon name="las la-edit" />
    </q-item-section>
  </q-item>
</template>

<script>
function userTypeInfo(userType) {
  switch (userType) {
    case 'teacher':
      return {
        displayIcon: 'las la-chalkboard-teacher',
        iconClass: 'text-standard',
        title: 'Teacher',
        valid: true
      }
    case 'principal':
      return {
        displayIcon: 'las la-user-graduate',
        iconClass: 'text-standard',
        title: 'Principal',
        valid: true
      }
    case 'ac':
      return {
        displayIcon: 'las la-map',
        iconClass: 'text-standard',
        title: 'Assessment Coordinator',
        valid: true
      }
    case 'sc':
      return {
        displayIcon: 'las la-graduation-cap',
        iconClass: 'text-standard',
        title: 'School Coordinator',
        valid: true
      }
    case 'aa':
      return {
        displayIcon: 'las la-map',
        iconClass: 'text-standard',
        title: 'Assessment Assistant',
        valid: true
      }
    default:
      return {
        displayIcon: 'las la-skull-crossbones',
        iconClass: 'text-red',
        title: `Unknown user type ${userType}`,
        valid: false
      }
  }
}

export default {
  name: 'NaepStandardUser',
  props: {
    userType: {
      type: String,
      required: true,
      validator: v => userTypeInfo(v).valid
    },
    name: {
      type: String,
      default: null
    },
    telephone: {
      type: String,
      default: null
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ...userTypeInfo(this.userType)
    }
  },
  computed: {
    displayName() {
      return this.name || 'Name Is Missing'
    },
    displayPhone() {
      return this.telephone || '(000) 000-0000'
    },
    someAreNull() {
      return this.name === null || this.telephone === null
    },
    someAreNullMessage() {
      const values = ['name', 'telephone']
        .filter(x => this[x] === null)
        .join(' and ')
      if (values.length > 0) {
        return `${values} required!`
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.warning {
  color: red;
  font-style: italic;
  font-weight: bold;
}
</style>
