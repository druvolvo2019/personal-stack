import subscribeable from 'src/naep-lib/subscribeable'
import schoolAdapter from 'src/lib/schoolAdapter'

function createVisitIdVars(visitId) {
  return {
    visitId,
  }
}

// ...mapActions('questionnaires', ['initializeBarcodes', 'initializeSchool']),
let unsubscribe = () => null
let notAlreadyRunningGuard = true
async function pipedInitializeVisit(
  context,
  { naepDataSource, activeVisit, proxyHandler, queryHasRun, store }
) {
  const { commit, dispatch } = context
  if (activeVisit && notAlreadyRunningGuard) {
    const { visitId, gradeId } = activeVisit
    if (visitId) {
      let refCount = 4
      const decRefCount = (result) => {
        if (!result.stale) {
          refCount -= 1
          if (refCount === 0) {
            queryHasRun()
          }
        }
      }
      notAlreadyRunningGuard = false
      const quexAnswers = naepDataSource.useGetQuexAnswers((result) => {
        commit(
          'surveyHistory',
          result.data.GetQuexAnswers && result.data.GetQuexAnswers.data
            ? result.data.GetQuexAnswers.data
            : []
        )
        decRefCount(result)
        notAlreadyRunningGuard = true
      })
      const sampledGrade = naepDataSource.useGetSampledGrade((result) => {
        const sampledGrade = result.data.GetSampledGrade.body
        // Weird cicumstances can cause the data to be null in the cache
        if (sampledGrade && sampledGrade.visitId) {
          commit('sampledGrade', sampledGrade)
          dispatch(
            'questionnaires/initializeSchool',
            schoolAdapter(store, sampledGrade, proxyHandler),
            {
              root: true,
            }
          )
          //console.log({ subjects: sampledGrade.availableSubjects })
          commit('subjects', sampledGrade.availableSubjects)
          decRefCount(result)
          notAlreadyRunningGuard = true
        }
      })
      const availableBarcodes = naepDataSource.useGetAvailableBarcodes(
        (result) => {
          const barcodes = result.data.GetAvailableBarcodes.body || []
          const barcodePayload = {
            school: barcodes.principalQuestionnaire,
            teachers: barcodes.teacherQuestionnaire,
          }
          commit('barcodes', barcodePayload)
          dispatch('questionnaires/initializeBarcodes', barcodePayload, {
            root: true,
          })
          decRefCount(result)
          notAlreadyRunningGuard = true
        }
      )
      const getNDA = naepDataSource.useGetNDA((result) => {
        const nda = result.data.GetNDA
        if (nda) {
          commit('ndas', nda.body || [])
          decRefCount(result)
          notAlreadyRunningGuard = true
        }
      })
      unsubscribe()
      const visitIdVar = createVisitIdVars(visitId)
      const action = naepDataSource.createRefreshTokenAndThenRunAnyActions(
        sampledGrade.prepare(visitIdVar),
        quexAnswers.prepare(visitIdVar),
        availableBarcodes.prepare({ gradeId }),
        getNDA.prepare(visitIdVar)
      )

      const localUnsubscribe = await subscribeable(action(queryHasRun))
      unsubscribe = () => {
        localUnsubscribe()
      }
    }
  }
}

async function sequentialInitializeVisit(
  context,
  { naepDataSource, activeVisit, proxyHandler, queryHasRun, store }
) {
  const { commit, dispatch } = context
  if (activeVisit && notAlreadyRunningGuard) {
    const { visitId, gradeId } = activeVisit
    if (visitId) {
      let refCount = 4
      const decRefCount = (result) => {
        if (!result.stale) {
          refCount -= 1
          if (refCount === 0) {
            queryHasRun()
          }
        }
      }
      notAlreadyRunningGuard = false
      const quexAnswers = naepDataSource.useGetQuexAnswers((result) => {
        commit('surveyHistory', result.data.GetQuexAnswers.body || [])
        decRefCount(result)
        notAlreadyRunningGuard = true
      })
      const sampledGrade = naepDataSource.useGetSampledGrade((result) => {
        const sampledGrade = result.data.GetSampledGrade.body
        commit('sampledGrade', sampledGrade)
        dispatch(
          'questionnaires/initializeSchool',
          schoolAdapter(store, sampledGrade, proxyHandler),
          {
            root: true,
          }
        )
        decRefCount(result)
        notAlreadyRunningGuard = true
      })
      const availableBarcodes = naepDataSource.useGetAvailableBarcodes(
        (result) => {
          const barcodes = result.data.GetAvailableBarcodes.body
          const barcodePayload = {
            school: barcodes.principalQuestionnaire,
            teachers: barcodes.teacherQuestionnaire,
          }
          commit('barcodes', barcodePayload)
          dispatch('questionnaires/initializeBarcodes', barcodePayload, {
            root: true,
          })
          decRefCount(result)
          notAlreadyRunningGuard = true
        }
      )
      const getNDA = naepDataSource.useGetNDA((result) => {
        const nda = result.data.GetNDA
        if (nda) {
          commit('ndas', nda.body)
          decRefCount(result)
          notAlreadyRunningGuard = true
        }
      })
      unsubscribe()
      const visitIdVar = createVisitIdVars(visitId)
      const action = naepDataSource.createRefreshTokenAndThenRunAnyActions(
        quexAnswers.prepare(visitIdVar),
        sampledGrade.prepare(visitIdVar),
        availableBarcodes.prepare({ gradeId }),
        getNDA.prepare(visitIdVar)
      )

      unsubscribe = await subscribeable(action(queryHasRun))
    }
  }
}

export function initializeVisit(context, args) {
  return pipedInitializeVisit(context, args)
}

export function finalizeVisit({ commit }) {
  unsubscribe()
  commit('surveyHistory', null)
  commit('sampledGrade', null)
  commit('barcodes', null)
  commit('ndas', null)
}

export function updateMakeupSession({ commit }, args) {
  commit('updateMakeupSession', args)
}
