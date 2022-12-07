import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas = null

  undoList = []

  redoList = []

  constructor() {
    makeAutoObservable(this)
  }

  set setCanvas(canvas) {
    this.canvas = canvas
  }

  get getCanvas() {
    return this.canvas
  }

  get CanvasContext() {
    return this.canvas.getContext('2d')
  }

  pushToUndo(parameter) {
    this.undoList.push(parameter)
  }

  pushToRedo(parameter) {
    this.redoList.push(parameter)
  }

  undo() {
    const ctx = this.canvas.getContext('2d')
    if (!this.undoList.length) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    } else {
      const dataUrl = this.undoList.pop()
      this.pushToRedo(this.canvas.toDataURL())
      this.redraw(ctx, dataUrl)
    }
  }

  redo() {
    const ctx = this.canvas.getContext('2d')
    if (!this.redoList.length) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    } else {
      const dataUrl = this.redoList.pop()
      this.pushToUndo(this.canvas.toDataURL())
      this.redraw(ctx, dataUrl)
    }
  }

  redraw(ctx, dataUrl) {
    const img = new Image()
    img.src = dataUrl
    img.onload = () => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }
  }
}

export default new CanvasState()
