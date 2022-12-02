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
    this.socket.getSocket.send(
      JSON.stringify({
        method: 'draw',
        id: this.socket.getSessionId,
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
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
      this.socket.getSocket.send(
        JSON.stringify({
          method: 'draw',
          id: this.socket.getSessionId,
          figure: {
            type: 'brush',
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        })
      )
    }
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
