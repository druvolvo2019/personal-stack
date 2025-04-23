<template>
<div id="q-app">
  <div class="q-pa-md">
    
    <q-table
      style="height: 400px"
      ref="table"
      title="Users Management"
      :rows="data"
      :columns="columns"
      :table-colspan="9"
      row-key="index"
      :pagination="pagination"
      class="my-sticky-header-table"
    >

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      
      <template v-slot:header="props">
       
        <q-tr :props="props">
          <q-th></q-th>
          <q-th></q-th>
          <q-th
            v-for="col in props.cols"
            :key="col.name" 
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.userid}`">
          
          <q-td>
            <q-icon name="edit" color="blue" size="1.5rem"  @click="getUserDetail(props.row)">
                    <q-tooltip>
                          Edit data
                    </q-tooltip>
            </q-icon>  
          </q-td>
          
          <q-td>
            <q-icon name="password" color="blue" size="1.5rem"  @click="changePassword(props.row)">
                    <q-tooltip>
                          Change Password
                    </q-tooltip>
            </q-icon>  
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>

    </q-table>
    
    <q-dialog v-model="dialogPopUp">
      <userprofile :userData="userData"  />
    </q-dialog> 
    
    <q-dialog v-model="dialogPassword">
      <change-password :userData="userData"  />
    </q-dialog> 
  
  </div>
</div>
</template>

<script>
  import { Loading } from 'quasar'
	import { mapGetters, mapActions } from 'vuex'
	import { uid } from 'quasar'
	import { runGetCIMSUsers } from 'src/lib/dataSource'
export default {
	  props: {
			tab: {
			type: String,
			default: ''
			},
    },
    
      data () {
         return {
      filter:'',  
      dialogPopUp: false,
      dialogPassword:false,
      columns: [
        
         {
          name: 'desc',
          required: true,
          label: 'User ID',
          align: 'left',
          field: row => row.userid,
          format: val => `${val}`,
          sortable: true
         },
        
        { 
          name: 'userfirstname', 
          align: 'left', 
          label: 'First Name', 
          field: 'userfirstname', 
          sortable: true 
         },
         
          { 
          name: 'userlastname', 
          align: 'left', 
          label: 'Last Name', 
          field: 'userlastname', 
          sortable: true 
         },
       
        { 
          name: 'useremail', 
          label: 'Email', 
          field: 'useremail',
          align: 'left',
          sortable: true 
        },
        { 
          name: 'fldrole', 
          label: 'Role', 
          field: 'fldrole',
          align: 'left',
          sortable: true 
        }
       
      ],
     
      data: [],
      
      myUser: {
      },
      
      pagination: {
        rowsPerPage: 50
      },
      
      userData: {
					  password: '',
					  userfirstname:'',
	  				userlastname:'',
					  useremail: '',
					  userid:'',
	  				flgsysactive: '',
	  				flglocked: '',
	  				flgdisabled: '',
	  				fldrole: ''
				},

    }
  },

  async mounted()  {
      try{
      Loading.show()
      this.data = await runGetCIMSUsers(this.myUser)
      
      //console.log('GetCIMSUsers', this.data)
      Loading.hide()
    } catch(err){
      //console.log(err.message);
    }
  },
  
  async created() {
    try{
      Loading.show()
      this.data = await runGetCIMSUsers(this.myUser)
      
      //console.log('GetCIMSUsers', this.data)
      Loading.hide()
    } catch(err){
      //console.log(err.message);
    }
  },
  
  computed: {
      ...mapGetters('auth', ['getUser']),
      ...mapGetters('appsession', ['getReload']),
    
  },
  
  methods:{
         visitSelected(staffid) {
          this.$router.push('/school/'+staffid)
         },
         
         getUserDetail(user) {
           this.dialogPopUp = true;
           this.userData = user
           //console.log('getUserDetail', this.userData)
         },
         
        changePassword(user) {
           this.dialogPassword = true;
           this.userData = user
         }
  },
  
  components: {
		  'userprofile' : require('components/AdminUserProfile.vue').default,
		  'change-password': require('components/AdminUserPopPassword.vue').default
	}   
      
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>