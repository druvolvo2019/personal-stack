 
 const Utils = {
     schoolCoordinatorData(coordinatorName, coordinatorTelephoneNumber) {
      var  schlcoord = ''
      
      if (!coordinatorName || coordinatorName == undefined || coordinatorName =='')
           schlcoord = coordinatorTelephoneNumber
      else if (!coordinatorTelephoneNumber || coordinatorTelephoneNumber == undefined || coordinatorTelephoneNumber =='')
           schlcoord  = coordinatorName
      else 
          schlcoord = coordinatorName + ', ' + coordinatorTelephoneNumber
      
      return schlcoord
     },
     
     assessCoordinatorData(assignedFieldArea,assignedAssessmentCoordinator) {
      var  assesscoord = ''
      
      if (!assignedFieldArea || assignedFieldArea == undefined || assignedFieldArea =='')
           assesscoord = assignedAssessmentCoordinator
      else if (!assignedAssessmentCoordinator || assignedAssessmentCoordinator == undefined || assignedAssessmentCoordinator =='')
           assesscoord  = assignedFieldArea
      else 
          assesscoord = assignedFieldArea + '—' + assignedAssessmentCoordinator
      
      return assesscoord
     },
     
     getGroupName(group) {
      
      var groupname = '';
      var sessId = group.sessId;
      
      if (group.type == 'Accommodation') {
        groupname= group.sessId +'-'+ group.label;
      } else {
        groupname= group.sessId + '-' + group.label + sessId.substring(sessId.length - 1, sessId.length);
       
      }
      return groupname;
     },
     
     getStudentGroupName(s) {
       
       var r = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J', 'K', 'L', 'M', 'N']; //regular sessions
       if (r.includes(s.group)) {
        return s.assignedSessId + '-' + s.group + s.assignedSessId.substring(s.assignedSessId.length - 1, s.assignedSessId.length);
       } else {
         return s.assignedSessId + '-' + s.group;
       }
       
     },

     getStudentSessionLineNumber(s) {
               
        return s.session + '/' + (s.lineNumber < 10 ? '0' + s.lineNumber : s.lineNumber);        
        
      }

}

export default Utils