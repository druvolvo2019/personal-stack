<template>

    <q-card class="q-ma-md">
      
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6">{{ title }}</q-item-label>
        </q-item-section>
      </q-item>
    
    <q-card-section>
    <q-list>
      <q-item>
            <q-item-section side style="min-width: 30px; vertical-align: text-top">
              <q-icon
                name="today"                
                size="1.5rem"
              />
            </q-item-section>

            <q-item-section style="min-width: 100px">
              <q-item-label>{{ dateTimeAMPM(incidentForm.fldcreateddt) }}</q-item-label>
              <q-item-label caption style="color:blue">Submission Date/Time</q-item-label>
            </q-item-section>
      </q-item>
      
      <q-item>
            <q-item-section side style="min-width: 30px; vertical-align: text-top">
              <q-icon
                name="contact_page"                
                size="1.5rem"
              />
            </q-item-section>

            <q-item-section style="min-width: 100px">
              <q-item-label>{{ incidentForm.fldwinsid }}</q-item-label>
              <q-item-label caption style="color:blue">WINS</q-item-label>
            </q-item-section>
      </q-item>
      
      <q-item>
            <q-item-section side style="min-width: 30px">
              <q-icon
                name="apartment"                
                size="1.5rem"
              />
            </q-item-section>

            <q-item-section style="min-width: 100px">
              <q-item-label>
                  <div v-for="value in getTRA(incidentForm.tra)">
                      {{ value }}
                  </div>
              </q-item-label>
              <q-item-label caption style="color:blue">T:R/A</q-item-label>
            </q-item-section>
      </q-item>

      <q-item>
            <q-item-section side style="min-width: 30px; vertical-align: text-top">
              <q-icon
                name="fmd_good"                
                size="1.5rem"
              />
            </q-item-section>

            <q-item-section style="min-width: 100px">
              <q-item-label>{{ handlenull(incidentForm.incidentstates, 'n/a') }}</q-item-label>
              <q-item-label caption style="color:blue">Jurisdiction</q-item-label>
            </q-item-section>
      </q-item>

      <q-item>
            <q-item-section side style="min-width: 30px">
              <q-icon
                :name="getStatusIcon(incidentForm.incidentstatus)"                
                size="1.5rem"
              />
            </q-item-section>

            <q-item-section style="min-width: 100px">
              <q-item-label>{{incidentForm.incidentstatus}}</q-item-label>
              <q-item-label caption style="color:blue">Status</q-item-label>
            </q-item-section>
      </q-item>

    </q-list>

  </q-card-section>
    </q-card>

