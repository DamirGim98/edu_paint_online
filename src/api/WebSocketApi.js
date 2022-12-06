import { makeAutoObservable } from 'mobx'

class WebSocketApi {
  constructor() {
    makeAutoObservable(this)
  }

  socket = null

  subscribers = []

  socketReady = 'idle'

  messageHandler = (event) => {
    this.subscribers.forEach((s) => s(event))
  }

  handleSocketError = () => {
    this.socketReady = 'error'
  }

  handleSocketState = () => {
    this.socketReady = 'ready'
  }

  createSocket() {
    if (!this.socket) {
      this.socket = new WebSocket(process.env.REACT_APP_URL)
      this.socket.addEventListener('open', this.handleSocketState)
      this.socket.addEventListener('error', this.handleSocketError)
      this.socket.addEventListener('message', this.messageHandler)
    }
  }

  get getSocket() {
    return this.socket
  }

  subscribe(callback) {
    this.subscribers.push(callback)

    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback)
    }
  }

  sendMessage(message) {
    this.getSocket.send(message)
  }
}

export default new WebSocketApi()
