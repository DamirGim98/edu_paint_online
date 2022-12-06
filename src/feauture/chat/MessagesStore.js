import { makeAutoObservable } from 'mobx'

class MessagesStore {
  constructor() {
    makeAutoObservable(this)
  }

  List = {
    messages: [],
  }

  get getList() {
    return Array.isArray(this.messagesList.messages)
      ? this.messagesList.messages
      : []
  }

  set setList(list) {
    this.messagesList = list
  }

  addToList(item) {
    this.List.push(item)
  }
}

export default new MessagesStore()
