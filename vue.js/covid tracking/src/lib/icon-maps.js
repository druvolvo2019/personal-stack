export default function (icon) {
  const map = {
    CONTACT_NEEDED: {
      icon: 'error_outline',
      color: 'red',
    },
    CONTACTED: {
      icon: 'check_circle_outline',
      color: 'green',
    },
    NOT_READY: {
      icon: 'pause_circle_outline',
      color: 'orange',
    },
  }
  return map[icon] || { icon: 'report_problem', color: 'red' }
}
