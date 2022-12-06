import { makeAutoObservable } from 'mobx'

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  username = null

  sessionId = null

  guest = false

  set setGuest(boolean) {
    this.guest = boolean
  }

  get getGuest() {
    return this.guest
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
}

export default new UserStore()
