/* LM: obsolete file
const HEADER_CAPTION = 'NAEP 2021 Virtual School Folders'

**
 * @classdesc HeaderInfo
 * HeaderInfo encapsulates all the data needed to display the MainHeader bars in VSF.
 * The main access point is the changeRoute(newPath) function, which will return the
 * customized object for each page.
 * setSchoolNameDisplay(name) so list can set it directly when card is selected
 * setVisitID  so list can set it directly when card selected set both?
 *
export const headerInfo = {
  getStoredHeader() {
    const hi = sessionStorage.getItem('headerinfo')
    return JSON.parse(hi)
  },
  getHeader() {
    // Provisionally revise to get information from loggedInUser where appropriate
    let res = {
      headerCaption: HEADER_CAPTION,
      authenticated: headerInfo.authenticated(),

      // below are shown if authenticated
      userNameWithRole: headerInfo.userNameWithRole(),
      userAreaCaption: headerInfo.userAreaCaption(),
      showPII: headerInfo.showPII(),
      userTraData: headerInfo.userTraData(),

      isAssessmentShowing: headerInfo.isAssessmentShowing(),
      //below is shown if assessmentShowing
      schoolNameDisplay: headerInfo.schoolNameDisplay()
    }
    return res
  },

  isAssessmentShowing() {
    return sessionStorage.getItem('assessmentShowing') === 'true' //this.isAssessmentShowing
    //      return (this.$router.currentRoute.fullPath == '/schoolDetails')
  },
  schoolNameDisplay() {
    return sessionStorage.getItem('visitCaption')
  },

  setSchoolInfo(id, caption) {
    sessionStorage.setItem('assessmentShowing', 'true')
    sessionStorage.setItem('visitID', id)
    sessionStorage.setItem('visitCaption', caption)
  },
  clearAssessmentShowing() {
    sessionStorage.setItem('assessmentShowing', 'false')
  },
  **
   * Called when the page has changed.
   * @param {string} newPath
   * Returns the customized HeaderInfo object for that page.
   *
  changeRoute(newPath) {
    switch (newPath) {
      case '/':
        return headerInfo.loginHeader()
      case '/schoolList':
        return headerInfo.listHeader()
      case '/schoolDetails':
        return headerInfo.detailsHeader()
    }
  },
  loginHeader() {
    return {
      headerCaption: HEADER_CAPTION
    }
  },
  listHeader() {
    sessionStorage.setItem('assessmentShowing', 'false')
    return this.getHeader()
  },
  detailsHeader() {
    return this.getHeader()
  }
}
*/
