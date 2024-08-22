import axios from 'axios'

export default (text) => {
  try {
    axios.post(process.env.SLACK_CHANNEL, {
      text
    })
  } catch (e){
    console.error('Error sending a slack')
  }
}
