import axios from 'axios'
import { WHATSAPP_API_MESSAGES } from "./constants/urls.js"

export default class WhatsAppSender {
  #apiUrl
  #authToken

  constructor() {
    this.#apiUrl = WHATSAPP_API_MESSAGES
    this.#authToken = process.env.WHATSAPP_API_TOKEN
    if (!this.#authToken) {
      throw new Error('WhatsApp API token is not defined in environment variables.')
    }
  }

  async sendMessage({ to, templateName, languageCode = 'en', parameters }) {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        components: [
          {
            type: "body",
            parameters
          }
        ]
      }
    }

    try {
      const response = await axios.post(this.#apiUrl, data, {
        headers: {
          Authorization: `Bearer ${this.#authToken}`,
          'Content-Type': 'application/json'
        }
      })
      console.log('Message sent successfully:', response.data)
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message)
    }
  }
}
