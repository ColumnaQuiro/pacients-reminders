import { onSchedule } from 'firebase-functions/v2/scheduler'
import { logger } from 'firebase-functions'
import { sendPatientsReminders } from './main.js'

export const patientRemindersOneDayBefore = onSchedule('0 9 * * *', async () => {
  logger.info('Starting patients reminders one day before')
  await sendPatientsReminders()
})

export const patientsRemindersThreeDaysBefore = onSchedule('5 9 * * *', async () => {
  logger.info('Starting patients reminders three days before')
  await sendPatientsReminders(3)
})
