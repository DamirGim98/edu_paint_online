import Brush from './Brush'

export default class Eraser extends Brush {
  // eslint-disable-next-line no-useless-constructor
  constructor(canvas) {
    super(canvas)
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.sendMessage(
        JSON.stringify({
          method: 'draw',
          id: this.userStore.getSessionId,
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

  static draw(ctx, x, y, color, width) {
    const prevWidth = ctx.lineWidth
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = width
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.lineWidth = prevWidth
  }
}
