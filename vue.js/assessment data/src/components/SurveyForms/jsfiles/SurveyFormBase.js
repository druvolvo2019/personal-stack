import QuestionType from './questionType'
import { YesNo, YesNoNA, displayName } from './enums'

export const ifYesDescribeLabel = 'If yes, please describe...'

const valueTag = (field) => `${field}-value`

const reasonTag = (field) => `${field}-reason`

const getFieldValue = (field) => (response) => {
  return response && response[field] ? response[field].value : null
}

const getFieldReason = (field) => (response) => {
  return response && response[field] ? response[field].reason : null
}

/* eslint-disable-next-line */
export const staticLabel = (id, caption, description, _class) => ({
  id,
  type: QuestionType.STATIC,
  caption,
  description,
  class: _class,
})

export const valueCheckbox = (
  id,
  field,
  questionId,
  choiceId,
  val,
  caption,
  disable,
  _class,
  textEnable = enableOnYes
) => ({
  id,
  getter: getFieldValue(field),
  tag: valueTag(field),
  questionId,
  choiceId,
  type: QuestionType.CHECKBOX,
  val,
  caption,
  disable,
  class: _class,
  textEnable,
})

/**
 *
 * @param {*} id
 * @param {*} field
 * @param {*} questionId
 * @param {*} choiceId
 * @param {*} val
 * @param {*} caption
 * @param {*} textEnable - defaults to enabling textboxes on Yes value
 *   pass in enableOnNoOrNA to disable textbox on Yes
 * @param {*} _class
 */
export const valueRadio = (
  id,
  field,
  questionId,
  choiceId,
  val,
  caption,
  _class,
  textEnable = enableOnYes
) => ({
  id,
  getter: getFieldValue(field),
  tag: valueTag(field),
  questionId,
  choiceId,
  type: QuestionType.RADIO_BUTTON,
  val,
  caption,
  textEnable,
  class: _class,
})

/**
 * Note: any writeins must have a "field" tag that ends in -text in case this
 * text response is for a different question.  Text and Value coordination is
 * handled by setTheFieldValue method.
 *
 * Enabling of reason text boxes is a two-step affair.
 *
 * The disable param for reasonWriteIn tells the Control whether it can be
 * enabled or not for display.
 *
 *  But the textbox behavior is often dependent upon which Radio button was selected.
 * Radio buttons have a parameter which defaults to the behavior of enabling
 * text boxes when the Yes radio is chosen.  When needed, this behavior can be
 * changed to enabling when the No or Not Applicable radios are chosen.
 * The Radio button textEnable parameter will also control whether any text of
 * the reason textbox is displayed or hidden when the responses are updated after
 * a radio is selected.
 *
 * @param {*} id
 * @param {*} field
 * @param {*} questionId
 * @param {*} choiceId
 * @param {*} caption
 * @param {*} placeholder
 * @param {*} disable
 * @param {*} _class
 */
export const reasonWriteIn = (
  id,
  field,
  questionId,
  choiceId,
  caption,
  placeholder,
  disable,
  _class
) => ({
  id,
  getter: getFieldReason(field),
  tag: reasonTag(field),
  questionId,
  choiceId,
  type: QuestionType.WRITE_IN,
  caption,
  placeholder,
  disable,
  class: _class,
})

/**
 * This operates the same as WriteIn, but has about 6 lines of text instead of single line input.
 *
 * @param {*} id
 * @param {*} field
 * @param {*} questionId
 * @param {*} choiceId
 * @param {*} caption
 * @param {*} placeholder
 * @param {*} disable
 * @param {*} _class
 */
export const reasonTextArea = (
  id,
  field,
  questionId,
  choiceId,
  caption,
  placeholder,
  disable,
  _class
) => ({
  id,
  getter: getFieldReason(field),
  tag: reasonTag(field),
  questionId,
  choiceId,
  type: QuestionType.TEXT_AREA,
  caption,
  placeholder,
  disable,
  class: _class,
})

/**
 *
 * @param {*} id
 * @param {*} field
 * @param {*} questionId
 * @param {*} choiceId
 */
export const selectText = (id, field, questionId, choiceId) => ({
  id,
  getter: getFieldValue(field),
  tag: valueTag(field),
  questionId,
  choiceId,
  type: QuestionType.SELECT,
  ref: field,
})

/**
 * Note: there is no field or value associated with this control.
 * This displays a collapsible list of string items for information only.
 *
 * @param {*} id
 * @param {*} caption
 * @param {*} items
 */
export const staticList = (id, caption, items) => ({
  id,
  caption,
  items,
  type: QuestionType.STATIC_LIST,
})

