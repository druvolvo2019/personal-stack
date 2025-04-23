<template>
  <div class="col-12">
    <q-table
      ref="StudentListTable"
      bordered
      :columns="columns"
      :data="studentData"
      :filter="filter"
      :filter-method="myfilterMethod"
      flat
      :pagination.sync="pagination"
      title="Student List"
      :visible-columns="visibleColumns"
      wrap-cells
      @row-dblclick="onRowDblClick"
    >
      <!-- top -->
      <template v-slot:top>
        <q-select
          v-model="studentListView"
          filled
          label="Student List View"
          :options="studentListViews"
          style="width: 400px"
          @input="onInput"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
              <q-item-section v-if="missingDemographicCount > 1" side>
                <q-icon color="warning" :name="scope.opt.icon" />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </template>
      <!-- header-cell: studentName -->
      <template v-slot:header-cell-studentName="props">
        <q-th :props="props">
          <q-icon
            :name="showPII ? 'las la-unlock' : 'las la-lock'"
            size="1.5em"
          />
          {{ props.col.label }}
          <q-tooltip v-if="!showPII">Direct Student PII is redacted</q-tooltip>
        </q-th>
      </template>
      <!-- body-cell: lineNumber -->
      <template v-slot:body-cell-lineNumber="props">
        <q-td :props="props">
          <span :class="props.row.adminStatus ? 'text-strike' : ''">{{
            props.value
          }}</span>
        </q-td>
      </template>
      <!-- body-cell: group -->
      <template v-slot:body-cell-group="props">
        <q-td :props="props">
          <span :class="props.row.adminStatus ? 'text-strike' : ''">{{
            props.value
          }}</span>
        </q-td>
      </template>
      <!-- body-cell: loginId -->
      <template v-slot:body-cell-loginId="props">
        <q-td :props="props">
          <span :class="props.row.adminStatus ? 'text-strike' : ''">{{
            props.value
          }}</span>
        </q-td>
      </template>
      <!-- body-cell: room -->
      <template v-slot:body-cell-room="props">
        <q-td :props="props">
          <span :class="props.row.adminStatus ? 'text-strike' : ''">{{
            props.value
          }}</span>
        </q-td>
      </template>
      <!-- body-cell: subject -->
      <template v-slot:body-cell-subject="props">
        <q-td :props="props">
          <span :class="props.row.adminStatus ? 'text-strike' : ''">{{
            props.value
          }}</span>
        </q-td>
      </template>
      <!-- body-cell: ancillary -->
      <template v-slot:body-cell-ancillary="props">
        <q-td :props="props">
          <q-chip v-if="props.value" class="my-chip" :label="props.value" />
        </q-td>
      </template>
      <!-- body-cell: accommodations -->
      <template v-slot:body-cell-accommodations="props">
        <q-td :props="props">
          <div class="q-gutter-xs">
            <q-chip
              v-for="val in props.value"
              :key="val"
              class="my-chip"
              :label="val"
            />
          </div>
        </q-td>
      </template>
      <!-- body-cell: questionnaireRefusals -->
      <template v-slot:body-cell-questionnaireRefusals="props">
        <q-td :props="props">
          <div class="q-gutter-xs">
            <q-chip
              v-for="val in props.value"
              :key="val"
              class="my-chip"
              :label="val"
            />
          </div>
        </q-td>
      </template>
      <!-- body-cell: adminStatus -->
      <template v-slot:body-cell-adminStatus="props">
        <q-td :props="props">
          <q-chip v-if="props.value" class="my-chip" :label="props.value" />
        </q-td>
      </template>
      <!-- body-cell: missingDemographics -->
      <template v-slot:body-cell-missingDemographics="props">
        <q-td :props="props">
          <q-banner
            v-if="props.value"
            dense
            rounded
            class="bg-warning text-white on-right"
          >
            Missing demographic variables.
          </q-banner>
        </q-td>
      </template>
      <!-- body-cell: studentName -->
      <template v-slot:body-cell-studentName="props">
        <q-td v-if="!showPII" :props="props">
          • • •
          <q-tooltip>Direct Student PII is redacted</q-tooltip>
        </q-td>
        <q-td v-if="showPII" :props="props">
          <span :class="props.row.adminStatus ? 'text-strike' : ''">{{
            props.value
          }}</span>
        </q-td>
      </template>
      <!-- body-cell: edit -->
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="las la-edit"
            :disable="teamReadOnly"
            @click="editRow(props.row)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="showEditDemographicsDialog" size="large">
      <edit-demographics-dialog :student="editingStudent" />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Utils from 'src/lib/schoolListCardsUtils'

