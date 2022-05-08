import express from 'express'
import dialogflow from 'dialogflow-fulfillment'
import moment from 'moment-timezone'
import firebase from 'firebase/compat/app'
import { getDatabase, ref, set, child } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBtvDsDRvUXAGexWcTljuhEYLE3rUlELlk',
  authDomain: 'iot-project-3c354.firebaseapp.com',
  databaseURL: 'https://iot-project-3c354-default-rtdb.firebaseio.com/',
  projectId: 'iot-project-3c354',
  storageBucket: 'iot-project-3c354.appspot.com',
  messagingSenderId: '247184102341',
  appId: '1:247184102341:web:e37f258aa38d109ffcf1ac',
  measurementId: 'G-7F2ZFMSW7Y',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = getDatabase()

const app = express()

app.get('/', (req, res) => {
  res.send('hello world!!!')
})

app.post('/', express.json(), (req, res) => {
  const agent = new dialogflow.WebhookClient({
    request: req,
    response: res,
  })
  const ControlLight1 = (agent) => {
    const value = agent.parameters.status
    let status = false
    if (value == 'on' || value == 'bật') {
      status = true
    }
    let timeZone = moment.tz('Asia/Ho_Chi_Minh')
    let date = timeZone.format('YYYY-MM-DD')
    let time = timeZone.format('HH:mm:ss')
    let dateTime = date + ', ' + time

    set(ref(db, '/IOT-DEVICES/led1'), {
      status: status,
      time: dateTime,
    })
    // db.child('led1').push({
    //   status: status,
    //   time: dateTime,
    // })
    if (value == 'bật' || value == 'tắt') {
      agent.add(`Đèn phòng khách đã được ${value}`)
    } else {
      agent.add(`The living room light is ${value}`)
    }
  }
  const ControlLight2 = (agent) => {
    const value = agent.parameters.status
    let status = false
    if (value == 'on' || value == 'bật') {
      status = true
    }
    let timeZone = moment.tz('Asia/Ho_Chi_Minh')
    let date = timeZone.format('YYYY-MM-DD')
    let time = timeZone.format('HH:mm:ss')
    let dateTime = date + ', ' + time

    set(ref(db, '/IOT-DEVICES/led2'), {
      status: status,
      time: dateTime,
    })
    // db.child('led2').push({
    //   status: status,
    //   time: dateTime,
    // })
    if (value == 'bật' || value == 'tắt') {
      agent.add(`Đèn phòng ngủ đã được ${value}`)
    } else {
      agent.add(`The bedroom light is ${value}`)
    }
  }
  const ControlLight3 = (agent) => {
    const value = agent.parameters.status
    let status = false
    if (value == 'on' || value == 'bật') {
      status = true
    }
    let timeZone = moment.tz('Asia/Ho_Chi_Minh')
    let date = timeZone.format('YYYY-MM-DD')
    let time = timeZone.format('HH:mm:ss')
    let dateTime = date + ', ' + time

    set(ref(db, '/IOT-DEVICES/led3'), {
      status: status,
      time: dateTime,
    })
    // db.child('led3').push({
    //   status: status,
    //   time: dateTime,
    // })
    if (value == 'bật' || value == 'tắt') {
      agent.add(`Đèn phòng bếp đã được ${value}`)
    } else {
      agent.add(`The kitchen room light is ${value}`)
    }
  }
  const ControlFan = (agent) => {
    const value = agent.parameters.status
    let status = false
    if (value == 'on' || value == 'bật') {
      status = true
    }
    let timeZone = moment.tz('Asia/Ho_Chi_Minh')
    let date = timeZone.format('YYYY-MM-DD')
    let time = timeZone.format('HH:mm:ss')
    let dateTime = date + ', ' + time
    set(ref(db, '/IOT-DEVICES/fan'), {
      status: status,
      time: dateTime,
    })
    // db.child('fan').push({
    //   status: status,
    //   time: dateTime,
    // })
    if (value == 'bật' || value == 'tắt') {
      agent.add(`Quạt đã ${value}`)
    } else {
      agent.add(`Fan is ${value}`)
    }
  }

  const GetTemperature = async (agent) => {
    const value = agent.parameters.devices
    const temp = await set(ref(db, '/IOT-DEVICES/temp'))

    // const temp = await db.child('temp').once('value')
    if (value == 'weather') {
      agent.add(`Weather today is ${temp.val()} degrees C`)
    } else {
      agent.add(`Nhiệt độ hôm nay là ${temp.val()} độ C`)
    }
  }
  // https://controlhouse.herokuapp.com/
  let interMap = new Map()
  interMap.set('ControlLight1', ControlLight1)
  interMap.set('ControlLight2', ControlLight2)
  interMap.set('ControlLight3', ControlLight3)
  interMap.set('ControlFan', ControlFan)
  interMap.set('GetTemperature', GetTemperature)
  agent.handleRequest(interMap)
})

app.listen(process.env.PORT || 4000, () => console.log('Server on 4000'))
