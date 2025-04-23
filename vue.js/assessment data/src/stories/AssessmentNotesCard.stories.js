import TemplateFn from './baseTemplate'
import AssessmentNotesCard from '../components/AssessmentNotesCard.vue'

export default {
  title: 'Application/AssessmentNotesCard',
  component: AssessmentNotesCard,
  argTypes: {
    notes: {
      name: 'Notes',
      type: { name: 'String', default: '' }
    },
    saveNotes: { action: 'saveNotes' }
  }
}

const Template = TemplateFn({
  components: { AssessmentNotesCard },
  template: `
  <div style="height: 30%; width: 500px;">
    <assessment-notes-card
    :notes="notes"
    @saveNotes="saveNotes"
    />
  </div>
`
})

export const NoDataIsOpenForEdits = Template({
  notes: ''
})

export const ExistingNotesInitiallyReadOnly = Template({
  notes: 'This is a sample note.'
})
