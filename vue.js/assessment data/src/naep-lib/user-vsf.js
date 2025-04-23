import Formatting from 'src/lib/formatting'

/**
 * Converts a TRA to displayable form
 * @param tra - Incoming TRA
 * @example
 * const acTra = {
  territoryCode: 21,
  stateCode: 'MD',
  regionCode: 1,
  areaCode: 2,
  staffID: 37740,
  roleTypeCode: 'AC',
  superTerritoryCode: 3
* }
* const display = traDisplay(tra)
* // display => '21:MD-1/2';
*
 * const hoTra = {
  territoryCode: null,
  stateCode: null,
  regionCode: null,
  areaCode: null,
  staffID: 37740,
  roleTypeCode: 'HO',
  superTerritoryCode: null
* }
* const display = traDisplay(tra)
* // display => '*:*-*\/*';
*/
function traDisplay(tra) {
  const nullIsStar = (value) => {
    return (value || null) === null ? '*' : value
  }
  return tra
    ? `${nullIsStar(tra.territoryCode)}:${nullIsStar(
        tra.stateCode
      )}-${nullIsStar(tra.regionCode)}/${nullIsStar(tra.areaCode)}`
    : ''
}

/**
 * Returns the type. Visit if everything is complete or tra if there are any nulls
 * @param tra - The formatted TRA
 */
function getFilterKind(tra) {
  return tra.territoryCode && tra.stateCode && tra.regionCode && tra.areaCode
    ? 'visit'
    : 'tra'
}

function traToolTipText(tra) {
  return `Territory: ${tra.territoryCode || '*'}, Region: ${
    tra.stateCode || '*'
  }-${tra.regionCode || '*'}, Area: ${tra.areaCode || '*'}`
}

function trasAreDifferent(tra1, tra2) {
  if (tra1 === null && tra2 === null) return false
  if (tra1 === null && tra2 !== null) return true
  if (tra1 !== null && tra2 === null) return true
  const areIdentical =
    tra1.territoryCode === tra2.territoryCode &&
    tra1.stateCode === tra2.stateCode &&
    tra1.regionCode === tra2.regionCode &&
    tra1.areaCode === tra2.areaCode
  return !areIdentical
}

function visitTooltipText(visit) {
  //  schoolName: 'School 039428',
  //  assessmentVisitDate: '01/25/2021',

  return `${
    visit.schoolName
  } to be assessed on ${Formatting.formatDateDayNameNoTimeNoYear(
    visit.scheduledAssessmentDate
  )}`
}

function traAdapter(tra, removeFn) {
  const removableTra = tra.alternate
  const result = {
    display: traDisplay(tra),
    tooltipText: traToolTipText(tra),
    removable: removableTra,
    removeFn: removableTra ? removeFn : () => false,
    ...tra,
    map(fn) {
      return [result].map(fn)
    },
  }
  return result
}

const visitAdapter = (visit, removeFn) => {
  const formattedDate = Formatting.formatDateDayNameNoTimeNoYear(
    visit.scheduledAssessmentDate
  )
  const result = {
    ...visit,
    tooltipText: visitTooltipText(visit),
    display: `${visit.schoolName} (${visit.gradeId}) on ${formattedDate}`,
    removable: true,
    removeFn,
    map(fn) {
      return [result].map(fn)
    },
  }
  return result
}

export function convertActiveTraToFilter(tra) {
  return {
    territory: tra.territoryCode ? String(tra.territoryCode) : undefined,
    stateregion: `${tra.stateCode}-${tra.regionCode}`,
    area: tra.areaCode,
  }
}

/**
 * Generates a new loggedInUser object
 * @param naepStorage - Type of storage which conforms to the storageAdapter interface
 * @param dataProvider - data provider with two methods: visitListForTra and validTras
 */
