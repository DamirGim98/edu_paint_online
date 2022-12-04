import { makeAutoObservable } from 'mobx'

class WebSocketApi {
  socket = null

  username = null

  sessionId = null

  guest = false

  set setGuest(boolean) {
    this.guest = boolean
  }

  get getGuest() {
    return this.guest
  }

  get getSocket() {
    if (!this.socket) {
      this.socket = new WebSocket(process.env.REACT_APP_URL)
    }
    return this.socket
  }

  set setSessionId(id) {
    this.sessionId = id
  }

  get getSessionId() {
    return this.sessionId
  }

  set setUsername(name) {
    this.username = name
  }

  get getUsername() {
    return this.username
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new WebSocketApi()
