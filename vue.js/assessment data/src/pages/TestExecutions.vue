<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Queries</div>
          <q-list bordered separator>
            <q-item
              v-for="(item, i) in queryItems"
              :key="`item-${i}`"
              v-ripple
              clickable
              :class="item.class"
              @click="attachToDatasource(item.actionParams)"
            >
              <q-item-section>
                <q-item-label>
                  {{ item.name }}
                </q-item-label>
                <q-item-label caption>{{ item.tooltip }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Mutations</div>
          <q-list bordered separator>
            <q-item
              v-for="(item, i) in mutationItems"
              :key="`item-${i}`"
              v-ripple
              clickable
              :class="item.class"
              @click="executeMutation(item.actionParams)"
            >
              <q-item-section>
                <q-item-label>
                  {{ item.name }}
                </q-item-label>
                <q-item-label caption>{{ item.tooltip }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="my-card" style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Output</div>
        </q-card-section>
        <q-separator inset />

        <q-card-section class="q-pt-none">
          <q-scroll-area style="height: 300px; width: 100%;">
            <div>
              <pre>{{ output }}</pre>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Messages</div>
        </q-card-section>
        <q-separator inset />

        <q-card-section class="q-pt-none">
          <q-scroll-area style="height: 300px; width: 100%;">
            <div>
              <pre
                >{{ messages }}
      </pre
              >
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">User</div>
        </q-card-section>
        <q-separator inset />

        <q-card-section class="q-pt-none">
          <q-scroll-area style="height: 300px; width: 100%;">
            <div>
              <pre
                >{{ userInfo }}
      </pre
              >
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { uid } from 'quasar'

export default {
  name: 'TestExecutions',
  data() {
    return {
      gradeId: '2410371',
      visitId: '2410371+01/25/2021',
      barcode: 800000000,
      userInfo: {},
      output: {},
      messages: [],
      teachers: [],
      items: [
        {
          name: 'runAddTeacher',
          kind: 'mutation',
          tooltip: 'Runs a mutation which adds a teacher normally',
          actionParams: {
            action: 'runAddTeacher',
            variables: context => {
              const newId = uid()
              const person = {
                personId: newId,
                firstName: 'John',
                lastName: 'Smith',
                subjects: ['MATH', 'READING'],
                barcode: 'test-barcode'
              }
              context.storeNewTeacher(person)
              return {
                visitId: context.visitId,
                gradeId: context.gradeId,
                person
              }
            },
            context: {
              requestPolicy: 'cache-only'
            }
          }
        },
        {
          name: 'runGetSampledGrade',
          kind: 'query',
          tooltip: 'Runs a query to retrieve a visit',
          actionParams: {
            action: 'runGetSampledGrade',
            variables: ['visitId']
          }
        },
        {
          name: 'runGetSampledGradeTeachersOnly',
          kind: 'query',
          tooltip: 'Runs a query to retrieve a visit - teachers only',
          actionParams: {
            action: 'runGetSampledGradeTeachersOnly',
            variables: ['visitId']
          }
        },
        {
          name: 'runGetTeachers',
          kind: 'query',
          tooltip: 'Get all teachers',
          actionParams: {
            action: 'runGetTeachers',
            variables: ['gradeId'],
            afterRun: (data, context) => {
              context.teachers = data.GetTeachers.body.map(x => x)
            }
          }
        },
        {
          name: 'runUpdateBarcode',
          kind: 'mutation',
          tooltip: 'Runs a mutation which updates a teacher barcode',
          actionParams: {
            action: 'runUpdateBarcode',
            variables: context => {
              if (context.teachers.length > 0) {
                const teacher = context.teachers[0]
                return {
                  original: teacher,
                  input: {
                    personId: teacher.personId,
                    barcode: 'THIS WAS CHANGED'
                  }
                }
              } else {
                return false
              }
            }
          }
        },
        {
          name: 'runUpdateTeacher',
          kind: 'mutation',
          tooltip: 'Runs a mutation which updates a teacher',
          actionParams: {
            action: 'runUpdateTeacher',
            variables: context => {
              if (context.teachers.length > 0) {
                const teacher = context.teachers[0]
                return {
                  original: teacher,
                  visitId: context.visitId,
                  input: {
                    personId: teacher.personId,
                    barcode: 'THIS WAS BY UPDATE',
                    firstName: 'FIRST',
                    lastName: 'LAST',
                    subjects: ['MATH']
                  }
                }
              } else {
                return false
              }
            }
          }
        },
        {
          name: 'Generate 400',
          kind: 'mutation',
          tooltip: 'Runs a mutation which generates a 400 error for testing',
          action: this.generate400
        },
        {
          name: 'runGetNDA',
          kind: 'query',
          tooltip: 'Get NDAs for visit',
          actionParams: {
            action: 'runGetNDA',
            variables: ['visitId']
          }
        },
        {
          name: 'runGetSampledGrades',
          kind: 'query',
          tooltip: 'Get Sampled Grades',
          actionParams: {
            action: 'runGetSampledGrades',
            variables: {
              filter: {
                territory: '21',
                stateregion: 'MD-1',
                area: 1
              }
            }
          }
        },
        {
          name: 'runUpdateNDA',
          kind: 'mutation',
          tooltip: 'Runs a mutation that saves a new NDA',
          actionParams: {
            action: 'runUpdateNDA',
            variables: context => {
              const input = {
                id: context.visitId,
                email: 'HS@sunnydaleSanitorium.hosp',
                name: 'Herman SchimmelPulzer',
                ndaId: uid()
              }
              return {
                input
              }
            }
          }
        },
        {
          name: 'runUpdateAssessmentNotes',
          kind: 'mutation',
          tooltip: 'Runs a mutation that saves notes',
          actionParams: {
            action: 'runUpdateAssessmentNotes',
            variables: context => {
              return {
                input: {
                  id: context.visitId,
                  assessmentNotes: 'A note that overwrites all else ' + uid()
                }
              }
            }
          }
        },
        {
          name: 'runUpdateMakeupSession',
          kind: 'mutation',
          tooltip: 'Runs a mutation that creates a Makeup Session',
          actionParams: {
            action: 'runUpdateMakeupSession',
            variables: context => {
              /*
	gradeId: ID!
	makeupDateTime: ID!
  makeupLocation: ID!
*/

              return {
                visitId: context.visitId,
                input: {
                  gradeId: context.gradeId,
                  makeupDateTime: '2020-09-16T15:30.000',
                  makeupLocation: 'somewhere over the rainbow ' + uid()
                }
              }
            }
          }
        },
        {
          name: 'runUpdateQuexResponses',
          kind: 'mutation',
          tooltip: 'Runs a mutation that saves survey responses',
          actionParams: {
            action: 'runUpdateQuexResponses',
            variables: context => {
              const input = {
                visitId: context.visitId,
                quexId: '0603',
                responses: [
                  {
                    questionId: '1001',
                    choiceId: 1099,
                    value: 'true',
                    reasontext: 'I really dont like to take surveys'
                  }
                ]
              }
              return {
                input
              }
            }
          }
        },
        {
          name: 'runUpdateMissingDemographics',
          kind: 'mutation',
          tooltip: 'Runs a mutation that saves student info',
          actionParams: {
            action: 'runUpdateMissingDemographics',
            variables: context => {
              const input = {
                gradeId: context.gradeId,
                session: 'DS0801',
                lineNumber: '1',
                gender: 91,
                raceEthnicity: 92,
                schoolLunchStatus: 93,
                sdStatus: 94,
                ellStatus: 95
              }
              return {
                input,
                visitId: this.visitId
              }
            }
          }
        },
        {
          name: 'runGetValidTRAList',
          kind: 'query',
          tooltip: 'Retrieves all valid TRAs',
          actionParams: {
            action: 'runGetValidTRAList',
            variables: {}
          }
        },
        {
          name: 'runGetAvailableBarcodes',
          kind: 'query',
          tooltip: 'Retrieves all valid barcodes for a grade id',
          actionParams: {
            action: 'runGetAvailableBarcodes',
            variables: ['gradeId']
          }
        },
        {
          name: 'runGetQuexAnswers',
          kind: 'query',
          tooltip: 'Retrieves all Quex Answers for a visitId',
          actionParams: {
            action: 'runGetQuexAnswers',
            variables: ['visitId']
          }
        },
        /*        {
          name: 'runGetQuexQuestions',
          kind: 'query',
          tooltip: 'Retrieves all Quex Questions for a quexid',
          actionParams: {
            action: 'runGetQuexQuestions',
            variables: {
              quexid: '123'
            }
          }
        },  */
        {
          name: 'runDeleteTeacher',
          kind: 'mutation',
          tooltip: 'Deletes a teacher',
          actionParams: {
            action: 'runDeleteTeacher',
            variables: context => {
              if (context.teachers.length === 0) {
                return false
              } else {
                const teacher = context.teachers.pop()
                return {
                  personId: teacher.personId
                }
              }
            }
          }
        }
      ]
    }
  },
  computed: {
    queryItems() {
      return this.filteredItems('query')
    },
    mutationItems() {
      return this.filteredItems('mutation')
    }
  },
  mounted() {
    if (this.$naepAuth) {
      this.subscription = this.$naepAuth.subscribe(event => {
        this.messages.push(event)
      })
      this.updateUserInfo()
    }
  },
  destroyed() {
    this.subscription && this.subscription.unsubscribe()
  },
  methods: {
    storeNewTeacher(teacher) {
      this.teachers.push(teacher)
    },
    filteredItems(filter) {
      if (this.$naepDataSource) {
        const implemented = this.items
          .filter(x => {
            return x.kind === filter && x.actionParams
          })
          .map(x => ({ ...x, class: 'bg-teal-1' }))
        const defined = Object.keys(this.$naepDataSource).map(x => {
          return {
            name: x,
            kind: this.$naepDataSource[x].metadata.kind,
            tooltip: 'Not yet defined',
            class: 'bg-red-1'
          }
        })
        const result = [...implemented]
        defined.forEach(x => {
          if (
            x.kind == filter &&
            result.findIndex(k => k.name === x.name) === -1
          ) {
            result.push(x)
          }
        })

        return result.sort((x, y) => {
          if (x.name < y.name) {
            return -1
          } else if (x.name > y.name) {
            return 1
          } else {
            return 0
          }
        })
      }
    },
    async getParamsFromObj(obj) {
      const { variables } = obj
      let result = {}
      if (variables.forEach) {
        variables.forEach(key => (result[key] = this[key]))
      } else {
        if (typeof variables === 'function') {
          result = variables(this)
        } else {
          result = variables
        }
      }

      return result
    },
    async attachToDatasource(obj) {
      if (obj) {
        const { action } = obj

        const fn = this.$naepDataSource[action]
        if (this.unsubscribe) {
          this.unsubscribe.unsubscribe()
        }
        const vars = await this.getParamsFromObj(obj)
        if (vars !== false) {
          this.unsubscribe = await fn(vars, result => {
            this.output = result
            if (obj.afterRun) {
              obj.afterRun(result.data, this)
            }
            this.updateUserInfo()
          })
        }
      } else {
        this.output = {
          status: 'not yet implemented'
        }
        this.updateUserInfo()
      }
    },
    async executeMutation(obj) {
      if (obj) {
        const { action, context } = obj
        const fn = this.$naepDataSource[action]
        const vars = await this.getParamsFromObj(obj)
        console.log({ vars })
        if (vars !== false) {
          this.output = await fn(vars, context)
        }
      } else {
        this.output = {
          status: 'not yet implemented'
        }
        this.updateUserInfo()
      }
    },
    async generate400() {
      await this.genericAddTeacher('runAddNewTeacher400')
      this.updateUserInfo()
    },
    async updateUserInfo() {
      this.userInfo = {
        user: await this.$loggedInUser.user()
      }
    }
  }
}
</script>

<style></style>