export function loggedInUserFactory(naepStorage) {
  function getter(callback) {
    return new Promise(async (resolve) => {
      const user = await naepStorage.readUser()
      const data = user || {}
      resolve(callback(data))
    })
  }

  function setter(newData) {
    return new Promise(async (resolve) => {
      const current = await naepStorage.readUser()
      const currentData = current || {}
      const currentUserData = currentData.user || {}
      const newUserData = newData.user || {}

      const userToken = {
        ...currentData,
        ...newData,
        user: {
          ...currentUserData,
          ...newUserData,
        },
      }

      await naepStorage.writeUser(userToken)
      resolve()
    })
  }

  function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  /**
   * @namespace loggedInUser
   */
  const storage = {
    /**
     * Resets the token. Takes an object
     * @param  newToken
     * @memberof loggedInUser
     * @async
     * @example
     * const newToken = {
     *   success: true,
     *   token: 'reset',
     *   refreshToken: 'Fpi7Dwe8UEHfNMta0aEXXGcxh63D5Ukv',
     *   issueTime: '8/20/2020 9:13:32 AM',
     *   expiredIn: 1200,
     *   expiredTime: '8/20/2020 9:33:32 AM'
     * }
     * await loggedInUser.resetToken(newToken)
     */
    resetToken(newToken) {
      return setter(newToken)
    },
    /**
     * For debugging purposes. Returns the underlying stored object
     * @memberof loggedInUser
     */
    $fullUserObject() {
      return getter((data) => data)
    },
    /**
     * Returns a list of breadcrumb objects
     * @async
     * @memberof loggedInUser
     * @returns [breadcrumbs] - Array of breadcrumbs
     */
    async breadcrumbs() {
      const loggedIn = await this.userLoggedIn()
      if (loggedIn) {
        const removeFnTra = async () => {
          await this.setActiveVisit(null)
          await this.setActiveTra(null)
        }
        const removeFnVisit = async () => {
          await this.setActiveVisit(null)
        }
        const result = [traAdapter(await this.getActiveTra(), removeFnTra)]
        if (await this.getActiveVisit())
          result.push(visitAdapter(await this.getActiveVisit(), removeFnVisit))
        return result
      } else {
        return []
      }
    },
    /**
     * Returns the full name and role of the user
     * @async
     * @memberof loggedInUser
     * @example
     * expect(await loggedInUser.fullNameAndRole()).toEqual('Valerie DUCK (AC)')
     */
    async fullNameAndRole() {
      const user = await getter((data) => data.user)
      return user
        ? `${user.firstname} ${user.lastname} (${
            user.tra.roleTypeCode || user.userRole
          })`
        : ''
    },
    /**
     * Returns the field area of the user
     * @async
     * @memberof loggedInUser
     * @example
     * expect(await loggedInUser.fieldArea()).toEqual('21:MD-1/2')
     */
    async fieldArea() {
      const user = await getter((data) => data.user)
      return traDisplay((user || {}).tra)
    },
    /**
     * Returns the filter kind <b>visit</b> or <b>tra</b>
     * @async
     * @memberof loggedInUser
     * @example
     * expect(await loggedInUser.filterKind()).toEqual('tra')
     */
    async filterKind() {
      const active = await this.getActiveTra()
      return await getFilterKind(active)
    },
    /**
     * Returns true if the current activeTRA is specific to the visit level
     * @async
     * @memberof loggedInUser
     */
    async traIsSpecific() {
      const active = await this.getActiveTra()
      return getFilterKind(active) === 'visit' ? true : false
    },
    /**
     * Returns true if the result of {$getActiveVisit} is not null
     * @async
     * @memberof loggedInUser
     */
    async isAssessmentShowing() {
      const activeVisit = await this.getActiveVisit()
      return (activeVisit || null) !== null
    },
    /**
     * Returns true if the breadcrumb list will allow a call to move back.
     * Returns false if the activeVisit is null and activeTra is the original for the user
     * @async
     * @memberof loggedInUser
     */
    async canMoveBack() {
      const activeVisit = await this.getActiveVisit()
      const activeTra = await this.getActiveTra()
      return activeVisit || null !== null || activeTra.alternate
    },
    /**
     * Moves the breadcrumbs back one step
     * @async
     * @memberof loggedInUser
     */
    async moveBack() {
      const activeVisit = await this.getActiveVisit()
      if (activeVisit) {
        await this.setActiveVisit(null)
      } else {
        await this.setActiveTra(null)
      }
    },
    /**
     * Returns the formatted TRA Filter for use by the GraphQL call
     * @async
     * @memberof loggedInUser
     */
    async traFilter() {
      const activeTra = await this.getActiveTra()
      return convertActiveTraToFilter(activeTra)
    },
    /**
     * @function userLoggedIn()
     * @description Returns true if the naepStorage shows the user is logged in. This is a synchronous call!
     * @memberof loggedInUser
     */
    userLoggedIn() {
      return naepStorage.signedIn
    },

    async tokenIssuedWithinMs(ms) {
      const issueTime = await getter((data) => data.issueTime)
      const currentIssueTime = Date.parse(issueTime)

      if (currentIssueTime) {
        const expirationTime = currentIssueTime + ms
        const currentTimeAsString = new Date().toISOString()
        const currentTime = Date.parse(currentTimeAsString)
        return expirationTime > currentTime
      } else {
        return false
      }
    },
  }

  const addGetterToStorage = (name, callback) => {
    storage[name] = () => getter((data) => callback(data))
  }

  const addAccessorToStorage = (name, getCallback, setCallback) => {
    const getCb = getCallback || (() => getter((data) => data[name]))
    const setCb =
      setCallback ||
      ((v) => {
        const result = {}
        result[name] = v
        return setter(result)
      })
    storage[`get${capitalize(name)}`] = getCb
    storage[`set${capitalize(name)}`] = setCb
  }

  const addBooleanGetterToStorage = (name, key) => {
    addGetterToStorage(name, (data) => (data ? data[key] || false : false))
  }

  const addBooleanAccessorToStorage = (name) => {
    addBooleanGetterToStorage(name, name)
    const setCb = (v) => {
      const result = {}
      result[name] = v
      return setter(result)
    }
    storage[`set${capitalize(name)}`] = setCb

    storage[`toggle${capitalize(name)}`] = async function () {
      const current = await getter((data) => data[name])
      const result = {}
      result[name] = !current
      await setter(result)
    }
  }

  /**
   * @function user()
   * @description Returns an object encapsulating user information
   * @async
   * @memberof loggedInUser
   */

  addGetterToStorage('user', (data) => data.user || {})
  /**
   * @function username()
   * @description Returns the username
   * @async
   * @memberof loggedInUser
   */
  addGetterToStorage('username', (data) => data.username || '')

  /**
   * @function userLoggedInOffline()
   * @description Returns true if the naepStorage shows the user is logged in and the current state is offline
   * @async
   * @memberof loggedInUser
   */
  addBooleanGetterToStorage('userLoggedInOffline', 'offline')
  /**
   * @function getToken()
   * @description Returns the current authentication token
   * @async
   * @memberof loggedInUser
   */
  /**
   * @function setToken(newToken)
   * @description Initializes the token. Pass null to clear the token
   * @async
   * @memberof loggedInUser
   */
  addAccessorToStorage('token')
  /**
   * @function getRefreshToken()
   * @description Returns the current refresh token
   * @async
   * @memberof loggedInUser
   */
  /**
   * @function setRefreshToken(newRefreshToken)
   * @description Initializes the refresh token. Pass null to clear the refresh token
   * @async
   * @memberof loggedInUser
   */
  addAccessorToStorage('refreshToken')
  /**
   * @function getShowPII()
   * @description Returns the current state for showing PII
   * @async
   * @memberof loggedInUser
   */
  /**
   * @function setShowPII(value)
   * @description Initializes the state for showing PII
   * @async
   * @memberof loggedInUser
   */
  /**
   * @function toggleShowPII(value)
   * @description Toggles the current state for showing PII
   * @async
   * @memberof loggedInUser
   */
  addBooleanAccessorToStorage('showPII')
  /**
   * @function getActiveVisit()
   * @description Returns the current active visit. Null if not set
   * @async
   * @memberof loggedInUser
   */
  /**
   * @function setActiveVisit(value)
   * @description Initializes the active visit
   * @async
   * @memberof loggedInUser
   */
  addAccessorToStorage('activeVisit')
  /**
   * @function getActiveTra()
   * @description Returns the current active TRA.
   * @async
   * @memberof loggedInUser
   */
  /**
   * @function setActiveTra(value)
   * @description Initializes the active TRA. Setting to null resets to the base TRA for the user
   * @async
   * @memberof loggedInUser
   */
  addAccessorToStorage(
    'activeTra',
    () => getter((data) => data.activeTra || (data.user || {}).tra || {}),
    async (v) => {
      if (v !== null) {
        v.alternate = true
      }
      const current = await storage.getActiveTra()
      const newValue = {
        activeTra: v,
      }
      if (trasAreDifferent(v, current)) {
        newValue.activeVisit = null
      }
      await setter(newValue)
    }
  )

  return storage
}
