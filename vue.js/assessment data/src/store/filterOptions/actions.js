import subscribeable from 'src/naep-lib/subscribeable'

const subscriptions = {
  visitList: () => null,
  validTras: () => null,
}

function buildTraString(tra) {
  function nullIsEmpty(value, prefix) {
    return (value || null) === null ? '' : prefix + value
  }

  let result = ''
  result += nullIsEmpty(tra.territoryCode, 'T')
  result += nullIsEmpty(tra.stateCode, ':')
  result += nullIsEmpty(tra.regionCode, '-')
  result += nullIsEmpty(tra.areaCode, '/')
  return result
}

function getTraForMatching(traData, tra) {
  const normalized = buildTraString(tra)
  return traData.filter((x) => x.assignedFieldArea.includes(normalized))
}

export function clearVisitList({ commit }) {
  subscriptions.visitList()
  subscriptions.visitList = () => null
  commit('setVisitList', [])
}

export function clearValidTras({ commit }) {
  subscriptions.validTras()
  subscriptions.validTras = () => null
  commit('setValidTras', [])
}

export async function initializeVisitList(
  { commit },
  { naepDataSource, traFilter }
) {
  subscriptions.visitList()
  commit('visitListLoadingState', 'loading')
  commit('setVisitList', [])

  subscriptions.visitList = await subscribeable(
    await naepDataSource.runGetSampledGrades(
      { filter: traFilter },
      (result) => {
        commit('visitListLoadingState', 'loading')
        commit('setVisitList', result.data.GetSampledGrades.body || [])
        commit('visitListLoadingState', 'loaded')
      }
    )
  )
}

export async function initializeValidTras({ commit }, { naepDataSource, tra }) {
  subscriptions.validTras()
  commit('setValidTras', [])
  commit('validTrasLoadingState', 'loading')
  subscriptions.validTras = await subscribeable(
    await naepDataSource.runGetValidTRAList({}, (result) => {
      const ary = result.data.GetValidTRAList.body || []

      const validTras = getTraForMatching(
        ary.map((value) => {
          return {
            ...value,
            assignedFieldArea: `T${value.territoryCode}:${value.stateCode}-${value.regionCode}/${value.areaCode}`,
          }
        }),
        tra
      )

      commit(
        'setValidTras',
        validTras.sort((x, y) => {
          return x.assignedFieldArea < y.assignedFieldArea
            ? -1
            : x.assignedFieldArea === y.assignedFieldArea
            ? 0
            : 1
        })
      )
      commit('validTrasLoadingState', 'loaded')
    })
  )
}

export function finalizeFilterOptions(_) {
  subscriptions.validTras()
  subscriptions.validTras = () => null
  subscriptions.visitList()
  subscriptions.visitList = () => null
}

export function setDeviceIsOnline({ commit }, value) {
  commit('setDeviceIsOnline', value)
}