export default {
  components: {
    'edit-demographics-dialog': require('components/EditDemographicsDialog.vue')
      .default
  },

  props: {
    students: {
      type: Array,
      default() {
        return []
      }
    },
    groups: {
      type: Array,
      default() {
        return []
      }
    },
    teamReadOnly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      canshow: true,
      studentData: this.students,
      editingStudent: null,
      showEditDemographicsDialog: false,
      filter: { type: 'all', group: '' },
      visibleColumns: [],
      pagination: {
        sortBy: 'SessionLineNumber',
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      studentListView: null,
      columns: [
        {
          name: 'SessionLineNumber',
          align: 'center',
          label: 'Session/Line #',
          //field: 'SessionLineNumber',
          field: row => Utils.getStudentSessionLineNumber(row),
          sortable: true,
          style: 'width: 8rem',
          headerStyle: 'width: 8rem'
        },
        {
          name: 'group',
          align: 'center',
          label: 'Group',
          //field: 'group',
          field: row => Utils.getStudentGroupName(row),
          sortable: true,
          style: 'width: 8rem',
          headerStyle: 'width: 8rem'
        },
        {
          name: 'loginId',
          align: 'center',
          label: 'Login ID',
          field: 'loginId',
          sortable: true,
          style: 'width: 8rem',
          headerStyle: 'width: 8rem'
        },
        {
          name: 'room',
          align: 'center',
          label: 'Student Room or Other Locator',
          field: 'room',
          style: 'width: 8rem',
          headerStyle: 'width: 8rem'
        },
        {
          name: 'groupLocation',
          align: 'center',
          label: 'Group Location',
          field: 'groupLocation',
          style: 'width: 8rem',
          headerStyle: 'width: 8rem'
        },
        {
          name: 'subject',
          align: 'left',
          label: 'Subject',
          field: 'subject',
          style: 'width: 6rem',
          headerStyle: 'width: 6rem'
        },
        {
          name: 'ancillary',
          align: 'center',
          label: 'Ancillary',
          field: 'ancillary',
          style: 'width: 6rem',
          headerStyle: 'width: 6rem'
        },
        {
          name: 'accommodations',
          align: 'left',
          label: 'Accommodations',
          field: 'accommodations',
          sortable: true,
          style: 'width: 16rem',
          headerStyle: 'width: 16rem'
        },
        {
          name: 'questionnaireRefusals',
          align: 'center',
          label: 'Questionnaire Refusals',
          field: 'studentQuestionnaireRefusal',
          style: 'width: 12rem',
          headerStyle: 'width: 12rem',
          sortable: true
        },
        {
          name: 'adminStatus',
          align: 'center',
          label: 'Admin Status',
          field: 'adminStatus',
          style: 'width: 12rem',
          headerStyle: 'width: 12rem',
          sortable: true
        },
        {
          name: 'missingDemographics',
          align: 'left',
          label: 'Missing Demographics',
          field: 'missingDemographics',
          style: 'width: 16rem',
          headerStyle: 'width: 16rem'
        },
        {
          name: 'studentName',
          align: 'left',
          label: 'Student Name',
          field: 'studentName',
          sortable: true
        },
        {
          name: 'edit',
          align: 'left',
          label: '',
          field: '',
          style: 'width: 2rem'
        }
      ]
    }
  },

  computed: {
    showPII() {
      return this.canshow
    },
    studentListViews: function() {
      var resArr = [
        { label: 'Prepare Student Login Cards' },
        {
          label: 'Provide Missing Demographic Variables',
          icon: 'las la-exclamation-triangle'
        },
        { label: 'Locate Students' }
      ]

      var sortedgroups = [...this.groups].sort(function(ob1, ob2) {
        if (ob1.type > ob2.type) {
          return -1
        } else if (ob1.type < ob2.type) {
          return 1
        }

        if (ob1.sessId > ob2.sessId) {
          return 1
        } else if (ob1.sessId < ob2.sessId) {
          return -1
        }

        if (ob1.label < ob2.label) {
          return -1
        } else if (ob1.label > ob2.label) {
          return 1
        } else {
          // nothing to split them
          return 0
        }
      })

      for (let i = 0; i < sortedgroups.length; i++) {

    
        if (sortedgroups[i].type == 'Accommodation') {
          resArr.push({
            label:
              'Prepare Room for Accommodation ' +
              sortedgroups[i].sessId +
              '-' +
              sortedgroups[i].label
          })
        } else {
          resArr.push({
            label:
              'Prepare Room for Group ' + Utils.getGroupName(sortedgroups[i])
          })
        }
      }
      resArr.push({ label: 'All' })

      return resArr
    },
    missingDemographicCount: function() {
      return this.studentData.filter(
        student => student.missingDemographics == true
      ).length
    }
  },

  async mounted() {
    this.studentListView =
      this.missingDemographicCount > 0
        ? this.studentListViews[1]
        : this.studentListViews[0]
    this.onInput(this.studentListView)
    this.studentData = this.students
    this.canshow = await this.$loggedInUser.showPII()

  },

  methods: {
    onInput(value) {
      switch (true) {
        case value.label == 'Prepare Student Login Cards':
          this.visibleColumns = [
            'SessionLineNumber',
            'group',
            'loginId',
            'studentName',
            'adminStatus'
          ]
          this.filter.type = ''
          this.filter.group = ''
          this.pagination.sortBy = 'SessionLineNumber'
          this.pagination.descending = false
          break
        // TODO: Handle better based on dynamically constructed groups
        case value.label.includes('Prepare Room for Group'):
          this.visibleColumns = [
            'SessionLineNumber',
            'group',
            'loginId',
            'studentName',
            'subject',
            'ancillary',
            'accommodations',
            'questionnaireRefusals',
            'adminStatus'
          ]
          this.filter.type = 'group'
          this.filter.group = value.label.substring(
            value.label.length - 2,
            value.label.length
          )
          this.pagination.sortBy = 'accommodations'
          this.pagination.descending = true
          break
        case value.label.includes('Prepare Room for Accommodation'):
          this.visibleColumns = [
            'SessionLineNumber',
            'group',
            'loginId',
            'studentName',
            'subject',
            'ancillary',
            'accommodations',
            'questionnaireRefusals',
            'adminStatus'
          ]
          this.filter.type = 'accommodations'
          this.filter.group = value.label.substring(
            value.label.length - 8,
            value.label.length
          )
          this.pagination.sortBy = 'accommodations'
          this.pagination.descending = true
          break

        case value.label == 'Provide Missing Demographic Variables':
          this.visibleColumns = [
            'SessionLineNumber',
            'group',
            'loginId',
            'studentName',
            'missingDemographics',
            'edit'
          ]
          this.filter.type = 'missing'
          this.filter.group = ''
          this.pagination.sortBy = 'SessionLineNumber'
          this.pagination.descending = false
          break

        case value.label == 'Locate Students':
          this.visibleColumns = [
            'SessionLineNumber',
            'group',
            'groupLocation',
            'loginId',
            'studentName',
            'room'
          ]
          this.filter.type = ''
          this.filter.group = ''
          this.pagination.sortBy = 'studentName'
          this.pagination.descending = false
          break
        default:
          this.visibleColumns = [
            'SessionLineNumber',
            'group',
            'loginId',
            'studentName',
            'room',
            'subject',
            'ancillary',
            'accommodations',
            'adminStatus',
            'missingDemographics',
            'edit'
          ]
          this.filter.type = ''
          this.filter.group = ''
          this.pagination.sortBy = 'SessionLineNumber'
          this.pagination.descending = false
      }
    },
    myfilterMethod() {
      if (this.studentData.length > 2) {
        if (this.filter.type === 'group') {
          return this.studentData.filter(
            row =>
              row.group +
                row.assignedSessId.substring(
                  row.assignedSessId.length - 1,
                  row.assignedSessId.length
                ) ===
              this.filter.group
          )
        }
        if (this.filter.type === 'accommodations') {
          return this.studentData.filter(
            row => row.assignedSessId + '-' + row.group === this.filter.group
          )
        }
        if (this.filter.type === 'missing') {
          return this.studentData.filter(row => row.missingDemographics)
        }
        return this.studentData
      } else {
        return this.studentData
      }
    },
    editRow(student) {
      this.showEditDemographicsDialog = true
      this.editingStudent = student
    },
    onRowDblClick(evt, row) {
      this.showEditDemographicsDialog = true
      this.editingStudent = row
    }
  }
}
</script>

<style lang="sass">
.my-chip
  background-color: lighten($primary, 50)
.my-avatar
  background-color: lighten($primary, 25)
  color: white
</style>
