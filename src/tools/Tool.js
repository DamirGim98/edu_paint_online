import WebSocketApi from '../store/WebSocketApi'

export default class Tool {
  socket = WebSocketApi

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color
  }

  set LineWidth(width) {
    this.ctx.lineWidth = width
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
  }
}
