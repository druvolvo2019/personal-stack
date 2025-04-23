import filterFactory, {
  dateCompareFactory,
  exactMatch,
  openComparison,
  startsWithMatch,
} from './filter'

import { parse } from './quick-search-parser'

export default function incidentFilter(rawFilter, data) {
  return filterFactory(data, (filters) => {
    const { text, ...rest } = rawFilter
    const parsedText = parse(text || '')
    const filter = {
      ...rest,
      ...parsedText,
    }

    filters.add(dateCompareFactory, filter.date, 'fldcreateddt')
    filters.add(exactMatch, filter.status, 'incidentstatus')
    filters.addOrs(startsWithMatch, filter.tra, 'tra')
    filters.addOrs(openComparison, filter.___text, [
      'fldwinsid',
      'cifreferenceid',
      'tra',
      'incidentSchools.naepid',
      'incidentSchools.schoolName',
      'incidentSchools.districtName',
      'incidentSchools.jurisdiction',
    ])
  })
}
