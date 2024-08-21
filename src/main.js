import dotenv from 'dotenv'
import cron from 'node-cron'
import { PRACTICE_HUB_API } from './constants/urls.js'
import axiosInstance from './axiosInstance.js'
import WhatsAppSender from './WhatsAppSender.js'
import Patient from './models/Patient.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function generateAppointmentApiUrlForDay(daysFromToday) {
  // Get today's date
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

  // Construct the API URL with the date range for the specific day
  const apiUrl = `/appointments?start=between:${startTime},${endTime}`

  return apiUrl
}


// Function to call the API
const sendPatientsReminders = async () => {
  try {
    const appointmentData = await axiosInstance.get(generateAppointmentApiUrlForDay(1), {
    })
    const appointments = appointmentData.data.data
    for (const appointment of appointments) {
      await delay(1000)
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
      console.log('aquiii')
      // whatsappSender.sendMessage({to: patientInstance.getPhone(), templateName: 'appointment_reminder', languageCode: patientInstance.getLocale(), parameters})
    }
  } catch (error) {
    console.error('Error calling API:', error)
  }
}

dotenv.config()

await sendPatientsReminders()
