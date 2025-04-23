<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <q-card bordered flat square class="fit">
      <div class="text-subtitle1 q-px-md q-pt-md">Assessment Notes</div>
      <q-card-section>
        <q-editor
          ref="editor"
          :value="content"
          min-height="5rem"
          height="30rem"
          :readonly="!canEdit"
          :toolbar="[
            ['left', 'center', 'right'],
            ['bold', 'italic', 'strike', 'underline'],
            ['unordered', 'ordered', 'outdent', 'indent'],
            ['undo', 'redo'],
            ['link']
          ]"
          @input="valueChanged"
        />
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            label="Save"
            color="primary"
            outline
            class="q-ml-sm"
            :disable="!dirty"
            @click="saveNotes()"
          />

          <q-btn
            class="q-ml-sm"
            outline
            color="secondary"
            label="Edit"
            :disable="disableEdit"
            @click="editClick()"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content:
        this.notes === null || typeof this.notes === 'undefined'
          ? ''
          : this.notes,
      dirty: false,
      canEdit: false,
      disableEdit: true
      //isReadOnly: false
    }
  },

  /* beforeDestroy() {
        if (this.dirty) {
    // tell our parent that we have been modified and need saving
        this.$emit('saveNotes', this.content)
      }
  }, */
  computed: {
    enableEdit() {
      var haveContent = this.content.length > 0
      var dbg = `saving dirty=${this.dirty} haveCon:${
        this.haveContent
      } ro:${!this.canEdit} editbtn.dis:${this.dirty ||
        (!this.haveContent && !this.dirty)}`
      //   this.content = dbg
      //console.log(dbg)
      // only enable if you have content and not dirty
      return haveContent && !this.dirty
    }
  },
  
  mounted() {
    this.dirty = false
    this.canEdit = this.content.length === 0 // || (!this.dirty && this.content.length === 0)
    var haveContent = this.content.length > 0
    this.disableEdit = this.dirty || (!this.dirty && !haveContent)
    //  this.canStartEdit =
    //    (!this.dirty && this.content.length > 0) || this.content.length === 0
    //canStartEdit if not dirty and have content OR if no content
    //  click Edit button make canStartEdit false, make editor NOT readonly
    //isEditable if content empty OR not canStartEdit
    // this.isReadOnly = this.content.length > 0
  },
  methods: {
    valueChanged(value) {
      if (this.content !== value) {
        this.dirty = true
        this.content = value
        //       this.canStartEdit = false
        /*  clearTimeout(this.timeout)
        const self = this
        this.timeout = setTimeout(() => {
          self.$emit('saveNotes', this.content)
          this.dirty = false
        }, 5000) */
      }
    },
    saveNotes() {
      this.$emit('saveNotes', this.content)
      this.dirty = false
      //this.isReadOnly = true
      var haveContent = this.content.length > 0
      this.canEdit = !haveContent
      var dbg = `saving dirty=${this.dirty} haveCon:${haveContent} ro:${!this
        .canEdit} editbtn.dis:${this.dirty || (!haveContent && !this.dirty)}`
      //   this.content = dbg
      //console.log(dbg)
      this.disableEdit = false
      /*  works except when init blank and save readonly and edit not enabled

         console.log(
        'saving dirty={0} ro:{1} editbtn.dis:{2}`',
        this.dirty,
        !this.canEdit,
        dirty || (!dirty && content.length > 0)
      ) */
    },
    editClick() {
      this.canEdit = true
      //this.isReadOnly = false
      this.disableEdit = false
      this.$refs.editor.focus()
    }
  }
}
</script>