export const writeInDisable = (field, reasonEnable) => (response) =>
  !response || !response[field] || !reasonEnable(response[field].value)

export const yesNoNAReasonEnable = (value) =>
  value === YesNoNA.YES || value === YesNo.YES

export function yesNoNAReasonEnableOnNo(value) {
  const res = !yesNoNAReasonEnable(value)
  return res
}

export const enableExceedDidNotMeet = (value) =>
  value === 'Exceeded' || value === 'Did Not Meet'

export const notVeryNotAtAllReasonEnable = (value) =>
  value === 'Not very confident' || value === 'Not at all confident'

export const otherReasonEnable = (value) => value

export const yesReasonEnable = (value) => value === 'Yes' || value === 'Sí'

export const enableOnYes = true
export const enableOnNoOrNA = false

export const neverDisable = (field, reasonEnable) => (response) => false
// for testing
export const alwaysEnable = (field, reasonEnable) => (response) => true

function setRespFieldValue(
  field,
  questionId,
  choiceId,
  newValue,
  responses,
  id,
  textEnable
) {
  if (!responses) {
    responses = {}
  }
  if (!responses[field]) {
    responses[field] = {
      value: null,
      reason: null,
      _reason: null,
    }
  }
  if (responses && responses[field]) {
    responses[field] = {
      questionId: questionId,
      choiceId: choiceId,
      id: id,
      value: newValue,
      textTag: responses[field].textTag ? responses[field].textTag : null,
    }
  }
  // now save / hide / show the reason text
  const textField = responses[field].textTag
  if (field !== textField && responses && responses[textField]) {
    const reasonEnable = textEnable
      ? yesNoNAReasonEnable
      : yesNoNAReasonEnableOnNo

    // if this is a checkbox, the value is boolean
    const isCheckbox = newValue === true || newValue === false

    // if checkbox, shouldEnable is the newValue
    // else, the normal enabling
    const shouldEnable = isCheckbox
      ? newValue
      : textEnable !== null
      ? reasonEnable(newValue)
      : false

    responses[textField] = {
      questionId: responses[textField].questionId,
      choiceId: responses[textField].choiceId,
      id: responses[textField].id,
      reason: shouldEnable ? responses[textField]._reason : null,
      _reason: responses[textField]._reason,
    }
  }
  return responses
}

// if you can edit the Reason, its enabled!
function setRespFieldReason(
  field,
  questionId,
  choiceId,
  newReason,
  responses,
  parentTag,
  id
) {
  if (!responses) {
    responses = {}
  }
  if (!responses[field]) {
    responses[field] = {
      questionId: questionId,
      choiceId: choiceId,
      id: id,
      value: null,
      reason: null,
      _reason: null,
    }
  }
  responses[field] = {
    questionId: responses[field].questionId,
    choiceId: responses[field].choiceId,
    id: responses[field].id,
    value: responses[field].value,
    reason: newReason,
    _reason: newReason,
  }
  // now tell the parent where to find the text
  if (parentTag !== field) responses[parentTag].textTag = field
  return responses
}

export function setTheFieldValue(
  atag,
  aquestid,
  achoiceid,
  avalue,
  responses,
  id,
  textEnable
) {
  var idx = atag.lastIndexOf('-')
  const afield = atag.substr(0, idx)
  const atype = atag.substr(idx, 200)
  if (atype === '-value')
    return setRespFieldValue(
      afield,
      aquestid,
      achoiceid,
      avalue,
      responses,
      id,
      textEnable === 'undefined' ? null : textEnable
    )
  else {
    // is it a text response?
    idx = afield.lastIndexOf('-')
    const textInd = afield.substr(idx, 200)
    const parentTag = textInd === '-text' ? afield.substr(0, idx) : afield
    return setRespFieldReason(
      afield,
      aquestid,
      achoiceid,
      avalue,
      responses,
      parentTag,
      id
    )
  }
}

export function updateFunction(responses, args) {
  return setTheFieldValue(
    args.tag,
    args.questionId,
    args.choiceId,
    args.value,
    responses,
    args.id,
    args.textEnable
  )
}
// LM: mods -------------------------------

export function getResponseChangesForDB(qid, responses) {
  const keys = Object.keys(responses)

  var result = {
    quexId: qid,
    visitId: 'tobeenteredlater',
    changes: [],
    redflag: false,
  }

  keys.forEach((key) => {
    const resp = responses[key]

    if (resp.value || resp.reason) {
      const obj = {
        tag: key,
        questionId: resp.questionId,
        choiceId: resp.choiceId,
        value: resp.value,
      }
      if (redFlagResponse(key, resp.choiceId, qid)) {
        obj.redflag = true
        result.redflag = true
      }
      if (resp.reason !== null) obj.reasontext = resp.reason
      if (obj.value !== false) result.changes.push(obj)
    }
  })
  // console.log("getResponseChangesForDB returning ", result);
  return result
}

