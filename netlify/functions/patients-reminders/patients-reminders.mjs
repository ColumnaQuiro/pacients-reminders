import { schedule } from '@netlify/functions'
import { sendPatientsReminders } from '../../../src/main.js'

export const handler = schedule('0 7 * * *', async (event) => {
  await sendPatientsReminders()
  return {
    statusCode: 200
  }
})
