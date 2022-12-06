import { makeAutoObservable } from 'mobx'

class MessagesStore {
  constructor() {
    makeAutoObservable(this)
  }

  list = []

  get getList() {
    return Array.isArray(this.list) ? this.list : []
  }

  set setList(list) {
    this.list = list
  }

  addToList(item) {
    this.list.push(item)
  }
}

export default new MessagesStore()
