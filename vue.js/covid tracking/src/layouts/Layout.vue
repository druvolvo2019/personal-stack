<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          <div>
          The COVID Incident Management System
          <q-badge> v {{ version }} </q-badge>
          </div>
        </q-toolbar-title>
        
        <q-btn v-if="hideDrawer" flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu"></q-btn>

          <q-btn 
              v-if="loggedIn"
              flat 
              icon-right="account_circle"
              :label="user.userfirstname + ' ' + user.userlastname"
              class="absolute-right"
             >
              <q-menu  anchor="bottom right" self="top right">
                <q-list style="min-width: 130px">
                
                   <q-separator></q-separator>
                   <q-item clickable to='admin'>
                      <q-item-section avatar>
                        <q-icon name="admin_panel_settings" />
                      </q-item-section>
                      <q-item-section >CIMS Admin</q-item-section>
                  </q-item>

                  <q-separator></q-separator>

                   <q-item clickable>
                    <q-item-section avatar>
                        <q-icon name="exit_to_app" />
                    </q-item-section>
                    <q-item-section  @click="logoutUser(user)" >Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
          </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      class="bg-primary"
      
      v-if="hideDrawer"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-black"
          exact
          clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import currentVersion from 'src/statics/version.json'
  import { SessionStorage } from 'quasar'
  import { getWithExpiry } from 'src/lib/auth-expiration'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { openURL } from 'quasar'

  export default {
    name: 'MyLayout',
    data () {
      return {
        leftDrawerOpen: true,
        version:  `${currentVersion.major}.${currentVersion.minor}.${currentVersion.build}`,
        incidentContact: null,
        ncesfinalVisible: true
      }
    },
    mounted() {
       var storedLoggeIn = getWithExpiry('loggedIn')
       if (Object.is(storedLoggeIn, null)) {
		      storedLoggeIn = false
	     }
       //console.log('storedLoggeIn', storedLoggeIn)
       this.setLoggedIn(storedLoggeIn)

       var storedUser = SessionStorage.getItem('loggedUser')
       if (Object.is(storedUser, null)) {
		      storedUser = false
	     }
       //console.log('storedUser', storedUser)
       this.addUser(storedUser)
       
    },
    computed: {
      ...mapState('auth', ['loggedIn','user']),
      ...mapGetters('appsession', ['getIncidentContact']),
      
      hideDrawer()
      {
        var ret = false 
        if (this.loggedIn) {
           if (this.$route.path == "/"){
             ret = false
           }else {
             ret = true
           }
        }
        return ret
      },
      
      navs() {
          var nodes = []
          var node = {}
          
          this.incidentContact = this.getIncidentContact
          
          if ( this.$route.path =="/admin") {
              nodes = []
              node = {
                label: 'Incident Cards',
                icon: 'dashboard',
                to: '/'
              }
              nodes.push(node)
          } else {
              node = {
                label: 'Form Summary',
                icon: 'summarize',
                to: '/formsummary'
              }
              nodes.push(node)
          
          
              if (Object.is(this.incidentContact, null)) {
              }
              else {
                
                if (this.incidentContact.fldcifsubmissiontypetext =='Active Positives') {
         
                   this.ncesfinalVisible = true
                   
                   if (this.getCount(this.incidentContact.schoolcontactcount) != '0' ){
                       node ={
                        label: 'NCES Initial Contact',
                        icon: 'location_city',
                        to: '/ncesinitial'
                      }
                      nodes.push(node)
                  }
                
                  if (this.getCount(this.incidentContact.schoolcontactcount) != '0' ){
                        node = {
                          label: 'School Contacts',
                          icon: 'school',
                          to: '/school'
                        }
                        nodes.push(node)
                  }
                  
                  if (this.getCount(this.incidentContact.districtcontactcount)!= '0' ){
                        node ={
                          label: 'District Contacts',
                          icon: 'domain',
                          to: '/district'
                        }
                        nodes.push(node)
                  }
                  
                  if (this.getCount(this.incidentContact.statecontactcount)!= '0' ){
                        node = {
                            label: 'State Contacts',
                            icon: 'map',
                            to: '/state'
                        }
                        nodes.push(node)
                  } 
              } else {
                this.ncesfinalVisible = false
              }
              
              if (this.ncesfinalVisible){
                node =
                {
                  label: 'NCES Final Contact',
                  icon: 'location_city',
                  to: '/ncesfinal'
                }
                nodes.push(node)
              }
          }
        }
        return nodes.map((x) => x);
      }
      
    },
    methods: {
      ...mapActions('auth', ['logoutUser','setLoggedIn','addUser']),
      openURL,
      
      getCount(value) {
			    var ret = ''
			    if (Object.is(value, null)) {
		    		ret = '0'
	    		}else {
	    		  ret = value
	    		}
				
			 return ret
    	},
      
    }
  }
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }
  
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }

  .sub-title {
		font-size: 14px!important;;
	}
</style>