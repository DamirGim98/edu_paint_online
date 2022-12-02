import Brush from './Brush'

export default class Eraser extends Brush {
  // eslint-disable-next-line no-useless-constructor
  constructor(canvas) {
    super(canvas)
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
      this.socket.getSocket.send(
        JSON.stringify({
          method: 'draw',
          id: this.socket.getSessionId,
          figure: {
            type: 'eraser',
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            width: this.ctx.lineWidth,
          },
        })
      )
    }
  }

  static draw(ctx, x, y, width) {
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = width
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
