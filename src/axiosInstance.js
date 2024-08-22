import axios from 'axios'
import { PRACTICE_HUB_API } from './constants/urls.js'

const instance = axios.create({
  baseURL: PRACTICE_HUB_API,
  headers: {
    'x-practicehub-key': '1NIdhNcm05TJ9JBBGLMmwjfQchTCSa99',
    'x-app-details': 'app_name=columnaquiropracticehub@practicehub.io'
  }
})

export default instance
