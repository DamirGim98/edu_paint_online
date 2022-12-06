import toolState from './toolState'
import WebSocketApi from '../../api/WebSocketApi'
import canvasState from './canvasState'
import Brush from './tools/Brush'
import Rectangle from './tools/Rectangle'
import Eraser from './tools/Eraser'
import Circle from './tools/Circle'
import LineTo from './tools/LineTo'

class Controller {
  constructor(toolStore, canvasStore, api) {
    this._toolStore = toolStore
    this._api = api
    this._canvasStore = canvasStore
  }

  get Tools() {
    return this._toolStore
  }

  get Canvas() {
    return this._canvasStore
  }

  get api() {
    return this._api
  }

  initializeCanvas(reference) {
    this.Canvas.setCanvas = reference
    this.Tools.setTool(new Brush(reference))
  }

  subscribeForMessages() {
    return this.api.subscribe(this.drawHandler)
  }

  drawHandler = (event) => {
    const ctx = this.Canvas.CanvasContext
    const msg = JSON.parse(event.data)
    if (msg.method !== 'draw') return
    const { figure } = msg
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width)
        break
      case 'finish':
        ctx.beginPath()
        break
      case 'rectangle':
        Rectangle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        )
        break
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.color, figure.width)
        break
      case 'circle':
        Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color)
        break
      case 'line':
        LineTo.staticDraw(
          ctx,
          figure.startX,
          figure.startY,
          figure.x,
          figure.y,
          figure.color,
          figure.width
        )
        break
      default:
        break
    }
  }
}

export default new Controller(toolState, canvasState, WebSocketApi)
