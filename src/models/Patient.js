export default class Patient {
  constructor(patientData, appointmentData) {
    this.firstName = patientData.first_name
    this.lastName = patientData.last_name
    this.locale = patientData.locale
    this.phone = patientData.numbers.length > 0 ?
      `+${patientData.numbers[0].country_code}${patientData.numbers[0].number.replace(/\s/g, '')}`
      : ''
    this.appointmentDate = this.formatDate(appointmentData.start)
    this.appointmentTime = this.formatTime(appointmentData.start)
  }

  // Method to format date as DD/MM/YYYY
  formatDate(dateTime) {
    const dateObj = new Date(dateTime)
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Method to format time as HH:MM
  formatTime(dateTime) {
    const dateObj = new Date(dateTime)
    const hours = String(dateObj.getHours()).padStart(2, '0')
    const minutes = String(dateObj.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  getName() {
    return `${this.firstName} ${this.lastName}`.trim()
  }

  getPhone() {
    return this.phone
  }

  getAppointmentDate() {
    return this.appointmentDate
  }

  getAppointmentTime() {
    return this.appointmentTime
  }

  getLocale() {
    return this.locale
  }
}
