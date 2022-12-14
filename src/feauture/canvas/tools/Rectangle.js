import Tool from './Tool'

export default class Rectangle extends Tool {
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
        id: this.userStore.getSessionId,
        figure: {
          type: 'rectangle',
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx.fillStyle,
        },
      })
    )
    this.socket.getSocket.send(
      JSON.stringify({
        method: 'draw',
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
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft
      const currentY = e.pageY - e.target.offsetTop
      this.width = currentX - this.startX
      this.height = currentY - this.startY
      this.draw(this.startX, this.startY, this.width, this.height)
    }
  }

  draw(x, y, w, h) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx, x, y, w, h, color) {
    const prevColor = ctx.fillStyle
    const prevWidth = ctx.lineWidth
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = prevColor
    ctx.strokeStyle = prevColor
    ctx.lineWidth = prevWidth
  }
}
