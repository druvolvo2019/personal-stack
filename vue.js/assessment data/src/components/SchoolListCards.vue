<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="grade in grades"
      :key="grade.visitId"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 flex"
    >
      <q-card
        v-ripple
        bordered
        :class="cardClass(grade)"
        clickable
        @click="selectSchool(grade)"
      >
        <q-card-section>
          <div class="row">
            <div class="col-auto text-h6 ellipsis">
              {{ grade.school.schoolName }}
            </div>
            <q-space />
            <div class="col-auto text-right">
              <session-chip
                :grade="grade.gradeLevel"
                :sample-name="grade.school.sessionType"
              ></session-chip>
              <multi-team :multi-team="multiTeam(grade)" />
            </div>
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon
                  :name="
                    grade.assessmentComplete
                      ? 'las la-calendar-check'
                      : 'las la-calendar-day'
                  "
                ></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <span
                    :class="grade.assessmentComplete ? 'text-strike' : ''"
                    >{{ assessmentDate(grade) }}</span
                  >

                  <q-badge
                    v-if="grade.isMakeup"
                    color="secondary"
                    class="on-right"
                    label="MAKEUP"
                  />
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon
                  size="2rem"
                  :name="
                    grade.assessmentComplete
                      ? 'las la-check-circle'
                      : 'las la-clock'
                  "
                  :class="
                    grade.assessmentComplete ? 'text-green' : 'text-yellow'
                  "
                ></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="las la-user"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ schoolCoordinatorInfo(grade) }}
                </q-item-label>
                <q-item-label caption>School Coordinator</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="las la-map-marker"></q-icon>
              </q-item-section>
              <q-item-section>
                <div>{{ grade.school.schoolName }}</div>
                <div>
                  {{ grade.school.schoolAddress }},
                  {{ grade.school.schoolAddressCity }},
                  {{ grade.school.schoolAddressState }}
                  {{ grade.school.schoolAddressZip }}
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="las la-tag"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ grade.school.districtName }}</q-item-label>
                <q-item-label caption>
                  {{ grade.school.schoolDistrictType }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="las la-map"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ assessCoordinatorInfo(grade) }}
                </q-item-label>
                <q-item-label caption>Assessment Coordinator</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator v-if="grade.schoolRating" inset></q-separator>
        <q-card-section v-if="grade.schoolRating">
          <q-list>
            <q-item :class="grade.schoolRating < 3 ? 'bg-red-1' : ''">
              <q-item-section avatar>
                <q-icon name="las la-comment"></q-icon>
              </q-item-section>
              <q-item-section>Rating from School</q-item-section>
              <q-item-section side>
                <q-rating
                  class="on-right"
                  color="yellow-14"
                  icon="las la-star"
                  icon-half="las la-star-half-alt"
                  readonly
                  size="1.5em"
                  :value="grade.schoolRating"
                />
                <q-tooltip
                  v-if="grade.schoolRatingComment"
                  content-class="text-body2"
                >
                  {{ grade.schoolRatingComment }}
                </q-tooltip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import Formatting from 'src/lib/formatting'
import Utils from 'src/lib/schoolListCardsUtils'

export default {
  name: 'SchoolListCards',
  components: {
    'session-chip': require('components/SessionChip.vue').default,
    'multi-team': require('components/MultiTeam.vue').default,
  },

  props: {
    grades: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },

  data() {
    return {
      username: '',
    }
  },

  async mounted() {
    this.username = await this.$loggedInUser.username()
  },

  methods: {
    cardClass(grade) {
      return grade.assessmentComplete
        ? 'fit my-selectable-card bg-grey-3'
        : 'fit my-selectable-card'
    },
    selectSchool(grade) {
      this.$emit('visitSelected', grade)
    },

    schoolCoordinatorInfo(grade) {
      return Utils.schoolCoordinatorData(
        grade.coordinatorName,
        grade.coordinatorTelephoneNumber
      )
    },

    assessCoordinatorInfo(grade) {
      return Utils.assessCoordinatorData(
        grade.assignedFieldArea,
        grade.assignedAssessmentCoordinator
      )
    },

    assessmentDate(grade) {
      return Formatting.formatDateMonthNameAndDayNoYear(
        grade.assessmentVisitDate
      ) //grade.scheduledAssessmentDate)
    },

    multiTeam(grade) {
      var leadAC = ''
      var helperAC = ''
      var multiTeamCard = ''

      //console.log("grade.multipleTeamsACs", grade.multipleTeamsACs)

      grade.multipleTeamsACs.forEach((element) => {
        if (element.responsibility === 'Lead AC') {
          leadAC = element.userName
        }

        if (element.responsibility === 'Helper AC') {
          helperAC = element.userName
        }
      })

      if (helperAC !== '' && leadAC !== '') {
        multiTeamCard = 'Multi-Team'

        if (this.username == helperAC) {
          multiTeamCard = 'Multi-Team Read only'
        }
      }
      return multiTeamCard
    },
  },
}
</script>

<style lang="sass" scoped>
.my-selectable-card
  width: 100%
.my-selectable-card:hover
  background-color: lighten($primary, 50)
  border-width: 1px
  border-color: $primary
.wordbreak
   background-color: white
</style>
