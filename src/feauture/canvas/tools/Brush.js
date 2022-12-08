import Tool from './Tool'

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler() {
    this.mouseDown = false
    this.socket.sendMessage(
      JSON.stringify({
        method: 'draw',
        username: this.userStore.getUsername,
        id: this.userStore.getSessionId,
        figure: {
          type: 'finish',
        },
      })
    )
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.sendMessage(
        JSON.stringify({
          method: 'draw',
          username: this.userStore.getUsername,
          id: this.userStore.getSessionId,
          figure: {
            type: 'brush',
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            color: this.ctx.fillStyle,
            width: this.ctx.lineWidth,
          },
        })
      )
    }
  }

  static draw(ctx, x, y, color, width) {
    const prevColor = ctx.fillStyle
    const prevWidth = ctx.lineWidth
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.fillStyle = prevColor
    ctx.strokeStyle = prevColor
    ctx.lineWidth = prevWidth
  }
}
