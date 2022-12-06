import { makeAutoObservable } from 'mobx'

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  username = null

  sessionId = null

  guest = false

  notification = null

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

  addNotification(item) {
    this.notification = item
  }

  getNotification() {
    return this.notification
  }
}

export default new UserStore()
