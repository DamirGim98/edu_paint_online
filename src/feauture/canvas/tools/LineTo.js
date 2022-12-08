import Tool from './Tool'

export default class LineTo extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
    this.socket.sendMessage(
      JSON.stringify({
        method: 'draw',
        username: this.userStore.getUsername,
        id: this.userStore.getSessionId,
        figure: {
          type: 'line',
          startX: this.startX,
          startY: this.startY,
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          color: this.ctx.fillStyle,
          width: this.ctx.lineWidth,
        },
      })
    )
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
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
    this.socket.getSocket.send(
      JSON.stringify({
        method: 'draw',
        username: this.userStore.getUsername,
        id: this.userStore.getSessionId,
      })
    )
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft
      const currentY = e.pageY - e.target.offsetTop
      this.draw(currentX, currentY)
    }
  }

  draw(x, y) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx, startX, startY, x, y, color, width) {
    const prevColor = ctx.fillStyle
    const prevWidth = ctx.lineWidth
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.fillStyle = prevColor
    ctx.strokeStyle = prevColor
    ctx.lineWidth = prevWidth
  }
}