function redFlagResponseLegacy(tag, choiceId) {
  console.log('redFlagResponseLegacy', tag, choiceId)
  // attention from supervisor
  if (tag === '402-1-super' && choiceId === 1) return true
  const redTags = [
    // UNSATISFACTORY PRE SC AND OBS
    '1-1-exp',
    '2-1-org',
    '3-1-arr',
    '3-1-know',
    '4-1-org',
    '4-1-know',
    '5-1-know',
    '204-1-eff',
    '205-1-prof',
    '301-1-staff',
    '302-1-students',
    '303-1-accomm',
    '304-1-covid',
    '201-1-arr',
    '202-1-org',
    '203-1-know',
    // FAIR POOR PRE SC AND OBS
    '1-1-overall',
    '2-1-overall',
    // NEGATIVELY SC AND OBS
    '401-1-students',
    '401-1-overall',
  ]
  return redTags.includes(tag) && [3, 4].includes(choiceId)
}

function redFlagResponse2022Ext(tag, choiceId) {
  // console.log("redFlagResponse2022Ext", tag, choiceId);
  // attention from supervisor
  if (tag === 'supervisor-attention' && choiceId === 1) return true
  const redTags34 = [
    // EXTERNAL SURVEYS 2022 PRE
    'overall', // 502
    'will-go-smoothly', // 507

    // EXTERNAL SURVEYS 2022 ASS
    'overall-team', // 513
    'student-experience', // 525
    'student-experience', // 525
  ]
  var hasRedFlag = redTags34.includes(tag) && [3, 4].includes(choiceId)
  if (hasRedFlag) return hasRedFlag
  const redTags45 = [
    // EXTERNAL SURVEYS 2022 PRE
    'org-preparedness', // 505
    'prof-courtesy', // 506

    // EXTERNAL SURVEYS 2022 ASS
    'arrive-on-time', // 516
    'organization-preparedness', // 517
    'professionalism-courtesy', // 518
    'interactions-staff', // 521
    'interactions-students', // 522
    'implement-acommodations', // 523
    'implementing-covid', // 524
  ]
  return redTags45.includes(tag) && [4, 5].includes(choiceId)
}

function redFlagsFor0706(tag, choiceId) {
  // attention from supervisor
  if (tag === 'supervisor-attention' && choiceId === 1) return true
  const redTags34 = [
    'overall', // 512
    'overall-team', // 513
  ]
  var hasRedFlag = redTags34.includes(tag) && [3, 4].includes(choiceId)
  return hasRedFlag
}

function redFlagResponse(tag, choiceId, qid) {
  switch (qid) {
    /*
    case 'deb':
      return '0601-vsf'
    case 'fso':
      return '0603-vsf'
    case 'deb22':
      return '0701-vsf'
    case 'asd':
      return '0703-vsf'
    case 'aaob':
      return '0704-vsf'
*/
    case '0705-vsf':
    case '0707-vsf':
      return redFlagResponse2022Ext(tag, choiceId)

    case '0706-vsf':
      return redFlagsFor0706(tag, choiceId)
    default:
      return redFlagResponseLegacy(tag, choiceId)
  }
}

// ------------------------- nodes ---------------------------------

function convertRespsToChildren(quest) {
  if (quest.children) {
    quest.children = quest.children.map((x) => convertRespsToChildren(x))
  }
  if (quest.resps) {
    quest.children = quest.resps.map((x) => convertRespsToChildren(x))
    quest.resps = null
  }
  return quest
}

function convertToHTML(quest) {
  let txt = `<p>${quest.label}</p>`
  if (quest.children) {
    quest.children.forEach((x) => (txt += convertToHTML(x)))
  }

  if (quest.resps && quest.resps.length > 0) {
    let rlist = '<ul>'
    quest.resps.forEach((x) => {
      rlist += `<li ${x.redflag ? 'style="background-color: yellow"' : ''}>${
        x.label
      }</li>`
    })
    txt += rlist + '</ul>'
  }
  return txt
}

export function qnrAsHTML(resps, quests) {
  const nodes = qnrToNodes(resps, quests)
  const asHtml = nodes.map((x) => convertToHTML(x))
  return asHtml.join('\n')
}

