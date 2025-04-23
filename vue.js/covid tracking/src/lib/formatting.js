import { date } from 'quasar'

function insureTime(astr) {
  if (!astr.includes('T')) return astr + ' 00:00:00.000 GMT-5'
  // midnight EST
  else return astr
}

const Formatting = {
  formatDateDayNameNoTimeNoYear(assessmentVisitDate) {
    if (!assessmentVisitDate || assessmentVisitDate == undefined) return ''
    assessmentVisitDate = insureTime(assessmentVisitDate)
    var timeStamp = new Date(assessmentVisitDate)
    timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
    const result = date.formatDate(timeStamp, 'ddd, MMM D')
    if (result) return result
    else return ''
  },

  formatDateDayNameAndTimeNoYear(datestr) {
    if (!datestr || datestr == undefined) return ''
    datestr = insureTime(datestr)
    var timeStamp = new Date(datestr)
    timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
    const result = date.formatDate(timeStamp, 'ddd, MMM D, h:mm A')
    if (result) return result
    else return ''
  },

  formatFullTimestamp(datestr) {
    if (!datestr || datestr == undefined) return ''
    datestr = insureTime(datestr)
    var timeStamp = new Date(datestr)
    timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
    const result = date.formatDate(timeStamp, 'ddd, MMM D, YYYY h:mm A')
    if (result) return result
    else return ''
  },

  formatPhoneNumber(rawphonestr) {
    if (!rawphonestr || rawphonestr == undefined) return ''
    const phone = rawphonestr
    var ext = ''
    if (phone.length > 10) ext = ' x' + phone.substring(10, phone.length) //13)
    return (
      '(' +
      phone.substring(0, 3) +
      ') ' +
      phone.substring(3, 6) +
      '-' +
      phone.substring(6, 10) +
      ext
    )
  },

  formatStartAndEndTime(starttimestr, endtimestr) {
    if (!starttimestr || !endtimestr) return ''
    if (starttimestr != '') {
      if (endtimestr != '') return starttimestr + ' - ' + endtimestr
      else {
        return starttimestr
      }
    } else {
      return ''
    }
  },

  // if passed a raw phone string, format it
  combineNameAndPhone(anamestr, aphonestr) {
    if (!anamestr || anamestr == undefined) return ''
    if (!aphonestr || aphonestr == undefined) aphonestr = ''
    // if no formatted area code, format the phone input
    if (!aphonestr.match(/\(\d{3}\)./)) {
      aphonestr = this.formatPhoneNumber(aphonestr)
    }
    if (anamestr != '') {
      if (aphonestr != '') {
        return anamestr + ', ' + aphonestr
      } else {
        return anamestr
      }
    } else {
      return ''
    }
  },

  // if passed a raw phone string, do not format it
  combineNameAndPhoneNoFormatting(anamestr, aphonestr) {
    if (!anamestr || anamestr == undefined) return ''
    if (!aphonestr || aphonestr == undefined) aphonestr = ''
    if (anamestr != '') {
      if (aphonestr != '') {
        return anamestr + ', ' + aphonestr
      } else {
        return anamestr
      }
    } else {
      return ''
    }
  },

  // originally for adding 70 mins to starttime to build a dismissal time
  addMinutesToTime(starttimestr, numMins) {
    if (!starttimestr || starttimestr == undefined) return ''
    if (starttimestr.match(/\d\d:\d\d (AM|PM)/)) {
      const [timepart, ampm] = starttimestr.trim().split(' ')
      const [hours, minutes] = timepart.split(':')
      const hours24 = ampm === 'PM' ? parseInt(hours) + 24 : parseInt(hours)
      let newDate = date.buildDate({ hours: hours24, minutes: minutes })
      newDate = date.addToDate(newDate, { minutes: numMins })
      return date.formatDate(newDate, 'hh:mm A')
    } else {
      const [hours, minutes] = starttimestr.split(':')
      let newDate = date.buildDate({ hours: hours, minutes: minutes })
      newDate = date.addToDate(newDate, { minutes: numMins })
      return date.formatDate(newDate, 'hh:mm A')
    }
  },

  //date formating Month and day: January 1
  formatDateMonthNameAndDayNoYear(datestr) {
    if (!datestr || datestr == undefined) return ''
    datestr = insureTime(datestr)
    var timeStamp = new Date(datestr)
    timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
    const result = date.formatDate(timeStamp, 'MMMM D')
    if (result) return result
    else return ''
  },

  dbStringFromDateString(datestr) {
    var timeStamp = new Date(datestr)
    timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
    console.log(
      'dbString',
      timeStamp.toISOString(),
      timeStamp.toLocaleString(),
      timeStamp.toUTCString(),
      date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    )
    return timeStamp.toISOString()
  },

  dateTimeStringFromDbString(datestr) {
    var timeStamp = new Date(datestr)
    timeStamp.setTime(timeStamp.getTime()+timeStamp.getTimezoneOffset()*60*1000)
    /*   console.log(
      'dateTimeStringFromDbString in iso locale utc format',
      datestr,
      '/',
      timeStamp.toISOString(),
      '/',
      timeStamp.toLocaleString(),
      '/',
      timeStamp.toUTCString(),
      '/',
      date.formatDate(timeStamp, 'MM/DD/YYYY h:mm A')
    )*/
    return date.formatDate(timeStamp, 'MM/DD/YYYY h:mm A')
  }
}

export default Formatting
