<template>
<q-item
  v-bind="scope.itemProps"
  v-on="scope.itemEvents"
>
  <q-item-section>
      <div class="row q-pb-sm">
          <q-item-label>{{ scope.opt.schoolName }}</q-item-label>
          <q-space />
          <q-item-label caption>{{ scope.opt.gradeId }}</q-item-label>
      </div>
      <div class="row q-pb-xs">
          <q-item-label caption>{{ scope.opt.school.schoolAddress }}</q-item-label>
          <q-space />
          <q-item-label caption>{{ scope.opt.assignedFieldArea }}</q-item-label>
      </div>
      <div class="row q-pb-xs">
          <q-item-label caption>{{ scope.opt.school.schoolAddressCity }}, {{ scope.opt.school.schoolAddressState}} {{ scope.opt.school.schoolAddressZip }}</q-item-label>
      </div>
      <q-item-label caption>{{ scope.opt.school.districtName }} <span v-if="scope.opt.DistrictTUDAName"> - {{ scope.opt.DistrictTUDAName }} Urban District</span></q-item-label>
  </q-item-section>
</q-item>
</template>

<script>
export default {
    name: 'SchoolItem',
    props: {
        scope : {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
 }
</script>
