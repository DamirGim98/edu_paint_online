import Tool from './Tool'

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    const canvasData = this.canvas.toDataURL()
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = canvasData
    this.socket.getSocket.send(
      JSON.stringify({
        method: 'draw',
        username: this.userStore.getUsername,
        id: this.userStore.getSessionId,
      })
    )
  }

  mouseUpHandler() {
    this.mouseDown = false
    this.socket.sendMessage(
      JSON.stringify({
        method: 'draw',
        id: this.userStore.getSessionId,
        username: this.userStore.getUsername,
        figure: {
          type: 'circle',
          x: this.startX,
          y: this.startY,
          r: this.r,
          color: this.ctx.fillStyle,
        },
      })
    )
    this.socket.getSocket.send(
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

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft
      const currentY = e.pageY - e.target.offsetTop
      const width = currentX - this.startX
      const height = currentY - this.startY
      this.r = Math.sqrt(width ** 2 + height ** 2)
      this.draw(this.startX, this.startY, this.r)
    }
  }

  draw(x, y, r) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx, x, y, r, color) {
    const prevColor = ctx.fillStyle
    const prevWidth = ctx.lineWidth
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = prevColor
    ctx.strokeStyle = prevColor
    ctx.lineWidth = prevWidth
  }
}
