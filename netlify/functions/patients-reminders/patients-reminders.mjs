import { schedule } from '@netlify/functions'
import { sendPatientsReminders } from '../../../src/main.js'

export const handler = schedule('9 0 * * *', async (event) => {
  await sendPatientsReminders()
  return {
    statusCode: 200
  }
})
