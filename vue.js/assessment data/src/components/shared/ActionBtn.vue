<template>
  <q-btn
    :name="name_"
    dense
    flat
    round
    :icon="icon_"
    :color="iconColor"
    :aria-label="hint_"
    @click="onClick"
    ><q-tooltip>
      {{ hint_ }}
    </q-tooltip>
  </q-btn>
</template>

<script>
const calcHint = (text, hint, message) => {
  if (hint) {
    return hint
  } else {
    return message ? text + ' ' + message : text
  }
}

const actionTypes = {
  edit: {
    name: 'editButton',
    icon: 'las la-edit',
    color: 'primary',
    hint(hint, message) {
      return calcHint('Click to edit', hint, message)
    }
  },
  barcode: {
    name: 'editBarcodeButton',
    icon: 'las la-barcode',
    color: 'primary',
    hint(hint, message) {
      return calcHint('Click to edit the barcode', hint, message)
    }
  },
  delete: {
    name: 'deleteButton',
    icon: 'las la-trash',
    color: 'primary',
    hint(hint, message) {
      return calcHint('Click to delete', hint, message)
    }
  }
}

const getActionType = type => {
  const defaultActionType = {
    name: 'unassignedButton',
    icon: 'las la-skull-crossbones',
    color: 'negative',
    hint(_) {
      return `This button has an unknown action type ${type}`
    }
  }
  return actionTypes[type] || defaultActionType
}

export const validActions = Object.keys(actionTypes).map(x => x)

export default {
  name: 'ActionBtn',
  props: {
    actionType: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: undefined
    },
    hint: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      name_: this.name || getActionType(this.actionType).name,
      icon_: getActionType(this.actionType).icon,
      hint_: getActionType(this.actionType).hint(this.hint, this.message),
      iconColor: getActionType(this.actionType).color
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>
