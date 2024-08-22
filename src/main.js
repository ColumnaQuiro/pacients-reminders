import dotenv from 'dotenv'
import axiosInstance from './axiosInstance.js'
import WhatsAppSender from './WhatsAppSender.js'
import Patient from './models/Patient.js'
import sendSlack from './utils/sendSlack.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function generateAppointmentApiUrlForDay(daysFromToday) {
  const today = new Date()

  // Calculate the target date by adding daysFromToday
  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + daysFromToday)

  // Helper function to format date as YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Format target date
  const formattedDate = formatDate(targetDate)

  // Construct the start and end time for the whole day
  const startTime = `${formattedDate} 00:00:00`
  const endTime = `${formattedDate} 23:59:59`

  return `/appointments?start=between:${startTime},${endTime}`
}


// Function to call the API
export const sendPatientsReminders = async () => {
  sendSlack(`Starting sending patient reminders on ${new Date(Date.now()).toUTCString()}`)
  try {
    const appointmentData = await axiosInstance.get(generateAppointmentApiUrlForDay(1), {
    })
    const appointments = appointmentData.data.data
    for (const appointment of appointments) {
      await delay(50)
      if (appointment.status === 'pending') {
        const patientData = await axiosInstance.get(`/patients/${appointment.patient_id}`)
        const patientInstance = new Patient(patientData.data, appointment)
        const whatsappSender = new WhatsAppSender()
        const parameters = [
          {
            type: "text",
            text: patientInstance.getName()
          },
          {
            type: "text",
            text: patientInstance.getAppointmentDate()
          },
          {
            type: "text",
            text: patientInstance.getAppointmentTime()
          }
        ]
        whatsappSender.sendMessage({to: patientInstance.getPhone(), templateName: 'appointment_reminder', languageCode: patientInstance.getLocale(), parameters})
      }
    }
    sendSlack('Sending patient finished successfully')
  } catch (error) {
    sendSlack(`Error sending patient reminders: ${error.response ? error.response.data : error.message}`)
  }
}

dotenv.config()

