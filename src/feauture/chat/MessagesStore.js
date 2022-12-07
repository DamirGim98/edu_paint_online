import { makeAutoObservable } from 'mobx'

class MessagesStore {
  constructor() {
    makeAutoObservable(this)
  }

  list = []

  get getList() {
    return Array.isArray(this.list) ? this.list : []
  }

  addToList(item) {
    this.list.push(item)
  }
}

export default new MessagesStore()
