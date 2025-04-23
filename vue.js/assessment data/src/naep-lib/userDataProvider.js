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

export default function dataProviderFactory(getNaepDataSource) {
  const manager = {
    visitListForTraUnsubscribe() {},
    validTrasUnsubscribe() {},
  }
  return {
    async visitListForTra(traFilter, callback) {
      manager.visitListForTraUnsubscribe()
      const naepDataSource = getNaepDataSource()
      manager.visitListForTraUnsubscribe = await naepDataSource.runGetSampledGrades(
        traFilter,
        (result) => {
          callback(result.body)
        }
      )
    },
    async validTras(activeTra, callback) {
      if (activeTra) {
        manager.validTrasUnsubscribe()
        const naepDataSource = getNaepDataSource()
        manager.validTrasUnsubscribe = await naepDataSource.runGetValidTRAList(
          {},
          (result) => {
            const values = result.body
              .map((result) => {
                return {
                  ...result,
                  assignedFieldArea: `T${result.territoryCode}:${result.stateCode}-${result.regionCode}/${result.areaCode}`,
                }
              })
              .sort((x, y) => {
                return x.assignedFieldArea < y.assignedFieldArea
                  ? -1
                  : x.assignedFieldArea === y.assignedFieldArea
                  ? 0
                  : 1
              })

            callback(getTraForMatching(values, activeTra))
          }
        )
      } else {
        callback([])
      }
    },
  }
}