// LM: dont know what the diff is - this is from VSF
export function vsfQnrAsHTML(resps, quests) {
  // this method is called with a response array!
  const responses = resps.map((x) => {
    const obj = Object.assign({}, x)
    obj.questionId = parseInt(x.questionId)
    return obj
  })
  console.log('vsfQnrAsHTML converted resp', responses)
  const nodes = qnrToNodes(responses, quests)
  const asHtml = nodes.map((x) => convertToHTML(x))
  return asHtml.join('\n')
}

export function qnrAsNodeArr(resps, quests) {
  // this method is called with a response array!
  resps = resps.map((x) => {
    x.questionId = parseInt(x.questionId)
    return x
  })

  var results = qnrToNodes(resps, quests)
  // convert from list to tree format
  results = results.map((x) => convertRespsToChildren(x))
  return results
}

export function qnrToNodes(resps, quests) {
  var results = []

  // This is from VSF for 0704-vsf qnr
  resps.forEach((r) => {
    if (r.questionId === 481)
      results.push({ label: `AA Name: ${r.reasontext}` })
    if (r.questionId === 482)
      results.push({ label: `Session number: ${r.reasontext}` })
    if (r.questionId === 483)
      results.push({ label: `Group Name: ${r.reasontext}` })
  })

  quests.forEach((q) => {
    var node = { label: q.caption }
    results.push(node)
    // console.log("qnrAsNodeArr cap", q.caption, q, resps);
    if (q.description !== 'section header') {
      const isGrid = q.type && q.type === QuestionType.GRID
      if (q.children) {
        const resp = isGrid
          ? gridGetNodesForQuestion(q, resps)
          : getRespNodesForQuestion(q.children, resps)
        if (isGrid) node.children = resp
        else node.resps = resp
      }
    }
  })
  return results
}

// the controls represent questions with response children
export function gridGetNodesForQuestion(quest, resps) {
  var results = []
  const controls = quest.children

  controls.forEach((x) => {
    if (x.children) {
      const chresp = gridGetChildNodes(x, resps)
      if (chresp) results.push(chresp)
    }
  })

  return results
}

function noDupes(arr) {
  var results = []
  arr.forEach((x) => {
    const haveIt = results.find((y) => y.label === x.label)
    // console.log('noDupes item present', x, haveIt)
    if (!haveIt) results.push(x)
  })
  return results
}

function gridGetChildNodes(quest, resps) {
  var results = null
  const controls = quest.children
  if (!controls) return results
  const caption = controls[0].caption

  // console.log("gridGetChildNodesA caption controls", caption, controls);
  const a = findMatchingNodeResps(controls, resps)
  if (a.length > 0) {
    var item = {
      label: caption,
      resps: a,
    }
    results = item
  }
  return results
}

// gets the responses for this question
function getRespNodesForQuestion(controls, resps) {
  var results = []
  controls.forEach((ctl) => {
    const ans = resps.filter(
      (resp) =>
        ctl.questionId === resp.questionId && ctl.choiceId === resp.choiceId
    )
    //   if (ans.length > 0)
    //    console.log("getRespNodesForQuestion resp  ctl", ans, ctl);
    ans.forEach((a) => {
      if (a.reasontext)
        results.push({ label: a.reasontext, redflag: a.redflag })
      else results.push({ label: ctl.caption, redflag: a.redflag })
    })
  })
  // if (results.length > 0) console.log("getRespNodesForQuestion results", results);

  return results
}

// must lookup by going through responses and finding matching control
// remember that response can have both value and text,
export function findMatchingNodeResps(controls, resps) {
  var results = []
  resps.forEach((resp) => {
    const ctls = controls.filter(
      (c) => c.questionId === resp.questionId && c.choiceId === resp.choiceId
    )
    // console.log('findMatchingNodeResps resp  ctl', resp, ctls)
    ctls.forEach((ctl) => {
      if (ctl.val)
        results.push({ label: displayName(ctl.val), redflag: resp.redflag })
      if (resp.reasontext)
        results.push({ label: resp.reasontext, redflag: resp.redflag })
    })
  })

  return noDupes(results)
}

// ----------------------------------------------------------------

export function getSymbolValForControl(controls, qid, cid) {
  const s = findCtlForResp(controls, qid, cid)
  const ctl = s.length > 0 ? s[0] : null
  if (ctl) {
    if (ctl.type === QuestionType.CHECKBOX) return true
    else return ctl.val
  }
  return null
}

function findCtlForResp(controls, qid, cid) {
  var results = []
  controls.forEach((q) => {
    if (q.children) {
      const c = findCtlForResp(q.children, qid, cid)
      results = [...results, ...c]
    }
    if (q.questionId === qid && q.choiceId === cid) results.push(q)
  })
  return results
}

// -----------