<q-card class="q-ma-md" style="min-width: 450px; width: 40%">
     <q-item>
        <q-item-section>
          <q-item-label class="text-h6">{{ title2 }}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <q-toggle
            label="Lock to disable contacts"
            v-model="disableContact"            
            checked-icon="lock"
            unchecked-icon="lock_open"
            ></q-toggle>
        </q-item-section>
      </q-item>


    <q-card-section horizontal>
    <q-card-section style="width: 40%">
    <q-list>
      <q-item>
            <q-item-section style="min-width: 100px">
              <q-item-label>{{ dateTimeStringFromDbString(incidentForm.date_received_covid19_vaccine, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Vaccination Date</q-item-label>
            </q-item-section>
      </q-item>
      
      <q-item >
            <q-item-section style="min-width: 100px">
              <q-item-label>{{ getYesNo(incidentForm.choice_work_outside_home) }}</q-item-label>
              <q-item-label caption style="color:blue">Performed work outside home</q-item-label>
            </q-item-section>
      </q-item>
      
      <q-item >
            <q-item-section style="min-width: 100px">
              <q-item-label v-if="incidentForm.choice_exposure_or_positive == 'Positive'" >Positive COVID-19 Test</q-item-label>
              <q-item-label v-else >Exposure to COVID-19</q-item-label>
              <q-item-label caption style="color:blue">Incident Type</q-item-label>
            </q-item-section>
      </q-item>

      <q-item v-if="incidentForm.choice_exposure_or_positive == 'Positive'">
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ dateTimeStringFromDbString(incidentForm.date_when_tested, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Test Date</q-item-label>
            </q-item-section>
      </q-item>
      <q-item v-else>
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ dateTimeStringFromDbString(incidentForm.date_last_exposed, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Exposure Date</q-item-label>
            </q-item-section>
      </q-item>

      <q-item v-if="incidentForm.choice_exposure_or_positive == 'Positive'">
            <q-item-section style="min-width: 100px">
              <q-item-label>{{ dateTimeStringFromDbString(incidentForm.date_positive_result, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Received Positive Test</q-item-label>
            </q-item-section>
      </q-item>
      <q-item v-else>
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ dateTimeStringFromDbString(incidentForm.date_begun_quarantine, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Quarantine Date</q-item-label>
            </q-item-section>
      </q-item>

    </q-list>
</q-card-section>

<q-card-section>
<q-list>

      <q-item v-if="incidentForm.choice_exposure_or_positive == 'Positive'">
            <q-item-section style="min-width: 100px">
              <q-item-label>{{ dateTimeStringFromDbString(incidentForm.date_started_isolation, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Isolation Started</q-item-label>
            </q-item-section>
      </q-item>
      <q-item v-else>
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ dateTimeStringFromDbString(incidentForm.date_test_taken, '') }}</q-item-label>
              <q-item-label caption style="color:blue">COVID-19 post-exposure test date</q-item-label>
            </q-item-section>
      </q-item>

      <q-item v-if="incidentForm.choice_exposure_or_positive == 'Positive'">

            <q-item-section style="min-width: 100px">
              <q-item-label>{{ dateTimeStringFromDbString(incidentForm.date_symptoms_started, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Symptoms Started</q-item-label>
            </q-item-section>
      </q-item>
      <q-item v-else>
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ dateTimeStringFromDbString(incidentForm.date_positive_test_exposure, '') }}</q-item-label>
              <q-item-label caption style="color:blue">Positive Test within Past 3 months</q-item-label>
            </q-item-section>
      </q-item>

      <q-item v-if="incidentForm.choice_exposure_or_positive == 'Positive'">
            <q-item-section style="min-width: 100px">
              <q-item-label>{{ getYesNo(incidentForm.choice_positive_test_positive) }}</q-item-label>
              <q-item-label caption style="color:blue">Positive Test within past 3 months</q-item-label>
            </q-item-section>
      </q-item>
     <q-item v-else>
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ getYesNo(incidentForm.choice_have_recovered_exposure) }}</q-item-label>
              <q-item-label caption style="color:blue">Recovered from symptoms</q-item-label>
            </q-item-section>
      </q-item>

      <q-item v-if="incidentForm.choice_exposure_or_positive == 'Positive'">
            <q-item-section style="min-width: 100px">
              <q-item-label>{{ getYesNo(incidentForm.choice_have_recovered_positive) }}</q-item-label>
              <q-item-label caption style="color:blue">Recovered from symptoms</q-item-label>
            </q-item-section>
      </q-item>
            <q-item v-else>
            <q-item-section style="min-width: 100px">
              <q-item-label >{{ getYesNo(incidentForm.choice_experiencing_symptoms) }}</q-item-label>
              <q-item-label caption style="color:blue">Experiencing COVID-19 symptoms</q-item-label>
            </q-item-section>
      </q-item>
    </q-list>

</q-card-section>
    </q-card-section>

</q-card>

<q-card  class="q-ma-md">
  
  <q-card-section>
               
      <incident-contact-types :myIncidentContact="incidentForm"  :myIncidentTitle="contactCardtitle"/>
             
  </q-card-section>
  
</q-card>


</template>

<script>
 import { date } from 'quasar'
 import { runUpdateIncidentDisable } from 'src/lib/dataSource'

export default {
  name: 'SummaryFormDetails',
  components: {
      'incident-contact-types':require('components/IncidentContactTypes.vue').default,
   },
  props: {
    summary: {
      type: Object,
    },
  },

  data() {
    return {
      visible: false,
      title: 'Details',   
      title2: 'Summary',
      title3: 'Contact Status',
      disableContact: (this.summary.flgdisable === 1 ? true : false), 
      savingFailed: false,
	     errorMessage: '',         
      incidentForm: this.summary,
      contactCardtitle: 'Contacts'
    }
  },
  watch: {    
        disableContact: function (val) {        
        console.log("newVal", val)
        this.disableContact = val
        this.flgdisable = (this.disableContact === true ? 1 : 0)
        console.log("disableContact", this.disableContact)                
        this.updateIncidentDisable()
    }
  },

  mounted() {
      //this.flgdisable = this.incidentForm.flgdisable
      //this.disableContact = (this.incidentForm.flgdisable === 1 ? true : false)
      
      //console.log("flgdisable", this.disableContact) 
      //console.log("disableContact", this.disableContact) 

      //this.disableContact = false
      
  },


  methods: {
    
    async updateIncidentDisable() {        

        this.savingFailed = false 
		
        let s = {
            status: 200,
            data : null
        }   
        try {
            var updateIncidentdisableInput= {
            fldincidentid: this.incidentForm.fldincidentid,
	        flgdisable: (this.disableContact === true ? 1 : 0)
            }

            console.log("updateIncidentdisableInput=", updateIncidentdisableInput)

            s = await runUpdateIncidentDisable(updateIncidentdisableInput)

        } finally {
			
		}

        console.log("s",s)

        this.savingFailed = true
        if (s.status== 200) {
            this.errorMessage ='Data saved successfully.'
            this.$q.notify({
                color: "green-4",
                textColor: "white",
                icon: "cloud_done",
                message: this.errorMessage,
            });
        }else {
            this.errorMessage = s.errorMessage
            this.$q.notify({
                color: "red-4",
                textColor: "white",
                icon: "cloud_done",
                message: this.errorMessage,
            });
        }
    },


    getYesNo(value) {
			    var ret = ''
			    if (Object.is(value, null)) {
		    		value =0
	    		}
				switch (value) {
				  case 0:
				  	ret ='No'
				  	break
				  case 1:
				    ret ='Yes'
				    break;
				}
			 return ret
    	},

    handlenull(value, defaultvalue) {
        if (Object.is(value, null)) {
		    return defaultvalue
	    } else {
            return value
        }

    },

  dateTimeAMPM(datestr) {
        var timeStamp = new Date(datestr)
        timeStamp.setTime(timeStamp.getTime())
        return date.formatDate(timeStamp, 'MM/DD/YYYY h:mm A')
      },

    dateTimeStringFromDbString(value, option) {

        if (Object.is(value, null)) {
		    value = ''
	    }

        if (value == '') {
            if (option != '') {
                return option
            } else {
                return 'No'}
        }else{
            var timeStamp = new Date(value)
            timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
            if(option=='weekdays')  {
                return date.formatDate(timeStamp, 'dddd MM/DD/YYYY h:mm a')
            } else {
                return date.formatDate(timeStamp, 'dddd MM/DD/YYYY')
            }

        }
      },
      getCount(value) {
			    var ret = ''
			    if (Object.is(value, null)) {
		    		ret ='0'
	    		}else {
	    		  ret = value
	    		}
				
			 return ret
    	},
    	
    	getColor(value) {
			    var ret = ''
			    if (Object.is(value, null)) {
		    		ret =''
	    		}else {
	    		  value = value.replace(" check","")
	    		  value = value.replace(" exclamation","")
	    		  ret = value
	    		}
				
			 return ret
    	},
    	
    	
    	
    	getIcon(value) {
			    var ret = ''
			    if (Object.is(value, null)) {
		    		ret =''
	    		}else {
	    		  value = value.replace("green check","check_circle_outline")
	    		  value = value.replace("red exclamation","error_outline")
	    		  value = value.replace("black exclamation","error_outline")
	    		  ret = value
	    		}
				
			 return ret
    	},
      getStatusIcon(value) {
			    var ret = 'folder'
			    if (value == 'Open') { 
                      ret = 'folder_open'
                  } else if (value == 'Close') {
                      ret = 'folder'
                  }	 else if (value == 'Locked') {
                      ret = 'lock'	  	    		
	    		}
			 return ret
    	},

      getTRA(value){
        var myArray = []
        if (Object.is(value, null)) {
		    		value =''
	    	} else {
	    	 myArray = JSON.parse(value);
	    	}
        return myArray
      },

  },

}
</script>

<style>

.myitem {
  padding-bottom: 15px
}
    
</style>
