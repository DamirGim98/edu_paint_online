import { makeAutoObservable } from 'mobx'

class WebSocketApi {
  constructor() {
    makeAutoObservable(this)
  }

  socket = null

  subscribers = []

  closeSubscribers = []

  socketStatus = 'idle'

  get socketState() {
    return this.socketStatus
  }

  setSocketState(state) {
    this.socketStatus = state
  }

  messageHandler = (event) => {
    const msg = JSON.parse(event.data)
    if (msg === 'ping') {
      this.pong()
    } else {
      this.subscribers.forEach((s) => s(event))
    }
  }

  closeHandler = () => {
    this.setSocketState('error')
    this.socket = null
    this.closeSubscribers.forEach((s) => s())
  }

  createSocket() {
    if (!this.socket) {
      this.socket = new WebSocket(process.env.REACT_APP_URL)
      this.socket.addEventListener(
        'open',
        this.setSocketState.bind(this, 'ready')
      )
      this.socket.addEventListener('message', this.messageHandler)
      this.socket.addEventListener('close', this.closeHandler)
      this.socket.addEventListener(
        'error',
        this.setSocketState.bind(this, 'error')
      )
    }
  }

  get getSocket() {
    return this.socket
  }

  subscribe(callback, forClose) {
    if (forClose) {
      this.closeSubscribers.push(callback)

      return () => {
        this.closeSubscribers = this.closeSubscribers.filter(
          (s) => s !== callback
        )
      }
    }

    this.subscribers.push(callback)

    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback)
    }
  }

  sendMessage(message) {
    this.getSocket.send(message)
  }

  pong = () => {
    this.heartbeat(10000)
    this.sendMessage(JSON.stringify({ method: 'pong' }))
  }

  heartbeat = (delay) => {
    clearTimeout(this.socket.pingTimeout)

    this.socket.pingTimeout = setTimeout(() => {
      this.closeHandler()
    }, delay)
  }
}

export default new WebSocketApi()
