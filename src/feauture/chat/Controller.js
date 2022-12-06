import MessagesStore from './MessagesStore'
import WebSocketApi from '../../api/WebSocketApi'
import UserStore from './UserStore'
import getTime from '../../helpers/getTime'

class Controller {
  constructor(msgStore, api, userStore) {
    this._messagesStore = msgStore
    this._api = api
    this._userStore = userStore
  }

  /*  Getters for the injected instances of stores  */

  get messageStore() {
    return this._messagesStore
  }

  get api() {
    return this._api
  }

  get userStore() {
    return this._userStore
  }

  /* -------------------------------------------- */

  startConnection() {
    this.api.createSocket()
  }

  setCredentials(data) {
    this.userStore.setGuest = data.isGuest
    this.userStore.setUsername = data.username
    this.userStore.setSessionId = data.sessionId
  }

  messageHandler = (event) => {
    const msg = JSON.parse(event.data)
    switch (msg.method) {
      case 'text':
        this.messageStore.addToList(msg)
        break
      case 'connection':
        this.userStore.addNotification(msg)
        break
      default:
        break
    }
  }

  subscribeForMessages() {
    return this.api.subscribe(this.messageHandler)
  }

  sendWebsocketMessage(data) {
    const message = JSON.stringify({
      method: data.method,
      id: this.userStore.getSessionId,
      username: this.userStore.getUsername,
      text: data.text,
      time: getTime(),
    })
    this.api.sendMessage(message)
  }
}

export default new Controller(MessagesStore, WebSocketApi, UserStore)
